import * as THREE from 'three';

import { isMobile } from '../../utils/browser.js';

let scene, camera, renderer;

let interactiveFlag = false;

// solve the serve render does not has the window Object
if (typeof window === 'undefined') {
  global.window = {};
}

const w = window.innerWidth,
  h = window.innerHeight;

let lon = 90, // 把鼠标在屏幕上的横偏移量 作为 作为旋转角度的基准
  lat = 0, // 把鼠标在屏幕上的纵偏移量 作为 作为旋转角度的基准
  phi = 0, // 相机的横屏面 到 y轴的弧度
  theta = 0, // x相机的竖切面 到 x州的偏移弧度
  target = new THREE.Vector3(); // 相机 看向的 那个方向

let startX, startY, startLon, startLat;

const init = () => {
  // 初始化
  const app = document.getElementById('vrApp');

  // 创造场景
  scene = new THREE.Scene();

  // 创造相机
  camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.set(0, -0, 0); // 设置相机位置
  camera.lookPoint = {}; // 观察点
  camera.lookPoint.x = 0;
  camera.lookPoint.y = 0;
  camera.lookPoint.z = -1;
  camera.lookAt(camera.lookPoint.x, camera.lookPoint.y, camera.lookPoint.z);

  // 创造渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true }); // 反走样，防止照片周边放大出现锯齿状
  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio);
  app.appendChild(renderer.domElement);

  // 创建立方体
  createMesh();

  if (isMobile) {
    // handle finger touch
    app.addEventListener('touchstart', handleTouchStart);
    app.addEventListener('touchmove', handleTouchMove);
    app.addEventListener('touchend', handleTouchEnd);
  } else {
    // PC handle mouse click
    app.addEventListener('mousedown', handleMouseDown);
    app.addEventListener('mousemove', handleMouseMove);
    app.addEventListener('mouseup', handleMouseEnd);
    app.addEventListener('mouseout', handleMouseEnd);
  }
};

// 创建 几何体、材质、模型、立方体纹理
const createMesh = () => {
  const baseUrl = '/static/images/vr/';

  const textureLoader = new THREE.CubeTextureLoader().setPath(baseUrl); // 立方纹理
  const arr = ['f.jpg', 'b.jpg', 'u.jpg', 'd.jpg', 'l.jpg', 'r.jpg']; // 6张纹理图依次贴在立方体的x正(前)、x负（后）、y负（上）、y正（下）、z负（左）、z正（右） 的 顺序放置的
  const texture = textureLoader.load(arr);
  const geometry = new THREE.BoxGeometry(50, 50, 50); // 几何体
  const material = new THREE.MeshPhongMaterial({
    envMap: texture,
    side: THREE.DoubleSide,
  });

  const cube = new THREE.Mesh(geometry, material); // 创建mesh
  cube.position.set(-0, -0, -0);
  scene.add(cube); // 加入场景

  //环境光
  const ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);
};

// just for test the camera position
// function test() {
//     camera.position.set(500, 300, 100);
//     camera.lookAt(scene.position); // 相机 照 向 那个方向
//     renderer.render(scene, camera);
// }

// 更新相机位置及朝向
const update = () => {
  if (!interactiveFlag) {
    lon += 0.05;
  }

  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);

  target.x = 500 * Math.sin(phi) * Math.cos(theta);
  target.y = 500 * Math.cos(phi);
  target.z = 500 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(target);

  renderer.render(scene, camera);
};

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  update();
};

const handleTouchStart = (e) => {
  e.preventDefault();

  interactiveFlag = true;

  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
  startLon = lon;
  startLat = lat;
};

const handleTouchMove = (e) => {
  e.preventDefault();
  lon = (startX - e.touches[0].pageX) * 0.2 + startLon;
  lat = (e.touches[0].pageY - startY) * 0.2 + startLat;
  update();
};

const handleTouchEnd = (e) => {
  e.preventDefault();

  interactiveFlag = false;
};

const handleMouseDown = (e) => {
  interactiveFlag = true;

  e.preventDefault();
  e = e || window.event;

  startX = e.clientX;
  startY = e.clientY;
  startLon = lon;
  startLat = lat;
};

const handleMouseMove = (e) => {
  if (!interactiveFlag) return;

  e.preventDefault();
  e = e || window.event;

  // 触点水平和垂直坐标
  lon = (startX - e.clientX) * 0.2 + startLon;
  lat = (e.clientY - startY) * 0.2 + startLat;
  update();
};

const handleMouseEnd = (e) => {
  e.preventDefault();
  interactiveFlag = false;
};

const start = () => {
  init();
  animate();
};

export default start;

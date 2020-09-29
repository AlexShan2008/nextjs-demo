import * as THREE from 'three';

var scene, camera, renderer, mesh;

// solve the serve render does not has the window Object
if (typeof window === 'undefined') {
  global.window = {};
}

var w = window.innerWidth,
  h = window.innerHeight;

var lon = 90, // 把鼠标在屏幕上的横偏移量 作为 作为旋转角度的基准
  lat = 0, // 把鼠标在屏幕上的纵偏移量 作为 作为旋转角度的基准
  phi = 0, // 相机的横屏面 到 y轴的弧度
  theta = 0, // x相机的竖切面 到 x州的偏移弧度
  target = new THREE.Vector3(); // 相机 看向的 那个方向

// var startX, startY, startLon, startLat;

function init() {
  // 初始化
  var app = document.getElementById('vrApp');

  scene = new THREE.Scene(); // 创造场景
  camera = new THREE.PerspectiveCamera(70, w / h, 1, 1000); // 创造相机
  renderer = new THREE.WebGLRenderer({ antialias: true }); // 创造渲染器

  renderer.setSize(w, h);
  // renderer.setPixelRatio(window.devicePixelRatio);
  app.appendChild(renderer.domElement);

  createMesh();

  // app.addEventListener('touchstart', handleStart, false)
  // app.addEventListener('touchmove', move, false)
}

function createMesh() {
  // ary的顺序是按照 前后 上下 左右的 顺序放置的
  let baseUrl = '/static/images/';
  let materials = [
    // 由每一张图片做成的 材料
    loadTexture(baseUrl + 'f.jpg'),
    loadTexture(baseUrl + 'b.jpg'),
    loadTexture(baseUrl + 'u.jpg'),
    loadTexture(baseUrl + 'd.jpg'),
    loadTexture(baseUrl + 'l.jpg'),
    loadTexture(baseUrl + 'r.jpg'),
  ];
  let geometry = new THREE.BoxGeometry(300, 300, 300);
  mesh = new THREE.Mesh(geometry, materials);
  mesh.scale.x = -1; // 让盒子里外翻一下
  scene.add(mesh);
}

function loadTexture(url) {
  //负责把图片做成相应的 材料  ;;  url 对应的是图片的地址
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load(url); // 就是由图片组成一个纹理

  texture.needsUpdate = true; // 纹理已更新旧使用新的纹理

  var basicMaterial = new THREE.MeshBasicMaterial({
    map: texture,
  });
  return basicMaterial; // 这个就是有图片所造就的一个面的材料
}

function test() {
  camera.position.set(500, 300, 100);
  camera.lookAt(scene.position); // 相机 照 向 那个方向
  renderer.render(scene, camera);
}

function update() {
  lon += 0.1;
  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);
  target.x = 500 * Math.sin(phi) * Math.cos(theta);
  target.y = 500 * Math.cos(phi);
  target.z = 500 * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(target);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

// function handleStart(e) {
//     e.preventDefault();

//     startX = e.touches[0].pageX;
//     startY = e.touches[0].pageY;
//     startLon = lon;
//     startLat = lat;
// }

// function move(e) {
//     e.preventDefault();
//     lon = (startX - e.touches[0].pageX) * 0.2 + startLon
//     lat = (e.touches[0].pageY - startY) * 0.2 + startLat;
//     update()
// }

const start = () => {
  init();
  animate();

  test();
};
export default start;

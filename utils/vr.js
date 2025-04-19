import * as THREE from 'three';

import { isMobile } from './browser.js';

let scene, camera, renderer;
let interactiveFlag = false;
let animationFrameId = null;

// Handle server-side rendering where window is undefined
if (typeof window === 'undefined') {
  global.window = {
    navigator: { userAgent: '' },
    location: { href: '' },
  };
}

// Initial camera angles and target
const cameraState = {
  lon: 90, // Initial longitude
  lat: 0, // Initial latitude
  phi: 0, // Camera's horizontal angle
  theta: 0, // Camera's vertical angle
  target: new THREE.Vector3(),
};

let pointerState = {
  startX: 0,
  startY: 0,
  startLon: 0,
  startLat: 0,
};

const cleanup = () => {
  if (typeof window === 'undefined') return;

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }
  if (scene) {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (object.material.map) {
            object.material.map.dispose();
          }
          object.material.dispose();
        }
      }
    });
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  // Remove event listeners
  const app = document.getElementById('vrApp');
  if (app) {
    if (isMobile) {
      app.removeEventListener('touchstart', handleTouchStart);
      app.removeEventListener('touchmove', handleTouchMove);
      app.removeEventListener('touchend', handleTouchEnd);
    } else {
      app.removeEventListener('pointerdown', handlePointerDown);
      app.removeEventListener('pointermove', handlePointerMove);
      app.removeEventListener('pointerup', handlePointerEnd);
      app.removeEventListener('pointerleave', handlePointerEnd);
    }
  }

  // Reset variables
  scene = null;
  camera = null;
  renderer = null;
  interactiveFlag = false;
  animationFrameId = null;
};

const init = () => {
  if (typeof window === 'undefined') return;

  // Clean up any existing scene
  cleanup();

  const app = document.getElementById('vrApp');
  if (!app) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // Scene setup
  scene = new THREE.Scene();

  // Camera setup with correct initial position and parameters
  camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.set(0, 0, 0);

  // Set initial camera look direction
  cameraState.phi = THREE.MathUtils.degToRad(90 - cameraState.lat);
  cameraState.theta = THREE.MathUtils.degToRad(cameraState.lon);

  cameraState.target.x = 500 * Math.sin(cameraState.phi) * Math.cos(cameraState.theta);
  cameraState.target.y = 500 * Math.cos(cameraState.phi);
  cameraState.target.z = 500 * Math.sin(cameraState.phi) * Math.sin(cameraState.theta);

  camera.lookAt(cameraState.target);

  // Modern WebGL renderer setup
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  app.appendChild(renderer.domElement);

  // Handle window resize
  const handleResize = () => {
    const newW = window.innerWidth;
    const newH = window.innerHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  };

  window.addEventListener('resize', handleResize);

  createEnvironment();
  setupControls(app);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

const createEnvironment = () => {
  if (typeof window === 'undefined') return;

  const baseUrl = '/static/images/vr/';
  const textureLoader = new THREE.CubeTextureLoader().setPath(baseUrl);

  // Load environment map textures in correct order
  const envMap = textureLoader.load([
    'f.jpg', // front
    'b.jpg', // back
    'u.jpg', // up
    'd.jpg', // down
    'l.jpg', // left
    'r.jpg', // right
  ]);

  // Create skybox geometry with correct size
  const geometry = new THREE.BoxGeometry(500, 500, 500);
  const material = new THREE.MeshBasicMaterial({
    envMap,
    side: THREE.BackSide,
  });

  const skybox = new THREE.Mesh(geometry, material);
  scene.add(skybox);

  // Add ambient light for consistent illumination
  const ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);
};

const updateCamera = () => {
  if (!scene || !camera || !renderer) return;

  if (!interactiveFlag) {
    cameraState.lon += 0.05;
  }

  // Clamp latitude to prevent camera flipping
  cameraState.lat = Math.max(-85, Math.min(85, cameraState.lat));

  // Convert spherical coordinates to Cartesian
  cameraState.phi = THREE.MathUtils.degToRad(90 - cameraState.lat);
  cameraState.theta = THREE.MathUtils.degToRad(cameraState.lon);

  cameraState.target.x = 500 * Math.sin(cameraState.phi) * Math.cos(cameraState.theta);
  cameraState.target.y = 500 * Math.cos(cameraState.phi);
  cameraState.target.z = 500 * Math.sin(cameraState.phi) * Math.sin(cameraState.theta);

  camera.lookAt(cameraState.target);
  renderer.render(scene, camera);
};

const setupControls = (element) => {
  if (typeof window === 'undefined') return;

  if (isMobile) {
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
  } else {
    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerEnd);
    element.addEventListener('pointerleave', handlePointerEnd);
  }
};

const handleTouchStart = (e) => {
  e.preventDefault();
  interactiveFlag = true;
  pointerState = {
    startX: e.touches[0].pageX,
    startY: e.touches[0].pageY,
    startLon: cameraState.lon,
    startLat: cameraState.lat,
  };
};

const handleTouchMove = (e) => {
  e.preventDefault();
  if (!interactiveFlag) return;

  cameraState.lon = (pointerState.startX - e.touches[0].pageX) * 0.2 + pointerState.startLon;
  cameraState.lat = (e.touches[0].pageY - pointerState.startY) * 0.2 + pointerState.startLat;
  updateCamera();
};

const handleTouchEnd = (e) => {
  e.preventDefault();
  interactiveFlag = false;
};

const handlePointerDown = (e) => {
  e.preventDefault();
  interactiveFlag = true;
  pointerState = {
    startX: e.clientX,
    startY: e.clientY,
    startLon: cameraState.lon,
    startLat: cameraState.lat,
  };
};

const handlePointerMove = (e) => {
  e.preventDefault();
  if (!interactiveFlag) return;

  cameraState.lon = (pointerState.startX - e.clientX) * 0.2 + pointerState.startLon;
  cameraState.lat = (e.clientY - pointerState.startY) * 0.2 + pointerState.startLat;
  updateCamera();
};

const handlePointerEnd = (e) => {
  e.preventDefault();
  interactiveFlag = false;
};

const animate = () => {
  if (!scene || !camera || !renderer) return;

  animationFrameId = requestAnimationFrame(animate);
  updateCamera();
};

const start = () => {
  if (typeof window === 'undefined') return () => {};

  const cleanupResize = init();
  animate();

  // Return cleanup function
  return () => {
    if (cleanupResize) cleanupResize();
    cleanup();
  };
};

export default start;

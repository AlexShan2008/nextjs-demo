import * as THREE from 'three';

const handleInteractive = (renderer, camera) => {
  // vr全景
  // 触点初始坐标
  let initPos = {
    x: null,
    y: null,
  };

  let open = false; // 开启
  let coe = 0.2; // 系数
  let matrixWorldInverse = null; // 初始视图矩阵
  let matrixWorld = null; // 初始视图矩阵的逆矩阵

  // 初始观察点
  let lookPoint = {
    x: null,
    y: null,
    z: null,
  };

  // 初始上方向向量
  let up = {
    x: null,
    y: null,
    z: null,
  };

  let touchId = null; // 触点id

  // 判断浏览器环境
  if (navigator.userAgent.match(/android|iphone|symbianos|window\sphone|ipad|ipos/gi) === null) {
    // pc
    // 开启
    renderer.domElement.addEventListener('mousedown', function (event) {
      event = event || window.event;

      // 触点水平和垂直坐标
      let x = event.clientX - renderer.domElement.getBoundingClientRect().left;
      let y = event.clientY - renderer.domElement.getBoundingClientRect().top;

      // 记录初始状态
      initPos.x = x;
      initPos.y = y;
      open = true;
      matrixWorld = camera.matrixWorld.clone();
      matrixWorldInverse = camera.matrixWorldInverse.clone();
      lookPoint.x = camera.lookPoint.x;
      lookPoint.y = camera.lookPoint.y;
      lookPoint.z = camera.lookPoint.z;
      up.x = camera.up.x;
      up.y = camera.up.y;
      up.z = camera.up.z;
    });

    // 查看
    renderer.domElement.addEventListener('mousemove', function (event) {
      if (!open) return;
      event = event || window.event;

      // 触点水平和垂直坐标
      let x = event.clientX - renderer.domElement.getBoundingClientRect().left;
      let y = event.clientY - renderer.domElement.getBoundingClientRect().top;

      let diffX = x - initPos.x; // 移动距离
      let diffY = y - initPos.y;

      // 转角度
      let angleX = (Math.PI / 180) * diffX * coe;
      let angleY = (Math.PI / 180) * diffY * coe;

      // x轴旋转矩阵
      let xRotateMatrix = new THREE.Matrix4().set(
        1,
        0,
        0,
        0,
        0,
        Math.cos(angleY),
        -Math.sin(angleY),
        0,
        0,
        Math.sin(angleY),
        Math.cos(angleY),
        0,
        0,
        0,
        0,
        1,
      );

      // y轴旋转矩阵
      let yRotateMatrix = new THREE.Matrix4().set(
        Math.cos(angleX),
        0,
        Math.sin(angleX),
        0,
        0,
        1,
        0,
        0,
        -Math.sin(angleX),
        0,
        Math.cos(angleX),
        0,
        0,
        0,
        0,
        1,
      );

      // 计算观察点的旋转
      let lookPointVector = new THREE.Vector4(lookPoint.x, lookPoint.y, lookPoint.z, 1)
        .applyMatrix4(matrixWorldInverse)
        .applyMatrix4(xRotateMatrix)
        .applyMatrix4(yRotateMatrix)
        .applyMatrix4(matrixWorld);

      // 计算上方向向量的旋转
      let upStartVector = new THREE.Vector4(0, 0, 0, 1)
        .applyMatrix4(matrixWorldInverse)
        .applyMatrix4(xRotateMatrix)
        .applyMatrix4(yRotateMatrix)
        .applyMatrix4(matrixWorld);
      let upEndVector = new THREE.Vector4(up.x, up.y, up.z, 1)
        .applyMatrix4(matrixWorldInverse)
        .applyMatrix4(xRotateMatrix)
        .applyMatrix4(yRotateMatrix)
        .applyMatrix4(matrixWorld);

      // 更新相机
      camera.up.set(
        upEndVector.x - upStartVector.x,
        upEndVector.y - upStartVector.y,
        upEndVector.z - upStartVector.z,
      );
      camera.lookPoint.x = lookPointVector.x;
      camera.lookPoint.y = lookPointVector.y;
      camera.lookPoint.z = lookPointVector.z;
      camera.lookAt(camera.lookPoint.x, camera.lookPoint.y, camera.lookPoint.z);
    });

    // 监听结束
    window.addEventListener('mouseup', overLook);
    window.addEventListener('mouseout', overLook);
  } else {
    // 移动
    // 开启
    renderer.domElement.addEventListener('touchstart', function (event) {
      event = event || window.event;

      if (event.touches.length > 1) {
        // overTurn(event)
        return;
      }

      // 触点水平和垂直坐标
      let x = event.touches[0].clientX - renderer.domElement.getBoundingClientRect().left;
      let y = event.touches[0].clientY - renderer.domElement.getBoundingClientRect().top;

      // 记录初始状态
      initPos.x = x;
      initPos.y = y;
      open = true;
      matrixWorld = camera.matrixWorld.clone();
      matrixWorldInverse = camera.matrixWorldInverse.clone();
      lookPoint.x = camera.lookPoint.x;
      lookPoint.y = camera.lookPoint.y;
      lookPoint.z = camera.lookPoint.z;
      up.x = camera.up.x;
      up.y = camera.up.y;
      up.z = camera.up.z;
      touchId = event.touches[0].identifier;
    });

    //查看
    renderer.domElement.addEventListener(
      'touchmove',
      function (event) {
        if (!open) return;
        event = event || window.event;
        event.preventDefault();

        // 查找初始点
        let touch;
        for (let i = 0; i < event.touches.length; i++) {
          if (event.touches[i].identifier === touchId) {
            touch = event.touches[i];
          }
        }
        if (!touch) return;

        // 触点的水平和垂直坐标
        let x = touch.clientX - renderer.domElement.getBoundingClientRect().left;
        let y = touch.clientY - renderer.domElement.getBoundingClientRect().top;

        let diffX = x - initPos.x; // 移动距离
        let diffY = y - initPos.y;

        // 转角度
        let angleX = (Math.PI / 180) * diffX * coe;
        let angleY = (Math.PI / 180) * diffY * coe;

        // x轴旋转矩阵
        let xRotateMatrix = new THREE.Matrix4().set(
          1,
          0,
          0,
          0,
          0,
          Math.cos(angleY),
          -Math.sin(angleY),
          0,
          0,
          Math.sin(angleY),
          Math.cos(angleY),
          0,
          0,
          0,
          0,
          1,
        );
        // y轴旋转矩阵
        let yRotateMatrix = new THREE.Matrix4().set(
          Math.cos(angleX),
          0,
          Math.sin(angleX),
          0,
          0,
          1,
          0,
          0,
          -Math.sin(angleX),
          0,
          Math.cos(angleX),
          0,
          0,
          0,
          0,
          1,
        );

        // 计算观察点旋转
        let lookPointVector = new THREE.Vector4(lookPoint.x, lookPoint.y, lookPoint.z, 1)
          .applyMatrix4(matrixWorldInverse)
          .applyMatrix4(xRotateMatrix)
          .applyMatrix4(yRotateMatrix)
          .applyMatrix4(matrixWorld);

        // 计算上方向向量旋转
        let upStartVector = new THREE.Vector4(0, 0, 0, 1)
          .applyMatrix4(matrixWorldInverse)
          .applyMatrix4(xRotateMatrix)
          .applyMatrix4(yRotateMatrix)
          .applyMatrix4(matrixWorld);
        let upEndVector = new THREE.Vector4(up.x, up.y, up.z, 1)
          .applyMatrix4(matrixWorldInverse)
          .applyMatrix4(xRotateMatrix)
          .applyMatrix4(yRotateMatrix)
          .applyMatrix4(matrixWorld);

        // 更新相机
        camera.up.set(
          upEndVector.x - upStartVector.x,
          upEndVector.y - upStartVector.y,
          upEndVector.z - upStartVector.z,
        );
        camera.lookPoint.x = lookPointVector.x;
        camera.lookPoint.y = lookPointVector.y;
        camera.lookPoint.z = lookPointVector.z;
        camera.lookAt(camera.lookPoint.x, camera.lookPoint.y, camera.lookPoint.z);
      },
      {
        passive: false,
      },
    );

    // 监听结束
    window.addEventListener('touchend', overLook1);
    window.addEventListener('touchcancel', overLook1);
  }

  // 结束查看函数
  function overLook() {
    open = false;
    matrixWorldInverse = null;
    matrixWorld = null;
    lookPoint = {
      x: null,
      y: null,
      z: null,
    };
    up = {
      x: null,
      y: null,
      z: null,
    };
    touchId = null;
  }

  // 结束查看函数
  function overLook1() {
    // 结束拖拽，数据初始化
    open = false;
    matrixWorldInverse = null;
    matrixWorld = null;
    lookPoint = {
      x: null,
      y: null,
      z: null,
    };
    up = {
      x: null,
      y: null,
      z: null,
    };
    touchId = null;
  }
};

export default handleInteractive;

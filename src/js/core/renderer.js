/**
 * core/renderer.js
 * Three.js scene, camera, lights and animation loop.
 * Must be loaded BEFORE controls.js and models.
 */
'use strict';

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c1520);
scene.fog = new THREE.Fog(0x0c1520, 20, 60);

var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camera.position.set(6, 4, 8);
camera.lookAt(0, 0, 0);

var canvas   = document.getElementById('c3d');
var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

/* Lights */
var ambientLight = new THREE.AmbientLight(0x334455, 0.8);
var dirLight     = new THREE.DirectionalLight(0x00e5ff, 1.2);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
var backLight  = new THREE.DirectionalLight(0x7c3aed, 0.6);
backLight.position.set(-5, -5, -5);
var pointLight = new THREE.PointLight(0x00e5ff, 0.8, 20);
pointLight.position.set(0, 5, 0);
scene.add(ambientLight, dirLight, backLight, pointLight);
scene.add(new THREE.GridHelper(20, 20, 0x0d2035, 0x0d2035));

/* Resize */
function resizeRenderer() {
  var w = canvas.parentElement.clientWidth, h = 420;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
resizeRenderer();
window.addEventListener('resize', resizeRenderer);

/* Animation loop — references SceneState (defined in controls.js) */
var _t = 0;
function _loop() {
  requestAnimationFrame(_loop);
  _t += 0.01;

  if (SceneState.currentGroup) {
    if (SceneState.autoRotate) {
      SceneState.currentGroup.rotation.y += 0.005;
    } else {
      SceneState.rotCurrent.x += (SceneState.rotTarget.x - SceneState.rotCurrent.x) * 0.08;
      SceneState.rotCurrent.y += (SceneState.rotTarget.y - SceneState.rotCurrent.y) * 0.08;
      SceneState.currentGroup.rotation.x = SceneState.rotCurrent.x;
      SceneState.currentGroup.rotation.y = SceneState.rotCurrent.y;
    }
  }

  if (SceneState.ctTubeGroup) {
    SceneState.ctTubeGroup.rotation.y += 0.025; /* CT gantry spin */
  }

  pointLight.intensity = 0.6 + Math.sin(_t) * 0.3;
  renderer.render(scene, camera);
}
_loop();

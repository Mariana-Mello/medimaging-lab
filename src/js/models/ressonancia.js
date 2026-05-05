/**
 * models/ressonancia.js
 * 3D model: 1.5T MRI scanner.
 */
'use strict';

function buildRessonancia() {
  var g = new THREE.Group();
  mk(new THREE.TorusGeometry(2.5, 0.8, 16, 48), Materials.metal(),  g, [0, 0, 0],    [Math.PI/2, 0, 0]);
  mk(new THREE.TorusGeometry(2.5, 0.1, 8,  48), Materials.accent(), g, [0, 0, 0],    [Math.PI/2, 0, 0]);
  mk(new THREE.TorusGeometry(2.5, 0.1, 8,  48), Materials.purple(), g, [0, 0,  0.5], [Math.PI/2, 0, 0]);
  mk(new THREE.TorusGeometry(2.5, 0.1, 8,  48), Materials.accent(), g, [0, 0, -0.5], [Math.PI/2, 0, 0]);
  mk(new THREE.BoxGeometry(1, 0.12, 7),          Materials.white(),  g, [0, -1.8, 0]);
  mk(new THREE.BoxGeometry(0.6, 2, 0.15),        Materials.metal(),  g, [0, -1, -3.5]);
  for (var i = 0; i < 6; i++) {
    mk(new THREE.TorusGeometry(1.8 + i * 0.1, 0.02, 4, 32),
       Materials.beam(0x7c3aed, 0.12 + i * 0.04),
       g, [0, 0, 0], [Math.PI/2, 0, (i/6)*Math.PI*2]);
  }
  mk(new THREE.BoxGeometry(2, 1.2, 1.5),    Materials.metal(), g, [4, -1.5, 0]);
  mk(new THREE.BoxGeometry(1.6, 0.05, 1.0), Materials.glass(), g, [4, -0.9, 0]);
  SceneState.currentGroup = g;
  scene.add(g);
}

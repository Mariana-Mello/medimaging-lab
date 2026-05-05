/**
 * models/mamografia.js
 * 3D model: digital mammography unit (C-arm FFDM).
 */
'use strict';

function buildMamografia() {
  var g = new THREE.Group();
  mk(new THREE.BoxGeometry(2.5, 0.3, 2),           Materials.metal(),  g, [0, -1.5, 0]);
  mk(new THREE.CylinderGeometry(0.2, 0.25, 4, 16), Materials.metal(),  g, [0, 0.5, 0]);
  mk(new THREE.BoxGeometry(3, 0.2, 0.3),            Materials.metal(),  g, [0, 2.5, 0]);
  mk(new THREE.BoxGeometry(1, 0.5, 0.8),            Materials.metal(),  g, [1.2, 2.5, 0]);
  mk(new THREE.SphereGeometry(0.18, 16, 16),        Materials.accent(), g, [1.2, 2.1, 0]);
  mk(new THREE.BoxGeometry(1.5, 0.08, 1.2),         Materials.glass(),  g, [1.2, 1.8, 0]);
  mk(new THREE.BoxGeometry(1.5, 0.12, 1.2),         Materials.white(),  g, [1.2, 1.0, 0]);
  for (var i = 0; i < 5; i++) {
    mk(new THREE.CylinderGeometry(0.01, 0.01, 0.6, 8),
       Materials.beam(0x00e5ff, 0.5), g, [0.9 + i * 0.15, 1.5, -0.2 + i * 0.08]);
  }
  mk(new THREE.BoxGeometry(1.5, 0.1, 0.8),  Materials.metal(), g, [-1, 0.5, 0]);
  mk(new THREE.BoxGeometry(0.8, 0.5, 0.05), Materials.glass(), g, [-1, 0.8, 0.4]);
  SceneState.currentGroup = g;
  scene.add(g);
}

/**
 * models/densitometria.js
 * 3D model: DXA bone densitometer.
 */
'use strict';

function buildDensitometria() {
  var g = new THREE.Group();
  mk(new THREE.BoxGeometry(5, 0.3, 2.5),    Materials.metal(), g, [0, -1.5, 0]);
  mk(new THREE.BoxGeometry(4.5, 0.08, 2),   Materials.white(), g, [0, -1.0, 0]);
  mk(new THREE.BoxGeometry(0.3, 3.5, 0.25), Materials.metal(), g, [-2.2, 0.2, 0]);
  mk(new THREE.BoxGeometry(4.8, 0.25, 0.25),Materials.metal(), g, [0, 2.0, 0]);
  mk(new THREE.BoxGeometry(1.2, 0.4, 0.6),  Materials.metal(), g, [1.5, 2, 0]);
  mk(new THREE.SphereGeometry(0.15, 16, 16), Materials.green(), g, [1.5, 1.6, 0]);
  for (var i = 0; i < 3; i++)
    mk(new THREE.CylinderGeometry(0.01,0.01,2.8,4), Materials.beam(0x10b981,0.3), g, [1.3+i*0.1,0.3,0]);
  for (var j = 0; j < 3; j++)
    mk(new THREE.CylinderGeometry(0.01,0.01,2.8,4), Materials.beam(0xfb923c,0.2), g, [1.5+j*0.1,0.3,0.05]);
  mk(new THREE.BoxGeometry(1.5, 1, 0.6),    Materials.metal(), g, [-3.5, 0.5, 0]);
  mk(new THREE.BoxGeometry(1.2, 0.6, 0.05), Materials.glass(), g, [-3.5, 0.7, 0.33]);
  SceneState.currentGroup = g;
  scene.add(g);
}

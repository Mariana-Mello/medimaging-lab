/**
 * models/rx.js
 * 3D model: digital radiography (DR) room.
 */
'use strict';

function buildRX() {
  var g = new THREE.Group();
  mk(new THREE.BoxGeometry(6, 0.1, 0.1),   Materials.metal(),  g, [0, 3.5, 0]);
  mk(new THREE.BoxGeometry(0.8, 1.2, 0.6), Materials.metal(),  g, [0, 2.0, 0]);
  mk(new THREE.ConeGeometry(0.3, 0.5, 16), Materials.accent(), g, [0, 1.1, 0], [Math.PI, 0, 0]);
  mk(new THREE.BoxGeometry(3, 0.1, 6),     Materials.white(),  g, [0, 0, 0]);
  var legs = [[-1.4,-0.8,-2.8],[1.4,-0.8,-2.8],[-1.4,-0.8,2.8],[1.4,-0.8,2.8]];
  for (var i = 0; i < legs.length; i++)
    mk(new THREE.BoxGeometry(0.1, 1.5, 0.1), Materials.metal(), g, legs[i]);
  mk(new THREE.BoxGeometry(2.5, 0.08, 3.5), Materials.metal(), g, [0, -0.12, 0]);
  mk(new THREE.BoxGeometry(0.1, 3, 2.5),    Materials.metal(), g, [3.5, 0.5, 0]);
  for (var j = 0; j < 6; j++)
    mk(new THREE.ConeGeometry(0.005, 0.15*(j+1), 4),
       Materials.beam(0xfb923c, 0.07), g, [(j-3)*0.25, 0.8, 0], [Math.PI, 0, 0]);
  SceneState.currentGroup = g;
  scene.add(g);
}

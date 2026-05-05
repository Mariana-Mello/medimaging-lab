/**
 * models/tomografia.js
 * 3D model: multidetector CT scanner.
 * The tube+detector group is stored in SceneState.ctTubeGroup
 * and rotated by the animation loop in renderer.js.
 */
'use strict';

function buildTomografia() {
  var g = new THREE.Group();

  /* Gantry housing */
  mk(new THREE.TorusGeometry(3.2, 0.55, 20, 64), Materials.metal(),  g, [0,0,0], [Math.PI/2,0,0]);
  mk(new THREE.TorusGeometry(3.2, 0.08, 8,  64), Materials.accent(), g, [0,0,0], [Math.PI/2,0,0]);
  for (var i = 0; i < 8; i++) {
    var a = (i/8)*Math.PI*2;
    mk(new THREE.BoxGeometry(0.7, 0.45, 0.3), Materials.white(), g,
       [Math.cos(a)*3.2, 0, Math.sin(a)*3.2], [0, -a, 0]);
  }
  mk(new THREE.CylinderGeometry(3.75,3.75,0.08,48,1,true), Materials.metal(), g, [0, 0.38,0]);
  mk(new THREE.CylinderGeometry(3.75,3.75,0.08,48,1,true), Materials.metal(), g, [0,-0.38,0]);

  /* Rotating tube + detector arc */
  var tg = new THREE.Group();

  var tubeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.4,0.5), Materials.metal());
  tubeMesh.position.set(2.6,0,0); tubeMesh.castShadow = true;
  tg.add(tubeMesh); SceneState.currentMeshes.push(tubeMesh);

  var glow = new THREE.Mesh(new THREE.SphereGeometry(0.12,12,12), Materials.accent());
  glow.position.set(2.6,-0.3,0);
  tg.add(glow); SceneState.currentMeshes.push(glow);

  var fan = new THREE.Mesh(new THREE.ConeGeometry(1.5,2.0,3), Materials.beamDouble(0xfb923c,0.07));
  fan.position.set(1.5,0,0); fan.rotation.z = Math.PI/2;
  tg.add(fan); SceneState.currentMeshes.push(fan);

  for (var d = 0; d < 14; d++) {
    var da  = Math.PI + (d - 6.5) * 0.1;
    var det = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.32,0.1), Materials.green());
    det.position.set(Math.cos(da)*2.55, 0, Math.sin(da)*2.55);
    det.rotation.y = -da;
    tg.add(det); SceneState.currentMeshes.push(det);
  }

  g.add(tg);
  SceneState.ctTubeGroup = tg;

  /* Patient table */
  mk(new THREE.BoxGeometry(0.9,0.1,8),   Materials.white(), g, [0,-1.8,0]);
  mk(new THREE.BoxGeometry(0.8,3.5,0.1), Materials.metal(), g, [0,-0.1,-4]);
  mk(new THREE.BoxGeometry(1,2.0,1),     Materials.metal(), g, [0,-2.8, 2]);

  /* Console */
  mk(new THREE.BoxGeometry(2.5,1.5,1.2), Materials.metal(), g, [5.5,-1,   0]);
  mk(new THREE.BoxGeometry(2.0,1.0,0.05),Materials.glass(), g, [5.5,-0.7, 0.63]);

  SceneState.currentGroup = g;
  scene.add(g);
}

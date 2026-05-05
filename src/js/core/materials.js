/**
 * core/materials.js
 * Material factory functions and mesh helper.
 * Each factory returns a NEW instance — prevents wireframe/xray
 * from bleeding across equipment models.
 */
'use strict';

var Materials = {
  metal:      function() { return new THREE.MeshPhysicalMaterial({ color: 0x2a4a6e, metalness: 0.9, roughness: 0.2 }); },
  white:      function() { return new THREE.MeshPhysicalMaterial({ color: 0xd0e8ff, metalness: 0.3, roughness: 0.5 }); },
  glass:      function() { return new THREE.MeshPhysicalMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.2, metalness: 0.1, roughness: 0 }); },
  accent:     function() { return new THREE.MeshPhysicalMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.4 }); },
  purple:     function() { return new THREE.MeshPhysicalMaterial({ color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: 0.3 }); },
  green:      function() { return new THREE.MeshPhysicalMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.3 }); },
  beam:       function(col, op) { return new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op }); },
  beamDouble: function(col, op) { return new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, side: THREE.DoubleSide }); },
};

/**
 * Create a mesh, track it in SceneState and add to a group.
 * @param {THREE.BufferGeometry} geo
 * @param {THREE.Material}       mat
 * @param {THREE.Group}          grp
 * @param {number[]}             [pos]  [x,y,z]
 * @param {number[]}             [rot]  [x,y,z] radians
 */
function mk(geo, mat, grp, pos, rot) {
  var m = new THREE.Mesh(geo, mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
  m.castShadow = m.receiveShadow = true;
  SceneState.currentMeshes.push(m);
  grp.add(m);
  return m;
}

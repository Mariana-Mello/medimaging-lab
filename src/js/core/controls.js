/**
 * core/controls.js
 * Global scene state, mouse/touch drag and viewer button actions.
 * Depends on: renderer.js (canvas, scene, camera)
 */
'use strict';

/* ── Shared state ──────────────────────────────────── */
var SceneState = {
  currentGroup:  null,
  ctTubeGroup:   null,
  currentMeshes: [],
  autoRotate:    true,
  wireMode:      false,
  xrayMode:      false,
  rotTarget:     { x: 0.2, y: 0 },
  rotCurrent:    { x: 0.2, y: 0 },
};

/* ── Mouse / touch drag ────────────────────────────── */
var _drag = false, _prev = { x: 0, y: 0 };

canvas.addEventListener('mousedown', function(e) {
  _drag = true;
  SceneState.autoRotate = false;
  document.getElementById('btn-rotate').classList.remove('active');
  _prev = { x: e.clientX, y: e.clientY };
});
canvas.addEventListener('mouseup',   function() { _drag = false; });
canvas.addEventListener('mousemove', function(e) {
  if (!_drag) return;
  SceneState.rotTarget.y += (e.clientX - _prev.x) * 0.01;
  SceneState.rotTarget.x += (e.clientY - _prev.y) * 0.01;
  _prev = { x: e.clientX, y: e.clientY };
});
canvas.addEventListener('wheel', function(e) {
  camera.position.multiplyScalar(1 + e.deltaY * 0.001);
}, { passive: true });

canvas.addEventListener('touchstart', function(e) {
  _drag = true; SceneState.autoRotate = false;
  _prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });
canvas.addEventListener('touchend',   function() { _drag = false; });
canvas.addEventListener('touchmove',  function(e) {
  if (!_drag) return;
  SceneState.rotTarget.y += (e.touches[0].clientX - _prev.x) * 0.01;
  SceneState.rotTarget.x += (e.touches[0].clientY - _prev.y) * 0.01;
  _prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });

/* ── Scene lifecycle ───────────────────────────────── */
function clearScene() {
  if (SceneState.currentGroup) scene.remove(SceneState.currentGroup);
  SceneState.currentGroup  = null;
  SceneState.ctTubeGroup   = null;
  SceneState.currentMeshes = [];
  SceneState.wireMode = SceneState.xrayMode = false;
  document.getElementById('btn-wire').classList.remove('active');
  document.getElementById('btn-xray').classList.remove('active');
}

/* ── Viewer button actions (called from index.html) ── */
var App = {
  toggleRotate: function() {
    SceneState.autoRotate = !SceneState.autoRotate;
    document.getElementById('btn-rotate').classList.toggle('active', SceneState.autoRotate);
  },

  resetCamera: function() {
    camera.position.set(6, 4, 8); camera.lookAt(0, 0, 0);
    SceneState.rotCurrent = { x: 0.2, y: 0 };
    SceneState.rotTarget  = { x: 0.2, y: 0 };
  },

  toggleWire: function() {
    SceneState.wireMode = !SceneState.wireMode;
    document.getElementById('btn-wire').classList.toggle('active', SceneState.wireMode);
    SceneState.currentMeshes.forEach(function(m) {
      if (m.material && m.material.wireframe !== undefined)
        m.material.wireframe = SceneState.wireMode;
    });
  },

  toggleXray: function() {
    SceneState.xrayMode = !SceneState.xrayMode;
    document.getElementById('btn-xray').classList.toggle('active', SceneState.xrayMode);
    SceneState.currentMeshes.forEach(function(m) {
      if (!m.material) return;
      if (!m.material._oo) m.material._oo = m.material.opacity || 1;
      m.material.transparent = true;
      m.material.opacity = SceneState.xrayMode ? 0.2 : m.material._oo;
    });
  },

  /* Called by tab navigation in app.js */
  selectEquip: function(key) {
    var builders = {
      mamografia:    buildMamografia,
      ressonancia:   buildRessonancia,
      rx:            buildRX,
      densitometria: buildDensitometria,
      tomografia:    buildTomografia,
    };
    if (!builders[key]) return;
    clearScene();
    SceneState.autoRotate = true;
    document.getElementById('btn-rotate').classList.add('active');
    SceneState.rotTarget  = { x: 0.15, y: 0 };
    SceneState.rotCurrent = { x: 0.15, y: 0 };
    builders[key]();
    UI.renderInfo(key);
  },
};

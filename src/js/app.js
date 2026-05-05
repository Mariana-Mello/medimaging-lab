/**
 * app.js
 * UI renderer (info panel) + tab navigation.
 * Must be loaded LAST — after all core, models and data scripts.
 */
'use strict';

/* ── DATA registry ────────────────────────────────── */
var DATA = {
  mamografia:    DATA_mamografia,
  ressonancia:   DATA_ressonancia,
  rx:            DATA_rx,
  densitometria: DATA_densitometria,
  tomografia:    DATA_tomografia,
};

/* ── UI renderer ──────────────────────────────────── */
var UI = {

  renderInfo: function(key) {
    var d = DATA[key];
    if (!d) return;

    var specs = '';
    for (var i = 0; i < d.specs.length; i++) {
      specs += '<div class="spec">' +
        '<div class="spec-key">' + d.specs[i].k + '</div>' +
        '<div class="spec-val">' + d.specs[i].v + '</div>' +
        '</div>';
    }

    var steps = '';
    for (var j = 0; j < d.flow.length; j++) {
      steps += '<div class="flow-step">' +
        '<div class="flow-num">' + (j+1) + '</div>' +
        '<div class="flow-content">' +
          '<div class="flow-title">' + d.flow[j].t + '</div>' +
          '<div class="flow-desc">'  + d.flow[j].d + '</div>' +
        '</div></div>';
    }

    var items = '';
    for (var k = 0; k < d.explain.length; k++) {
      items += '<div class="explain-item">' +
        '<span class="explain-tag">'  + d.explain[k].tag  + '</span>' +
        '<span class="explain-text">' + d.explain[k].text + '</span>' +
        '</div>';
    }

    document.getElementById('info-panel').innerHTML =
      '<div class="info-card">' +
        '<div class="card-label">// Equipamento</div>' +
        '<div class="card-title">' + d.title + '</div>' +
        '<div class="card-desc">'  + d.desc  + '</div>' +
        '<div class="specs-grid">' + specs   + '</div>' +
      '</div>' +

      '<div class="info-card">' +
        '<div class="card-label">// Pipeline — Como Funciona</div>' +
        '<div class="flow">' + steps + '</div>' +
      '</div>' +

      '<div class="info-card">' +
        '<div class="card-label">// Código — Simulação em Python</div>' +
        '<div class="code-section">' +
          '<div class="code-header">' +
            '<span class="code-lang">PYTHON 3.x</span>' +
            '<button class="copy-btn" onclick="UI.copyCode(this)">[ copiar ]</button>' +
          '</div>' +
          '<pre>' + d.code + '</pre>' +
        '</div>' +
      '</div>' +

      '<div class="info-card">' +
        '<div class="card-label">// Explicação do Código — Guia do Estudante</div>' +
        '<div class="code-explain">' +
          '<div class="explain-header">📖 O QUE CADA TRECHO FAZ</div>' +
          '<div class="explain-body">' + items + '</div>' +
        '</div>' +
      '</div>';
  },

  copyCode: function(btn) {
    var pre = btn.closest('.code-section').querySelector('pre');
    navigator.clipboard.writeText(pre.innerText).then(function() {
      btn.textContent = '[ copiado! ]';
      setTimeout(function() { btn.textContent = '[ copiar ]'; }, 2000);
    });
  }
};

/* ── Tab navigation (event delegation) ───────────── */
document.getElementById('tabs').addEventListener('click', function(e) {
  var btn = e.target.closest('.tab');
  if (!btn) return;
  var key = btn.getAttribute('data-key');
  if (!key || !DATA[key]) return;

  document.querySelectorAll('.tab').forEach(function(t) {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  App.selectEquip(key);
});

/* ── Init ─────────────────────────────────────────── */
buildMamografia();
UI.renderInfo('mamografia');

# 🏥 MedImaging Lab

**Plataforma educacional interativa com visualizações 3D de equipamentos de diagnóstico por imagem médica.**

Para estudantes de programação e saúde que querem entender a física, o pipeline técnico e o código por trás dos principais equipamentos de imagem médica.

---

## ✨ Funcionalidades

| Recurso | Detalhe |
|---|---|
| 🔬 **5 equipamentos em 3D** | Mamografia, Ressonância, Raio-X, Densitometria e Tomografia CT |
| 🎮 **Viewer interativo** | Arrastar para rotacionar, scroll para zoom, Wireframe e X-Ray |
| ⚙️ **Tomografia animada** | Tubo e detectores giram continuamente dentro do gantry |
| 📋 **Pipeline técnico** | Explicação passo a passo de como cada exame funciona |
| 💻 **Código Python real** | Simulações com NumPy, SciPy e PyDICOM comentadas |
| 📖 **Guia do estudante** | Explicação linha a linha de cada função e conceito matemático |

---

## 🚀 Como rodar

### Opção 1 — Servidor local (recomendado)

```bash
git clone https://github.com/seu-usuario/medimaging-lab.git
cd medimaging-lab

# Python 3
python3 -m http.server 8080
# Acesse: http://localhost:8080

# ou Node.js
npx serve .
```

> ⚠️ Abrir `index.html` via `file://` pode bloquear módulos JS em alguns navegadores. Use um servidor local.

### Opção 2 — GitHub Pages (zero config)

1. Faça fork do repositório
2. Vá em **Settings → Pages → Source: main / root**
3. Acesse `https://seu-usuario.github.io/medimaging-lab`

---

## 📁 Estrutura do Projeto

```
medimaging-lab/
├── index.html                     # Entrada principal da aplicação
├── README.md
├── .gitignore
│
├── src/
│   ├── css/
│   │   └── main.css               # Design system completo (variáveis, componentes)
│   │
│   └── js/
│       ├── core/
│       │   ├── renderer.js        # Scene, câmera, luzes e animation loop (Three.js)
│       │   ├── controls.js        # SceneState, drag/touch, App.* (botões do viewer)
│       │   └── materials.js       # Material factories + helper mk()
│       │
│       ├── models/
│       │   ├── mamografia.js      # Modelo 3D do mamógrafo digital (C-arm)
│       │   ├── ressonancia.js     # Modelo 3D do scanner RM 1.5T
│       │   ├── rx.js              # Modelo 3D da sala de raio-X DR
│       │   ├── densitometria.js   # Modelo 3D do densitômetro DXA
│       │   └── tomografia.js      # Modelo 3D do CT multidetector (gantry animado)
│       │
│       ├── data/
│       │   ├── mamografia.js      # Pipeline + código + explicações (Mamografia)
│       │   ├── ressonancia.js     # Pipeline + código + explicações (RM)
│       │   ├── rx.js              # Pipeline + código + explicações (Raio-X)
│       │   ├── densitometria.js   # Pipeline + código + explicações (DXA)
│       │   └── tomografia.js      # Pipeline + código + explicações (CT)
│       │
│       └── app.js                 # UI renderer + tab navigation + inicialização
│
└── assets/
    └── screenshots/               # Capturas de tela para o README
```

### Ordem de carregamento dos scripts

```
three.min.js (CDN)
  └─ core/renderer.js   → scene, camera, renderer, loop
  └─ core/controls.js   → SceneState, App, clearScene
  └─ core/materials.js  → Materials, mk()
  └─ models/*.js        → buildX() — usa mk, Materials, SceneState, scene
  └─ data/*.js          → DATA_x — conteúdo educacional
  └─ app.js             → UI, DATA, tabs, init
```

---

## 🛠️ Como adicionar um novo equipamento

**1. Criar o modelo 3D** em `src/js/models/novo.js`:
```js
function buildNovo() {
  var g = new THREE.Group();
  mk(new THREE.BoxGeometry(1,1,1), Materials.metal(), g, [0,0,0]);
  SceneState.currentGroup = g;
  scene.add(g);
}
```

**2. Criar o conteúdo educacional** em `src/js/data/novo.js`:
```js
var DATA_novo = {
  title: 'Nome do Equipamento',
  desc:  'Descrição técnica.',
  specs:   [{ k: 'Chave', v: 'Valor' }],
  flow:    [{ t: 'Etapa', d: 'Descrição da etapa.' }],
  code:    '# código Python comentado...',
  explain: [{ tag: 'funcao()', text: 'O que esse trecho faz...' }]
};
```

**3. Registrar no `index.html`:**
```html
<!-- Na nav .tabs -->
<button class="tab" data-key="novo" role="tab">🔧 Novo</button>

<!-- Nas tags script -->
<script src="src/js/models/novo.js"></script>
<script src="src/js/data/novo.js"></script>
```

**4. Registrar no `app.js`:**
```js
var DATA = {
  // ... existentes ...
  novo: DATA_novo,
};
// E em App.selectEquip, adicionar:
// novo: buildNovo,
```

---

## 🧪 Tecnologias

| Tecnologia | Uso |
|---|---|
| [Three.js r128](https://threejs.org) | Renderização 3D via WebGL |
| HTML5 / CSS3 / JavaScript ES5 | Interface — sem frameworks, sem build step |
| Google Fonts (Syne + Space Mono) | Tipografia |
| Python / NumPy / SciPy (pseudocódigo) | Exemplos educacionais |

> O projeto usa **ES5** intencionalmente — roda em qualquer navegador moderno sem transpilação ou bundler.

---

## 📚 Referências Técnicas

- [NIST X-Ray Attenuation Tables](https://physics.nist.gov/PhysRefData/XrayMassCoef/tab4.html)
- [DICOM Standard PS 3.x](https://www.dicomstandard.org/current)
- [WHO Bone Density Criteria 1994](https://www.who.int/publications/i/item/WHO-TRS-843)
- [Hounsfield Units — Radiopaedia](https://radiopaedia.org/articles/hounsfield-unit)
- [FBP & Radon Transform — Kak & Slaney](https://engineering.purdue.edu/~malcolm/pct/CTI_Ch03.pdf)

---

## 📄 Licença

MIT License — livre para uso educacional e comercial.

---

*Desenvolvido com fins educacionais. Não substitui orientação médica ou instrução clínica formal.*

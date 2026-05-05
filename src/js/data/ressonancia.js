/**
 * data/ressonancia.js
 * Educational content: pipeline, code and explanations.
 */
'use strict';

var DATA_ressonancia = {
  title:'Scanner RM 1.5 Tesla',
  desc:'Campo magnético supercondutivo (hélio líquido −269°C) e pulsos de radiofrequência excitam prótons de hidrogênio. A relaxação nuclear gera o sinal — sem radiação ionizante.',
  specs:[{k:'Campo B₀',v:'1.5 Tesla'},{k:'Bore',v:'Ø 70 cm'},{k:'Resolução',v:'~1 mm isot.'},{k:'Resfriamento',v:'Hélio líquido 4K'}],
  flow:[
    {t:'Alinhamento — Campo B₀',d:'O campo de 1.5T alinha os spins de prótons de H ao longo do eixo Z, criando magnetização longitudinal M₀ proporcional à densidade de prótons e ao campo.'},
    {t:'Excitação — Pulso RF',d:'Pulso de RF na frequência de Larmor ω₀ = γ·B₀ (63.87 MHz a 1.5T) inclina M₀ 90° para o plano XY. Os spins passam a precessar em fase — FID.'},
    {t:'Relaxação T1 e T2',d:'T1: recuperação longitudinal (gordo ≈260ms, LCR ≈4000ms). T2: decaimento transversal (músculo ≈50ms, LCR ≈2000ms). Diferenças geram o contraste característico da RM.'},
    {t:'Gradientes & Codificação Espacial',d:'Bobinas Gx, Gy, Gz perturbam B₀ linearmente para: selecionar a fatia (Gz), codificar fase (Gy) e frequência (Gx). Cada combinação define um ponto único no espaço-k.'},
    {t:'K-space & FFT',d:'Cada eco preenche uma linha do k-space (Transformada de Fourier da imagem). Após preencher todas as linhas, IFFT 2D reconstrói a imagem espacial com resolução = FOV / matriz.'},
  ],
  code:'<span class="cm"># Ressonancia Magnetica — k-space e reconstrucao FFT</span>\n\n<span class="kw">import</span> numpy <span class="kw">as</span> np\n\n<span class="kw">class</span> <span class="cls">MRIReconstruction</span>:\n  <span class="kw">def</span> <span class="fn">__init__</span>(<span class="var">self</span>, matrix=<span class="num">256</span>, fov_mm=<span class="num">250</span>):\n    <span class="var">self</span>.N   = matrix\n    <span class="var">self</span>.FOV = fov_mm\n    <span class="var">self</span>.res = fov_mm / matrix  <span class="cm"># ~1mm/pixel</span>\n\n  <span class="kw">def</span> <span class="fn">larmor_freq</span>(<span class="var">self</span>, B0_tesla):\n    <span class="cm"># w0 = gamma * B0  (gamma_H = 42.577 MHz/T)</span>\n    gamma_H = <span class="num">42.577e6</span>\n    <span class="kw">return</span> gamma_H * B0_tesla  <span class="cm"># 63.87 MHz a 1.5T</span>\n\n  <span class="kw">def</span> <span class="fn">fill_kspace</span>(<span class="var">self</span>, proton_density):\n    <span class="cm"># k-space = FFT 2D da imagem real</span>\n    <span class="cm"># Cada linha = 1 eco adquirido com Gy diferente</span>\n    kspace = np.fft.fft2(proton_density)\n    <span class="kw">return</span> np.fft.fftshift(kspace)\n\n  <span class="kw">def</span> <span class="fn">apply_T2_weighting</span>(<span class="var">self</span>, kspace, T2_map, TE=<span class="num">80e-3</span>):\n    <span class="cm"># Sinal decai como exp(-TE/T2) por tecido</span>\n    decay = np.exp(-TE / np.clip(T2_map, <span class="num">1e-3</span>, <span class="num">10</span>))\n    <span class="kw">return</span> kspace * np.fft.fftshift(np.fft.fft2(decay))\n\n  <span class="kw">def</span> <span class="fn">reconstruct</span>(<span class="var">self</span>, kspace_w):\n    <span class="cm"># IFFT 2D: frequencia → espaco espacial</span>\n    img_complex = np.fft.ifft2(np.fft.ifftshift(kspace_w))\n    <span class="kw">return</span> np.abs(img_complex)  <span class="cm"># modulo do numero complexo</span>\n\n  <span class="kw">def</span> <span class="fn">calc_snr</span>(<span class="var">self</span>, roi_signal, noise_std):\n    <span class="cm"># SNR ∝ B0 * voxel_vol * sqrt(NEX)</span>\n    <span class="kw">return</span> np.mean(roi_signal) / noise_std',
  explain:[
    {tag:'larmor_freq',text:'<strong>ω₀ = γ·B₀</strong>: cada núcleo tem razão giromagnética γ única. Para ¹H, γ = 42.577 MHz/T → a 1.5T os prótons precessam a 63.87 MHz (faixa de rádio FM). O pulso RF deve estar EXATAMENTE nessa frequência para excitar os prótons (ressonância).'},
    {tag:'fill_kspace',text:'<strong>K-space é a FFT da imagem</strong>: o scanner RM não mede pixels diretamente — mede o espaço-k por indução magnética. O centro do k-space contém contraste/brilho geral; as bordas contém bordas e detalhes finos. Dados corrompidos nas bordas = perda de nitidez.'},
    {tag:'apply_T2_weighting',text:'<strong>Ponderação T2</strong>: o sinal decai como e^(−TE/T2). Com TE longo (~80ms): tecidos T2 longo (água, LCR ~2000ms) aparecem brilhantes; tecidos T2 curto (músculo ~50ms) aparecem escuros. A escolha de TE e TR define o "tipo" da sequência (T1, T2, DP).'},
    {tag:'reconstruct / IFFT',text:'<strong>IFFT 2D</strong>: a Transformada de Fourier Inversa reconstrói a imagem a partir do k-space. Retorna números complexos — o módulo |Re + i·Im| = √(Re² + Im²) dá a imagem de magnitude usada clinicamente.'},
    {tag:'calc_snr',text:'<strong>SNR em RM</strong>: proporcional a B₀, volume do voxel e √NEX (número de médias). Passar de 1.5T para 3T dobra o SNR teoricamente, mas aumenta artefatos de susceptibilidade e SAR (deposição de energia no tecido).'},
  ]
};;

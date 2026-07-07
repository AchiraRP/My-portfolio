/* ============================================================
   MISTER X — Matrix Digital Rain
   Logo image path is relative to index.html
   ============================================================ */
(function () {
  const IMAGE_URL = 'assets/images/logo.png';
  const fontSize  = 14;
  const font      = 'monospace';
  const speed     = 100;

  const container = document.getElementById('hero-container');
  const canvas    = document.getElementById('hero-matrix-canvas');
  const ctx       = canvas.getContext('2d');

  let width, height, columns, rows;
  let meltDrops         = [];
  let targetBrightnessMap = [];
  let currentOpacityMap   = [];
  let charMap             = [];
  let charTimerMap        = [];
  let randomVarianceMap   = [];
  let imageLoaded = false;
  let isMobile    = false;

  const katakana     = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモロヲゴゾドボポヴッン';
  const latin        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numsAlphabet = '0123456789';
  const alphabet     = katakana + latin + numsAlphabet;

  let sceneState       = 'BLACKOUT';
  let frameTimer       = 0;
  let formationProgress = 0.0;

  function getRandomChar() {
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  function init() {
    width   = canvas.width  = container.offsetWidth;
    height  = canvas.height = container.offsetHeight;
    columns = Math.floor(width  / fontSize);
    rows    = Math.floor(height / fontSize);
    isMobile = width < 768;

    meltDrops           = [];
    targetBrightnessMap = [];
    currentOpacityMap   = [];
    charMap             = [];
    charTimerMap        = [];
    randomVarianceMap   = [];

    for (let x = 0; x < columns; x++) {
      targetBrightnessMap[x] = [];
      currentOpacityMap[x]   = [];
      charMap[x]             = [];
      charTimerMap[x]        = [];
      randomVarianceMap[x]   = [];
      for (let y = 0; y < rows; y++) {
        targetBrightnessMap[x][y] = 0;
        currentOpacityMap[x][y]   = 0;
        charMap[x][y]             = getRandomChar();
        charTimerMap[x][y]        = 2 + Math.floor(Math.random() * 8);
        randomVarianceMap[x][y]   = Math.random();
      }
    }

    // Mirror variance and melt drops left-to-right for visual symmetry
    const half = Math.floor(columns / 2);
    for (let x = 0; x < half; x++) {
      const mirror = columns - 1 - x;
      const drop   = -100 - Math.random() * 150;
      meltDrops[x]      = drop;
      meltDrops[mirror] = drop;
      for (let y = 0; y < rows; y++) {
        randomVarianceMap[mirror][y] = randomVarianceMap[x][y];
      }
    }
    if (columns % 2 !== 0) meltDrops[half] = -100 - Math.random() * 150;

    if (imgElement.complete) processImage();
  }

  const imgElement       = new Image();
  imgElement.crossOrigin = 'Anonymous';
  imgElement.src         = IMAGE_URL;
  imgElement.onload      = processImage;

  function processImage() {
    const hCanvas  = document.createElement('canvas');
    const hCtx     = hCanvas.getContext('2d');
    hCanvas.width  = width;
    hCanvas.height = height;

    const scale = isMobile
      ? (width * 0.6) / imgElement.width
      : Math.min(width * 0.55 / imgElement.width, height * 0.55 / imgElement.height);

    const w    = imgElement.width  * scale;
    const h    = imgElement.height * scale;
    const offX = (width  - w) / 2;
    const offY = (height - h) / 2;

    hCtx.drawImage(imgElement, offX, offY, w, h);
    const pData = hCtx.getImageData(0, 0, width, height).data;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        // Sample 3×3 area around cell centre for better accuracy
        let totalBrightness = 0, samples = 0;
        const cx = Math.floor(x * fontSize + fontSize / 2);
        const cy = Math.floor(y * fontSize + fontSize / 2);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const px = cx + dx * 3;
            const py = cy + dy * 3;
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const i = (py * width + px) * 4;
              totalBrightness += (pData[i] + pData[i + 1] + pData[i + 2]) / 3;
              samples++;
            }
          }
        }
        const brightness = totalBrightness / samples;

        if (brightness > 20) {
          // Logo pixels — boosted brightness so logo stands out
          targetBrightnessMap[x][y] = Math.min(1, (brightness / 255) * 2.5);
        } else {
          targetBrightnessMap[x][y] = 0;
        }
      }
    }
    imageLoaded = true;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px ' + font;

    if (!imageLoaded) return;
    frameTimer++;

    // ── Scene state machine ──
    switch (sceneState) {
      case 'BLACKOUT':
        if (frameTimer > 10) {
          sceneState = 'ILLUMINATE';
          frameTimer = 0;
          formationProgress = 0.0;
        }
        break;
      case 'ILLUMINATE':
        formationProgress += 0.08;
        if (formationProgress >= 1.0) {
          formationProgress = 1.0;
          sceneState = 'HOLD';
          frameTimer = 0;
        }
        break;
      case 'HOLD':
        if (frameTimer > 40) {
          sceneState = 'MELT';
          frameTimer = 0;
          for (let x = 0; x < columns; x++) meltDrops[x] = -Math.random() * 200;
        }
        break;
      case 'MELT':
        let allPassed = true;
        for (let x = 0; x < columns; x++) {
          if (meltDrops[x] < height + 100) allPassed = false;
        }
        if (allPassed && frameTimer > 10) {
          sceneState = 'BLACKOUT';
          frameTimer = 0;
          for (let x = 0; x < columns; x++)
            for (let y = 0; y < rows; y++) currentOpacityMap[x][y] = 0;
        }
        break;
    }

    // ── Render each cell ──
    for (let x = 0; x < columns; x++) {
      if (sceneState === 'MELT') meltDrops[x] += fontSize;

      for (let y = 0; y < rows; y++) {
        const gridYPos = y * fontSize;

        // Randomise character on timer
        charTimerMap[x][y]--;
        if (charTimerMap[x][y] <= 0) {
          charMap[x][y]      = getRandomChar();
          charTimerMap[x][y] = 2 + Math.floor(Math.random() * 8);
        }

        let targetOpacity = 0;
        const variance    = randomVarianceMap[x][y];

        if (sceneState === 'ILLUMINATE' || sceneState === 'HOLD') {
          // Logo pixels — bright; background pixels — dim
          let finalFaceOpacity = 0;
          if (targetBrightnessMap[x][y] > 0) {
            finalFaceOpacity = targetBrightnessMap[x][y] * (0.85 + variance * 0.15);
          }
          const backgroundOpacity = variance > 0.6 ? 0 : variance * 0.2;

          if (formationProgress < 0.5) {
            targetOpacity = Math.max(backgroundOpacity, finalFaceOpacity * 0.2) * (formationProgress * 2);
          } else {
            const reveal = (formationProgress - 0.5) * 2;
            targetOpacity = targetBrightnessMap[x][y] > 0
              ? backgroundOpacity + (finalFaceOpacity - backgroundOpacity) * reveal
              : backgroundOpacity;
          }
        } else if (sceneState === 'BLACKOUT') {
          targetOpacity = 0;
        }

        if (sceneState === 'MELT') {
          if (gridYPos < meltDrops[x]) {
            currentOpacityMap[x][y] *= 0.6;
            targetOpacity = 0;
          } else if (gridYPos < meltDrops[x] + fontSize * 2 && currentOpacityMap[x][y] > 0.1) {
            ctx.shadowBlur  = 10;
            ctx.shadowColor = '#00ff41';
            currentOpacityMap[x][y] = 1.0;
          } else {
            targetOpacity = targetBrightnessMap[x][y] > 0 ? currentOpacityMap[x][y] : 0.15;
          }
        }

        if (sceneState !== 'MELT') {
          currentOpacityMap[x][y] += (targetOpacity - currentOpacityMap[x][y]) * 0.1;
        }

        const finalOpacity = Math.max(0, Math.min(1, currentOpacityMap[x][y]));
        if (finalOpacity > 0.01) {
          ctx.fillStyle = `rgba(0, 255, 65, ${finalOpacity})`;
          ctx.fillText(charMap[x][y], x * fontSize, gridYPos);
          ctx.shadowBlur = 0;
        }
      }
    }
  }

  window.addEventListener('resize', init);
  init();
  setInterval(draw, speed);
})();

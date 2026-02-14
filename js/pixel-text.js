/* ==========================================================================
   Pixel Block Text Generator
   Creates retro pixel-art style text with 3D block effect
   ========================================================================== */

const PixelText = {
  // 5x7 pixel font definitions (each letter is 5 wide, 7 tall)
  // 1 = filled block, 0 = empty
  font: {
    'A': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    'B': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0]
    ],
    'C': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    'D': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0]
    ],
    'E': [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1]
    ],
    'F': [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0]
    ],
    'G': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,0],
      [1,0,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    'H': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    'I': [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [1,1,1,1,1]
    ],
    'J': [
      [0,0,1,1,1],
      [0,0,0,1,0],
      [0,0,0,1,0],
      [0,0,0,1,0],
      [1,0,0,1,0],
      [1,0,0,1,0],
      [0,1,1,0,0]
    ],
    'K': [
      [1,0,0,0,1],
      [1,0,0,1,0],
      [1,0,1,0,0],
      [1,1,0,0,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1]
    ],
    'L': [
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1]
    ],
    'M': [
      [1,0,0,0,1],
      [1,1,0,1,1],
      [1,0,1,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    'N': [
      [1,0,0,0,1],
      [1,1,0,0,1],
      [1,0,1,0,1],
      [1,0,0,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    'O': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    'P': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0]
    ],
    'Q': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,1,0,1],
      [1,0,0,1,0],
      [0,1,1,0,1]
    ],
    'R': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1]
    ],
    'S': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,0],
      [0,1,1,1,0],
      [0,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    'T': [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0]
    ],
    'U': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,0]
    ],
    'V': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0]
    ],
    'W': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,1,0,1],
      [1,1,0,1,1],
      [1,0,0,0,1]
    ],
    'X': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,1,0,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    'Y': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0]
    ],
    'Z': [
      [1,1,1,1,1],
      [0,0,0,0,1],
      [0,0,0,1,0],
      [0,0,1,0,0],
      [0,1,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1]
    ],
    ' ': [
      [0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]
  },

  /**
   * Render pixel text into a container
   * @param {string} text - Text to render
   * @param {HTMLElement} container - Container element
   * @param {Object} options - Configuration options
   */
  render(text, container, options = {}) {
    const {
      blockSize = 'clamp(8px, 1.5vw, 16px)',
      gap = '2px',
      letterGap = 'clamp(8px, 1vw, 16px)',
      lineGap = 'clamp(16px, 2vw, 32px)',
      color = '#D4856D',
      borderColor = '#8B4D3D'
    } = options;

    // Set CSS custom properties
    container.style.setProperty('--pixel-block-size', blockSize);
    container.style.setProperty('--pixel-gap', gap);
    container.style.setProperty('--pixel-letter-gap', letterGap);
    container.style.setProperty('--pixel-line-gap', lineGap);
    container.style.setProperty('--pixel-color', color);
    container.style.setProperty('--pixel-border-color', borderColor);

    // Clear container
    container.innerHTML = '';
    container.classList.add('pixel-text');

    // Split text into lines (support both \n and | as line separators)
    const lines = text.toUpperCase().split(/[\n|]/);

    lines.forEach((line, lineIndex) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'pixel-text__line';

      // Process each character
      const chars = line.split('');
      chars.forEach((char, charIndex) => {
        const charData = this.font[char];
        if (!charData) return;

        const letterEl = document.createElement('div');
        letterEl.className = 'pixel-text__letter';

        // Create grid of blocks for this letter
        charData.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            const blockEl = document.createElement('div');
            blockEl.className = 'pixel-text__block';
            if (cell === 1) {
              blockEl.classList.add('pixel-text__block--filled');
            }
            letterEl.appendChild(blockEl);
          });
        });

        // Set grid columns based on character width
        letterEl.style.gridTemplateColumns = `repeat(${charData[0].length}, var(--pixel-block-size))`;

        lineEl.appendChild(letterEl);
      });

      container.appendChild(lineEl);
    });
  }
};

// Auto-initialize pixel text elements
document.addEventListener('DOMContentLoaded', () => {
  const pixelTextElements = document.querySelectorAll('[data-pixel-text]');
  pixelTextElements.forEach(el => {
    const text = el.getAttribute('data-pixel-text');
    const options = {
      blockSize: el.getAttribute('data-block-size') || undefined,
      color: el.getAttribute('data-color') || undefined,
      borderColor: el.getAttribute('data-border-color') || undefined
    };
    // Remove undefined options
    Object.keys(options).forEach(key => options[key] === undefined && delete options[key]);
    PixelText.render(text, el, options);
  });
});

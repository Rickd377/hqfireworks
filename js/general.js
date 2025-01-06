document.addEventListener('click', function(event) {
  const colors = ['red', 'yellow', 'pink', 'green', 'orange', 'purple', 'white'];
  const numParticles = 100; // Increase the number of particles
  const container = document.getElementById('fireworks-container');

  // Pick a random base color
  const baseColor = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework';
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;

    // Generate a lighter variation of the base color
    const lightness = 50 + Math.random() * 50; // Lightness between 50% and 100%
    const color = `hsl(${getHue(baseColor)}, 100%, ${lightness}%)`;
    particle.style.backgroundColor = color;
    particle.style.setProperty('--color', color);

    // Set random direction and length for the particle
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100;
    const length = 10 + Math.random() * 20; // Length between 10px and 30px
    particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
    particle.style.setProperty('--angle', `${angle}rad`);
    particle.style.setProperty('--length', `${length}px`);

    container.appendChild(particle);

    // Force reflow to ensure the animation starts immediately
    particle.offsetWidth;

    // Remove the particle element after the animation ends
    particle.addEventListener('animationend', function() {
      particle.remove();
    });
  }
});

// Helper function to get the hue value of a color
function getHue(color) {
  const tempDiv = document.createElement('div');
  tempDiv.style.color = color;
  document.body.appendChild(tempDiv);
  const computedColor = getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);

  const rgb = computedColor.match(/\d+/g).map(Number);
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue;

  if (max === min) {
    hue = 0;
  } else if (max === r) {
    hue = (60 * (g - b) / (max - min) + 360) % 360;
  } else if (max === g) {
    hue = (60 * (b - r) / (max - min) + 120) % 360;
  } else {
    hue = (60 * (r - g) / (max - min) + 240) % 360;
  }

  return hue;
}
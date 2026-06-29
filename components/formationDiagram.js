import { getFormation } from '../data/formations.js';

export function renderFormationDiagram(container, formationId, options = {}) {
  const formation = getFormation(formationId);
  if (!formation) {
    container.innerHTML = '<p class="text-danger">Formation diagram unavailable</p>';
    return;
  }

  const width = options.width || 300;
  const height = options.height || 400;
  const showLabels = options.showLabels !== false;
  const compact = options.compact || false;
  const shapeType = options.shapeType || 'default'; // 'default', 'attack', 'defense'

  // Map coordinates based on shapeType
  let positions = formation.positions;
  if (shapeType === 'attack' && formation.attackingPositions) {
    positions = formation.attackingPositions;
  } else if (shapeType === 'defense' && formation.defensivePositions) {
    positions = formation.defensivePositions;
  }

  const dotRadius = compact ? 8 : 11;
  const fontSize = compact ? 8 : 10;
  
  // Clean container
  container.innerHTML = '';
  
  // Render SVG Pitch
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 300 400');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.maxHeight = compact ? '140px' : '360px';
  svg.style.borderRadius = 'var(--radius-md)';
  svg.style.backgroundColor = 'hsl(145, 55%, 20%)';
  svg.style.display = 'block';

  // Pitch Marks (SVG)
  const drawPitch = `
    <!-- Outer boundary -->
    <rect x="10" y="10" width="280" height="380" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
    
    <!-- Halfway line -->
    <line x1="10" y1="200" x2="290" y2="200" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
    
    <!-- Center circle -->
    <circle cx="150" cy="200" r="45" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
    <circle cx="150" cy="200" r="2" fill="rgba(255,255,255,0.3)" />

    <!-- Top Penalty Area -->
    <rect x="65" y="10" width="170" height="65" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
    <rect x="110" y="10" width="80" height="22" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
    <circle cx="150" cy="50" r="1" fill="rgba(255,255,255,0.3)" />
    <!-- Penalty Arc Top -->
    <path d="M 115 75 A 40 40 0 0 0 185 75" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />

    <!-- Bottom Penalty Area -->
    <rect x="65" y="325" width="170" height="65" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
    <rect x="110" y="368" width="80" height="22" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
    <circle cx="150" cy="350" r="1" fill="rgba(255,255,255,0.3)" />
    <!-- Penalty Arc Bottom -->
    <path d="M 115 325 A 40 40 0 0 1 185 325" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
  `;

  let playerG = '';
  positions.forEach(pos => {
    playerG += `
      <g class="player-dot" transform="translate(${pos.x}, ${pos.y})">
        <!-- Pulse effect for main results -->
        ${!compact ? `<circle cx="0" cy="0" r="${dotRadius + 3}" fill="none" stroke="var(--color-accent)" stroke-width="1.5" opacity="0.3" />` : ''}
        
        <!-- Main player dot -->
        <circle cx="0" cy="0" r="${dotRadius}" fill="var(--color-accent)" stroke="#fff" stroke-width="2" />
        
        <!-- Player Label inside/above dot -->
        ${showLabels ? `
          <text x="0" y="3" font-family="var(--font-heading)" font-size="${fontSize}px" font-weight="700" fill="var(--color-bg)" text-anchor="middle">
            ${pos.label}
          </text>
        ` : ''}
      </g>
    `;
  });

  svg.innerHTML = drawPitch + playerG;
  container.appendChild(svg);
}

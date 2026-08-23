'use client';

import { useEffect, useRef, useState } from 'react';

type LayerKey = 'center' | 'circle' | 'divisions' | 'triangle' | 'movement' | 'numbers' | 'heart';

const LAYER_LABELS: Record<LayerKey, string> = {
  center: 'Center / zero',
  circle: 'Circumference',
  divisions: '40° divisions',
  triangle: '9 / 3 / 6 triangle',
  movement: '1 / 4 / 2 / 8 / 5 / 7 line',
  numbers: 'Number labels',
  heart: 'Spiritual-heart triangle',
};

const INITIAL_LAYERS: Record<LayerKey, boolean> = {
  center: true,
  circle: true,
  divisions: true,
  triangle: true,
  movement: true,
  numbers: true,
  heart: true,
};

function GeometryCanvas({ layers }: { layers: Record<LayerKey, boolean> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = bounds.width;
      const height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.34;
      const points = new Map<number, { x: number; y: number; angle: number }>();

      for (let number = 1; number <= 9; number += 1) {
        const step = number === 9 ? 0 : number;
        const angle = -Math.PI / 2 + step * (Math.PI * 2 / 9);
        points.set(number, {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          angle,
        });
      }

      const path = (sequence: number[], color: string, widthValue: number) => {
        context.beginPath();
        sequence.forEach((number, index) => {
          const point = points.get(number)!;
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.closePath();
        context.strokeStyle = color;
        context.lineWidth = widthValue;
        context.stroke();
      };

      if (layers.divisions) {
        for (let index = 0; index < 9; index += 1) {
          const angle = -Math.PI / 2 + index * (Math.PI * 2 / 9);
          context.beginPath();
          context.moveTo(cx, cy);
          context.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
          context.strokeStyle = index % 3 === 0 ? 'rgba(216, 187, 127, .22)' : 'rgba(220, 211, 194, .075)';
          context.lineWidth = index % 3 === 0 ? 1 : 0.75;
          context.stroke();
        }
      }

      if (layers.circle) {
        context.beginPath();
        context.arc(cx, cy, radius, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(225, 216, 198, .56)';
        context.lineWidth = 1;
        context.stroke();
      }

      if (layers.triangle) path([9, 3, 6], 'rgba(224, 191, 123, .82)', 1.15);
      if (layers.movement) path([1, 4, 2, 8, 5, 7], 'rgba(202, 190, 163, .62)', 1);

      if (layers.heart) {
        const heartRadius = radius * 0.155;
        context.beginPath();
        for (let index = 0; index < 3; index += 1) {
          const angle = -Math.PI / 2 + index * (Math.PI * 2 / 3);
          const x = cx + Math.cos(angle) * heartRadius;
          const y = cy + Math.sin(angle) * heartRadius;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.strokeStyle = 'rgba(234, 207, 151, .96)';
        context.lineWidth = 1.35;
        context.stroke();
      }

      if (layers.circle || layers.triangle || layers.movement || layers.numbers) {
        points.forEach((point, number) => {
          context.beginPath();
          context.arc(point.x, point.y, number % 3 === 0 ? 2.8 : 2.05, 0, Math.PI * 2);
          context.fillStyle = number % 3 === 0 ? 'rgba(236, 208, 151, .96)' : 'rgba(221, 210, 186, .74)';
          context.fill();

          if (layers.numbers) {
            const labelRadius = radius * 1.11;
            context.font = `${Math.max(10, radius * 0.045)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = number % 3 === 0 ? 'rgba(239, 211, 155, .9)' : 'rgba(178, 169, 150, .78)';
            context.fillText(String(number), cx + Math.cos(point.angle) * labelRadius, cy + Math.sin(point.angle) * labelRadius);
          }
        });
      }

      if (layers.center) {
        const glow = context.createRadialGradient(cx, cy, 0, cx, cy, 24);
        glow.addColorStop(0, 'rgba(231, 199, 135, .28)');
        glow.addColorStop(1, 'rgba(231, 199, 135, 0)');
        context.fillStyle = glow;
        context.fillRect(cx - 26, cy - 26, 52, 52);
        context.beginPath();
        context.arc(cx, cy, 2.35, 0, Math.PI * 2);
        context.fillStyle = 'rgba(246, 224, 178, .98)';
        context.fill();
        if (layers.numbers) {
          context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
          context.textAlign = 'center';
          context.fillStyle = 'rgba(229, 201, 145, .82)';
          context.fillText('0', cx, cy + 17);
        }
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [layers]);

  const activeLayers = (Object.keys(layers) as LayerKey[]).filter((key) => layers[key]).map((key) => LAYER_LABELS[key]);

  return (
    <canvas
      ref={canvasRef}
      className="geometry-canvas"
      role="img"
      aria-label={`Mathematically generated Sufi Enneagram geometry. Visible layers: ${activeLayers.join(', ')}.`}
    />
  );
}

export default function Home() {
  const [layers, setLayers] = useState(INITIAL_LAYERS);

  const toggle = (key: LayerKey) => {
    setLayers((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <main className="prototype-shell">
      <header className="masthead">
        <div className="mark">MD</div>
        <div>
          <p className="overline">Masters of the Design · Geometry Study 01</p>
          <p className="status">Research prototype · no scene animation</p>
        </div>
        <p className="stage-tag">Gate 1 / Review</p>
      </header>

      <section className="workbench">
        <aside className="intro-panel">
          <p className="eyebrow">The settled structure</p>
          <h1>One center.<br />Nine positions.<br />Two number paths.</h1>
          <p className="intro-copy">
            This prototype verifies only the sign’s mathematical construction. It does not yet assign animation to any of the eleven principles.
          </p>

          <div className="formula-list" aria-label="Geometric formulas">
            <p><span>ninefold</span><code>360° ÷ 9 = 40°</code></p>
            <p><span>threefold</span><code>360° ÷ 3 = 120°</code></p>
            <p><span>movement</span><code>1 → 4 → 2 → 8 → 5 → 7</code></p>
            <p><span>recurrence</span><code>1 ÷ 7 = 0.142857…</code></p>
          </div>

          <div className="layer-controls" aria-label="Geometry layers">
            <p className="eyebrow">Inspect layers</p>
            {(Object.keys(LAYER_LABELS) as LayerKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className={layers[key] ? 'layer-button active' : 'layer-button'}
                aria-pressed={layers[key]}
                onClick={() => toggle(key)}
              >
                <span className="indicator" aria-hidden="true" />
                <span>{LAYER_LABELS[key]}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="geometry-stage">
          <div className="axis axis-v" aria-hidden="true" />
          <div className="axis axis-h" aria-hidden="true" />
          <p className="corner-label top">Generated from cx · cy · r · θ</p>
          <GeometryCanvas layers={layers} />
          <p className="corner-label bottom">No traced paths · responsive at every size</p>
        </div>
      </section>

      <section className="explanation" aria-labelledby="explanation-title">
        <div>
          <p className="eyebrow" id="explanation-title">What is generated</p>
          <p>Every numbered position is calculated at an exact 40° interval around one center. The two graphs are drawn from number arrays, so resizing changes scale—not relationships.</p>
        </div>
        <div>
          <p className="eyebrow">What remains separate</p>
          <p>The outer 9 / 3 / 6 numeric triangle and the smaller spiritual-heart triangle near zero are independent layers. The prototype does not pretend they are the same object.</p>
        </div>
        <div>
          <p className="eyebrow">What remains interpretive</p>
          <p>Making eleven Naqshbandi principles alter this sign is our proposed digital experiment. None of those scene behaviors has been built at this review gate.</p>
        </div>
      </section>
    </main>
  );
}

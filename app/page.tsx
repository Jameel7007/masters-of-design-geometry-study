'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

export const dynamic = 'force-static';

type Scene = {
  number: string;
  slug: string;
  transliteration: string;
  english: string;
  overview?: string;
  line: string;
  source: string;
  interpretation: string;
  cue: string;
};

const SCENES: Scene[] = [
  {
    number: '00',
    slug: 'the-point',
    transliteration: 'The Point',
    english: 'Prologue',
    line: 'A center becomes a circumference, nine positions, and two number paths.',
    source: 'Bakhtiar directly supports zero, center and circumference, nine 40° divisions, three 120° regions, and the two number sequences.',
    interpretation: 'Revealing those dependencies as a timed construction is the experience’s narrative device.',
    cue: 'Watch the sign assemble, then move forward.',
  },
  {
    number: '01',
    slug: 'hosh-dar-dam',
    transliteration: 'Hosh dar dam',
    english: 'Conscious breathing',
    overview: 'Safeguard inhalation, exhalation, and the interval between them from heedlessness, so the heart remains connected to the Divine Presence.',
    line: 'The whole sign visibly expands, rests, and gathers without losing its center.',
    source: 'Bakhtiar describes breath as rhythm in time and breath-spirit as movement. The pairing with this principle is conceptually adjacent.',
    interpretation: 'Layered waves of scale, luminosity, and circulation translate attention to breath without prescribing a breathing practice.',
    cue: 'Watch expansion, interval, circulation, and return.',
  },
  {
    number: '02',
    slug: 'nazar-bar-qadam',
    transliteration: 'Nazar bar qadam',
    english: 'Watch your step',
    overview: 'Join gaze and step: lower the gaze, avoid unnecessary sights that veil the heart, and move steadily toward the Divine Presence. Idries Shah adds an emphasis on watchfulness in action.',
    line: 'Only the present position and its next relation come fully into view.',
    source: 'The principle concerns watchfulness and the step. No reviewed source assigns it to an enneagram path.',
    interpretation: 'The moving emphasis along the recurring number path is our visual proposal.',
    cue: 'Follow one relation at a time.',
  },
  {
    number: '03',
    slug: 'safar-dar-watan',
    transliteration: 'Safar dar watan',
    english: 'Journey homeward',
    overview: 'Distinguish outward travel from the inward journey: leave lower manners and worldly desire for higher manners, purity, and movement from creation toward the Creator.',
    line: 'Movement crosses the rim, enters the sign, and approaches zero.',
    source: 'Bakhtiar directly describes inward microcosmic movement toward the spiritual center. Its pairing here is conceptually adjacent.',
    interpretation: 'The traveling point makes that inward relation spatial and visible.',
    cue: 'Trace the passage from circumference to center.',
  },
  {
    number: '04',
    slug: 'khalwat-dar-anjuman',
    transliteration: 'Khalwat dar anjuman',
    english: 'Solitude in the crowd',
    overview: 'Remain outwardly in companionship with people while the heart is inwardly present with God: true seclusion within the gathering.',
    line: 'The circumference remains active while the center stays undisturbed.',
    source: 'Center and circumference are directly supported geometry; their use as inner stillness and outer activity is conceptually adjacent.',
    interpretation: 'Independent peripheral rhythms surround a constant center.',
    cue: 'Let the moving edge and still center coexist.',
  },
  {
    number: '05',
    slug: 'yad-kard',
    transliteration: 'Yad kard',
    english: 'Essential remembrance',
    overview: 'Yad kard is the essence of dhikr: remembrance that polishes the heart and gathers it into contemplation and Divine Presence.',
    line: 'The same path returns, each recurrence leaving a little more clarity.',
    source: 'No reviewed source establishes a one-to-one geometric correspondence for this principle.',
    interpretation: 'Repeated passage through the generated path is our metaphor for remembrance, not a devotional instruction.',
    cue: 'Notice what repetition retains.',
  },
  {
    number: '06',
    slug: 'baz-gasht',
    transliteration: 'Baz gasht',
    english: 'Restraint · returning',
    overview: 'Return to Allah in surrender, submission, and humility, with God as the seeker’s goal. Idries Shah adds the rendering “restraint” or “pulling back” as a secondary linguistic note.',
    line: 'The extended line pulls back through the order from which it came.',
    source: 'The principle holds both return and restraint, but no geometric assignment is established.',
    interpretation: 'A reversible drawing motion preserves both renderings without claiming to resolve them.',
    cue: 'Watch extension become return.',
  },
  {
    number: '07',
    slug: 'nigah-dasht',
    transliteration: 'Nigah dasht',
    english: 'Attentiveness',
    overview: 'Guard the heart from bad thoughts and low inclinations, so attention is not severed from the Divine.',
    line: 'Restlessness disperses the figure; sustained attention lets it align.',
    source: 'The sources describe watchfulness or attentiveness, but give no specific enneagram correspondence.',
    interpretation: 'Press-and-hold steadiness is our accessible interaction metaphor.',
    cue: 'Press and hold the control to steady the sign.',
  },
  {
    number: '08',
    slug: 'yad-dasht',
    transliteration: 'Yad dasht',
    english: 'Recollection',
    overview: 'Safeguard the heart with remembrance in every breath, remain continuously in Divine Presence, and affirm truthful thought over distraction.',
    line: 'Relationships orbit, reverse, and reconfigure around an unbroken thread through the center.',
    source: 'Bakhtiar’s center as unitary focus is directly supported; using it for this principle is conceptually adjacent.',
    interpretation: 'The persistent center-thread anchors a continuously moving field of arcs, points, and rotating relations.',
    cue: 'Follow the moving light while keeping attention on what does not turn.',
  },
  {
    number: '09',
    slug: 'wuquf-i-zamani',
    transliteration: 'Wuquf-i zamani',
    english: 'Pause of time',
    overview: 'Watch each moment for composure or heedlessness, recognizing presence and negligence, thanking God for good, and seeking forgiveness for lapses.',
    line: 'Motion can stop while the evidence of duration remains.',
    source: 'Bakhtiar directly treats breath as rhythm in time. Connecting that idea to this principle is conceptually adjacent.',
    interpretation: 'A visitor-controlled suspension makes temporal awareness visible.',
    cue: 'Pause and release the geometry’s time.',
  },
  {
    number: '10',
    slug: 'wuquf-i-adadi',
    transliteration: 'Wuquf-i adadi',
    english: 'Pause of numbers',
    overview: 'Counting in silent dhikr is not for the account itself: it gathers attention, guards the heart from intrusive thoughts, and turns number toward the One.',
    line: 'Ornament recedes. The exact numerical skeleton remains.',
    source: 'The nine divisions, 3 / 6 / 9 triangle, zero, and 1 / 4 / 2 / 8 / 5 / 7 line are directly supported by Bakhtiar.',
    interpretation: 'Pairing this mathematical disclosure with the principle is our interpretation.',
    cue: 'Read the sign as number and relation.',
  },
  {
    number: '11',
    slug: 'wuquf-i-qalbi',
    transliteration: 'Wuquf-i qalbi',
    english: 'Pause of the heart',
    overview: 'Direct the heart toward Divine Presence until it sees no other beloved, using remembrance to quiet the heart’s alternating turbulence of light and dark.',
    line: 'The periphery yields to the smaller heart-triangle gathered around zero.',
    source: 'Bakhtiar directly supports the spiritual-heart triangle near the center. Its use as this culmination is conceptually adjacent.',
    interpretation: 'The staged recession from periphery to heart to point is our narrative composition.',
    cue: 'Let the outer structure recede.',
  },
  {
    number: '12',
    slug: 'wajhullah',
    transliteration: 'Wajhullah',
    english: 'Sign of the Presence of God',
    line: 'From the point, the complete sign returns: circumference, nine positions, both number paths, heart triangle, and center.',
    source: 'Bakhtiar uses Wajhullah for the Sufi Enneagram as a whole—not for the center point alone.',
    interpretation: 'The final scene resolves into the fully generated Enneagram and holds in stillness, preserving that whole-symbol meaning.',
    cue: 'Watch the complete sign return, then remain with it in stillness.',
  },
];

const HEART_STATIONS = [
  { name: 'Qalb', meaning: 'The Heart', color: '#d7b94f', authority: 'Sayyidina Adam' },
  { name: 'Sirr', meaning: 'The Secret', color: '#9b332d', authority: 'Sayyidina Nuh' },
  { name: 'Sirr as-Sirr', meaning: 'The Secret of the Secret', color: '#ede8dc', authority: 'Sayyidina Ibrahim & Sayyidina Musa' },
  { name: 'Khafa', meaning: 'The Hidden', color: '#3f724d', authority: 'Sayyidina ‘Isa' },
  { name: 'Akhfa', meaning: 'The Most Hidden', color: '#171714', authority: 'The Reality of Sayyidina Muhammad ﷺ' },
] as const;

const MOVEMENT = [1, 4, 2, 8, 5, 7];
const TRIANGLE = [9, 3, 6];

type Point = { x: number; y: number; angle: number };

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function smooth(value: number) {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
}

function GeometryCanvas({
  sceneIndex,
  paused,
  steady,
  reducedMotion,
}: {
  sceneIndex: number;
  paused: boolean;
  steady: boolean;
  reducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let elapsed = reducedMotion ? 3200 : 0;
    let previous = performance.now();
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const delta = Math.min(40, now - previous);
      previous = now;
      if (!paused && !reducedMotion) elapsed += delta;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width * 0.405, height * 0.39);
      const breathWave = sceneIndex === 1
        ? (Math.sin(elapsed * 0.00095 - Math.PI / 2) + 1) / 2
        : 0.5;
      const breath = sceneIndex === 1 ? 0.965 + breathWave * 0.075 : 1;
      const rotation = sceneIndex === 8 && !reducedMotion ? Math.sin(elapsed * 0.00046) * 0.145 : 0;
      const instability = sceneIndex === 7 && !reducedMotion ? (steady ? 0.15 : 1) : 0;
      const radius = baseRadius * breath;
      const points = new Map<number, Point>();

      for (let number = 1; number <= 9; number += 1) {
        const step = number === 9 ? 0 : number;
        const angle = -Math.PI / 2 + step * (Math.PI * 2 / 9) + rotation;
        const wobble = instability * Math.sin(elapsed * 0.006 + number * 1.9) * Math.min(7, radius * 0.018);
        points.set(number, {
          x: cx + Math.cos(angle) * (radius + wobble),
          y: cy + Math.sin(angle) * (radius + wobble),
          angle,
        });
      }

      const stroke = (color: string, lineWidth: number, alpha = 1) => {
        context.strokeStyle = color;
        context.globalAlpha = clamp(alpha);
        context.lineWidth = lineWidth;
        context.stroke();
        context.globalAlpha = 1;
      };

      const drawCircle = (alpha = 1, scale = 1) => {
        context.beginPath();
        context.arc(cx, cy, radius * scale, 0, Math.PI * 2);
        stroke('rgba(226, 217, 199, .68)', 1, alpha);
      };

      const drawDivisions = (alpha = 1) => {
        for (let index = 0; index < 9; index += 1) {
          const angle = -Math.PI / 2 + index * (Math.PI * 2 / 9) + rotation;
          context.beginPath();
          context.moveTo(cx, cy);
          context.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
          stroke(index % 3 === 0 ? 'rgba(216, 187, 127, .30)' : 'rgba(220, 211, 194, .10)', index % 3 === 0 ? 1 : 0.75, alpha);
        }
      };

      const drawPath = (sequence: number[], color: string, alpha = 1, progress = 1, close = true, lineWidth = 1) => {
        const pathPoints = sequence.map((number) => points.get(number)!);
        if (close) pathPoints.push(pathPoints[0]);
        const segmentCount = pathPoints.length - 1;
        const amount = clamp(progress) * segmentCount;
        const completeSegments = Math.floor(amount);
        const remainder = amount - completeSegments;
        context.beginPath();
        context.moveTo(pathPoints[0].x, pathPoints[0].y);
        for (let index = 0; index < completeSegments; index += 1) {
          context.lineTo(pathPoints[index + 1].x, pathPoints[index + 1].y);
        }
        if (completeSegments < segmentCount && remainder > 0) {
          const from = pathPoints[completeSegments];
          const to = pathPoints[completeSegments + 1];
          context.lineTo(from.x + (to.x - from.x) * remainder, from.y + (to.y - from.y) * remainder);
        }
        stroke(color, lineWidth, alpha);
      };

      const drawHeart = (alpha = 1, scale = 1) => {
        const heartRadius = radius * 0.155 * scale;
        context.beginPath();
        for (let index = 0; index < 3; index += 1) {
          const angle = -Math.PI / 2 + index * (Math.PI * 2 / 3);
          const x = cx + Math.cos(angle) * heartRadius;
          const y = cy + Math.sin(angle) * heartRadius;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        stroke('rgba(235, 205, 143, .98)', 1.3, alpha);
      };

      const drawCenter = (alpha = 1, pulse = 1) => {
        const glowRadius = Math.max(18, radius * 0.075) * pulse;
        const glow = context.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        glow.addColorStop(0, `rgba(231, 199, 135, ${0.28 * alpha})`);
        glow.addColorStop(1, 'rgba(231, 199, 135, 0)');
        context.fillStyle = glow;
        context.fillRect(cx - glowRadius, cy - glowRadius, glowRadius * 2, glowRadius * 2);
        context.beginPath();
        context.arc(cx, cy, 2.4, 0, Math.PI * 2);
        context.fillStyle = `rgba(247, 225, 180, ${alpha})`;
        context.fill();
      };

      const drawPointsAndNumbers = (alpha = 1, highlights: number[] = [], numbers = true) => {
        points.forEach((point, number) => {
          const highlighted = highlights.includes(number);
          context.beginPath();
          context.arc(point.x, point.y, highlighted ? 4.2 : number % 3 === 0 ? 2.8 : 2, 0, Math.PI * 2);
          context.fillStyle = highlighted || number % 3 === 0 ? 'rgba(237, 208, 149, .98)' : 'rgba(220, 210, 188, .76)';
          context.globalAlpha = alpha;
          context.fill();
          context.globalAlpha = 1;

          if (numbers) {
            const labelRadius = radius * 1.085;
            const lowerHalf = Math.max(0, Math.sin(point.angle));
            const bottomLift = lowerHalf * Math.min(18, radius * 0.062);
            const labelX = cx + Math.cos(point.angle) * labelRadius;
            const labelY = cy + Math.sin(point.angle) * labelRadius - bottomLift;
            context.font = `${Math.max(10, Math.min(13, radius * 0.045))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = highlighted || number % 3 === 0 ? 'rgba(239, 211, 155, .94)' : 'rgba(180, 171, 151, .82)';
            context.globalAlpha = alpha;
            context.fillText(String(number), labelX, labelY);
            context.globalAlpha = 1;
          }
        });
      };

      const drawZero = (alpha = 1) => {
        const zeroY = cy + radius * 0.0775 + 15;
        context.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = `rgba(12, 12, 11, ${0.82 * alpha})`;
        context.fillRect(cx - 7, zeroY - 7, 14, 14);
        context.fillStyle = `rgba(229, 201, 145, ${0.82 * alpha})`;
        context.fillText('0', cx, zeroY);
      };

      const drawComplete = (alpha = 1, numbers = true) => {
        drawDivisions(alpha * 0.85);
        drawCircle(alpha);
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .88)', alpha, 1, true, 1.15);
        drawPath(MOVEMENT, 'rgba(202, 190, 163, .72)', alpha, 1, true, 1);
        drawHeart(alpha);
        drawPointsAndNumbers(alpha, [], numbers);
        drawCenter(alpha);
        if (numbers) drawZero(alpha);
      };

      if (sceneIndex === 0) {
        const progress = reducedMotion ? 1 : clamp(elapsed / 5600);
        drawCenter(smooth(progress / 0.16));
        drawCircle(smooth((progress - 0.13) / 0.18));
        drawDivisions(smooth((progress - 0.28) / 0.18));
        drawPointsAndNumbers(smooth((progress - 0.43) / 0.16));
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .88)', smooth((progress - 0.60) / 0.16), 1, true, 1.15);
        drawPath(MOVEMENT, 'rgba(202, 190, 163, .72)', 1, smooth((progress - 0.72) / 0.22), true, 1);
        drawHeart(smooth((progress - 0.88) / 0.12));
        drawZero(smooth((progress - 0.43) / 0.16));
      } else if (sceneIndex === 1) {
        const cycle = reducedMotion ? 0.62 : (elapsed % 6600) / 6600;
        drawComplete(0.58 + breathWave * 0.30);
        drawPath(MOVEMENT, 'rgba(239, 207, 146, .98)', 0.34 + breathWave * 0.52, smooth(cycle), true, 1.5);
        for (let ring = 0; ring < 3; ring += 1) {
          const wave = reducedMotion ? 0.46 : (cycle + ring * 0.23) % 1;
          const waveAlpha = Math.sin(wave * Math.PI) * 0.42;
          drawCircle(waveAlpha, 0.86 + wave * 0.25);
        }
        drawHeart(0.72 + breathWave * 0.28, 0.92 + breathWave * 0.16);
        drawCenter(1, 1.15 + breathWave * 0.78);
      } else if (sceneIndex === 2) {
        const step = reducedMotion ? 0 : Math.floor(elapsed / 1350) % MOVEMENT.length;
        const current = MOVEMENT[step];
        const next = MOVEMENT[(step + 1) % MOVEMENT.length];
        drawCircle(0.32);
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .50)', 0.22);
        drawPath([current, next], 'rgba(235, 204, 143, .98)', 1, 1, false, 1.4);
        drawPointsAndNumbers(0.38, [current, next]);
        drawCenter(0.75);
        drawZero(0.7);
      } else if (sceneIndex === 3) {
        drawComplete(0.28);
        const phase = reducedMotion ? 0.5 : (Math.sin(elapsed * 0.00115 - Math.PI / 2) + 1) / 2;
        const edge = points.get(7)!;
        const travelerX = edge.x + (cx - edge.x) * phase;
        const travelerY = edge.y + (cy - edge.y) * phase;
        context.beginPath();
        context.moveTo(edge.x, edge.y);
        context.lineTo(cx, cy);
        stroke('rgba(231, 198, 132, .65)', 1, 0.9);
        context.beginPath();
        context.arc(travelerX, travelerY, 4, 0, Math.PI * 2);
        context.fillStyle = 'rgba(244, 216, 157, .98)';
        context.fill();
        drawCenter(1);
      } else if (sceneIndex === 4) {
        drawDivisions(0.22);
        drawCircle(0.48);
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .48)', 0.34);
        drawPath(MOVEMENT, 'rgba(202, 190, 163, .44)', 0.28);
        points.forEach((point, number) => {
          const pulse = reducedMotion ? 2.5 : 2.5 + (Math.sin(elapsed * 0.0022 + number * 1.4) + 1) * 2.2;
          context.beginPath();
          context.arc(point.x, point.y, pulse, 0, Math.PI * 2);
          context.fillStyle = number % 3 === 0 ? 'rgba(235, 204, 143, .78)' : 'rgba(205, 194, 171, .50)';
          context.fill();
        });
        drawCenter(1);
        drawHeart(0.65);
      } else if (sceneIndex === 5) {
        const progress = reducedMotion ? 1 : (elapsed % 5200) / 5200;
        drawCircle(0.28);
        drawDivisions(0.18);
        drawPath(MOVEMENT, 'rgba(216, 199, 164, .30)', 0.34, 1, true, 1);
        drawPath(MOVEMENT, 'rgba(236, 204, 143, .98)', 1, progress, true, 1.45);
        drawPointsAndNumbers(0.52, [], false);
        drawCenter(1, 1.12);
      } else if (sceneIndex === 6) {
        const cycle = reducedMotion ? 0.62 : (elapsed % 5000) / 5000;
        const progress = cycle < 0.5 ? cycle * 2 : (1 - cycle) * 2;
        drawCircle(0.24);
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .48)', 0.25);
        drawPath(MOVEMENT, 'rgba(235, 203, 142, .96)', 1, progress, true, 1.35);
        drawPointsAndNumbers(0.46, [], false);
        drawCenter(0.9);
      } else if (sceneIndex === 7) {
        drawComplete(steady ? 0.92 : 0.66);
        if (steady) drawCircle(0.44, 1.025);
      } else if (sceneIndex === 8) {
        const orbit = reducedMotion ? 0.35 : elapsed * 0.00038;
        drawComplete(0.56, false);
        for (let ring = 0; ring < 3; ring += 1) {
          const ringRadius = radius * (0.38 + ring * 0.19);
          const start = orbit * (ring % 2 === 0 ? 1 : -1) + ring * 1.7;
          context.beginPath();
          context.arc(cx, cy, ringRadius, start, start + Math.PI * (0.26 + ring * 0.08));
          stroke('rgba(220, 192, 135, .54)', 0.9, 0.72);
          const pointAngle = start + Math.PI * (0.26 + ring * 0.08);
          context.beginPath();
          context.arc(cx + Math.cos(pointAngle) * ringRadius, cy + Math.sin(pointAngle) * ringRadius, 2.6, 0, Math.PI * 2);
          context.fillStyle = 'rgba(240, 211, 153, .9)';
          context.fill();
        }
        context.beginPath();
        context.moveTo(cx, cy - radius * 1.02);
        context.lineTo(cx, cy + radius * 1.02);
        stroke('rgba(236, 205, 145, .90)', 1.1, 1);
        const threadPhase = reducedMotion ? 0.5 : (Math.sin(elapsed * 0.00105 - Math.PI / 2) + 1) / 2;
        context.beginPath();
        context.arc(cx, cy - radius + threadPhase * radius * 2, 3.4, 0, Math.PI * 2);
        context.fillStyle = 'rgba(246, 219, 161, .96)';
        context.fill();
        drawHeart(0.8, reducedMotion ? 1 : 1 + Math.sin(elapsed * 0.0011) * 0.08);
        drawCenter(1, 1.3);
      } else if (sceneIndex === 9) {
        drawComplete(0.68);
        for (let ring = 1; ring <= 3; ring += 1) {
          context.beginPath();
          context.arc(cx, cy, radius * (0.38 + ring * 0.12), -Math.PI / 2, -Math.PI / 2 + Math.PI * (0.18 + ring * 0.1));
          stroke('rgba(216, 187, 127, .30)', 0.8, 0.5);
        }
      } else if (sceneIndex === 10) {
        drawDivisions(1);
        drawCircle(0.72);
        drawPath(TRIANGLE, 'rgba(232, 199, 133, .98)', 1, 1, true, 1.35);
        drawPath(MOVEMENT, 'rgba(216, 204, 179, .88)', 1, 1, true, 1.15);
        drawPointsAndNumbers(1);
        drawCenter(1);
        drawZero(1);
      } else if (sceneIndex === 11) {
        const cycle = reducedMotion ? 0.82 : smooth(clamp((elapsed % 6500) / 5200));
        const peripheral = 0.58 * (1 - cycle) + 0.08;
        drawDivisions(peripheral * 0.65);
        drawCircle(peripheral);
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .70)', peripheral);
        drawPath(MOVEMENT, 'rgba(202, 190, 163, .60)', peripheral);
        drawPointsAndNumbers(peripheral, [], false);
        drawHeart(0.72 + cycle * 0.28, 1 + Math.sin(elapsed * 0.0012) * 0.025);
        drawCenter(1, 1.18);
        drawZero(0.95);
      } else {
        const reveal = reducedMotion ? 1 : smooth(clamp(elapsed / 6800));
        const circleReveal = smooth((reveal - 0.08) / 0.18);
        const divisionReveal = smooth((reveal - 0.20) / 0.18);
        const pointReveal = smooth((reveal - 0.33) / 0.17);
        const triangleReveal = smooth((reveal - 0.47) / 0.18);
        const movementReveal = smooth((reveal - 0.60) / 0.26);
        const heartReveal = smooth((reveal - 0.82) / 0.18);

        drawCircle(circleReveal * 0.90);
        drawDivisions(divisionReveal * 0.88);
        drawPointsAndNumbers(pointReveal * 0.96);
        drawPath(TRIANGLE, 'rgba(232, 199, 133, .98)', 1, triangleReveal, true, 1.28);
        drawPath(MOVEMENT, 'rgba(216, 204, 179, .88)', 1, movementReveal, true, 1.12);
        drawHeart(heartReveal, 1);
        drawCenter(1, reducedMotion ? 1.16 : 1.16 + (1 - reveal) * 0.58);
        drawZero(pointReveal);
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [paused, reducedMotion, sceneIndex, steady]);

  const scene = SCENES[sceneIndex];

  return (
    <canvas
      ref={canvasRef}
      className="geometry-canvas"
      role="img"
      aria-label={`${scene.transliteration}, ${scene.english}. A mathematically generated enneagram changes to express this scene’s interpretive behavior.`}
    />
  );
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return <span aria-hidden="true">{direction === 'left' ? '←' : '→'}</span>;
}

export default function Home() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [steady, setSteady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entered, setEntered] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  const goTo = useCallback((index: number) => {
    setSceneIndex((index + SCENES.length) % SCENES.length);
    setPaused(false);
    setSteady(false);
  }, []);

  const enterAt = useCallback((index = 0) => {
    setEntered(true);
    goTo(index);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [goTo]);

  const openIntroduction = useCallback(() => {
    setEntered(false);
    setIntroStep(0);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        if (entered) goTo(sceneIndex + 1);
        else setIntroStep((current) => Math.min(2, current + 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        if (entered) goTo(sceneIndex - 1);
        else setIntroStep((current) => Math.max(0, current - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entered, goTo, sceneIndex]);

  useEffect(() => {
    const activePoint = document.querySelector<HTMLElement>('.track-point.active');
    activePoint?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [reducedMotion, sceneIndex]);

  const scene = SCENES[sceneIndex];
  const nextScene = SCENES[(sceneIndex + 1) % SCENES.length];
  const previousScene = SCENES[(sceneIndex - 1 + SCENES.length) % SCENES.length];

  if (!entered) {
    return (
      <main className="introduction-shell">
        <header className="intro-masthead">
          <div className="mark" aria-hidden="true">MD</div>
          <div className="identity">
            <p className="overline">Masters of the Design</p>
            <p className="status">An introduction to the Eleven Principles</p>
          </div>
          <button type="button" className="intro-skip" onClick={() => enterAt(0)} aria-label="Skip the introduction and begin with the Point">Begin with the Point <Arrow direction="right" /></button>
        </header>

        <section className="intro-stage" aria-live="polite">
          {introStep === 0 && (
            <div className="intro-page dedication-page" key="dedication">
              <div className="intro-geometry" aria-hidden="true">
                <GeometryCanvas sceneIndex={0} paused={false} steady={false} reducedMotion={reducedMotion} />
              </div>
              <div className="intro-copy-block">
                <p className="intro-kicker">A threshold before the Principles</p>
                <h1>One sign.<br />Eleven ways of attention.</h1>
                <p className="intro-dek">A mathematically generated Sufi Enneagram becomes a field for eleven Naqshbandi principles. The geometry is sourced; the responsive motions are a contemporary interpretation.</p>
                <div className="dedication-card">
                  <span>Dedicated with love and reverence to</span>
                  <strong>Shaykh Abdullah al-Fa’iz ad-Daghestani <b>ق</b></strong>
                  <p>The Red Sulfur among the saints, the Crystal Lamp of this Universe and its Foundation, an Ocean of Wisdom and a Luminary of Knowledge.</p>
                </div>
                <button type="button" className="intro-primary" onClick={() => setIntroStep(1)}>Continue to the five stations <Arrow direction="right" /></button>
              </div>
            </div>
          )}

          {introStep === 1 && (
            <div className="intro-page stations-page" key="stations">
              <div className="intro-heading">
                <p className="intro-kicker">The heart at the center</p>
                <h1>Five stations<br />of the Heart</h1>
                <blockquote>“These Five Stations are the center of the Nine Points.”</blockquote>
                <p className="intro-source-line">From the teachings of Shaykh Abdullah ad-Daghestani ق · <a href="https://naqshbandi.org/the-naqshbandi-golden-chain/the-chain/shaykh-abdullah-al-faiz-ad-daghestani-3/" target="_blank" rel="noreferrer">Read on Naqshbandi.org</a></p>
              </div>
              <div className="station-field">
                {HEART_STATIONS.map((station, index) => (
                  <article className="station-card" key={station.name}>
                    <span className="station-index">0{index + 1}</span>
                    <i className="station-light" style={{ '--station-color': station.color } as CSSProperties} aria-hidden="true" />
                    <div>
                      <h2>{station.name}</h2>
                      <p>{station.meaning}</p>
                      <small>{station.authority}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {introStep === 2 && (
            <div className="intro-page principles-page" key="principles">
              <div className="principles-heading">
                <p className="intro-kicker">The sequence made explicit</p>
                <h1>The eleven<br />principles</h1>
                <p>Each principle changes the behavior of the same sign. Select one to enter there, or begin with the construction of the Point.</p>
                <button type="button" className="intro-primary" onClick={() => enterAt(0)}>Begin with the Point <Arrow direction="right" /></button>
              </div>
              <div className="principle-overview" aria-label="The eleven Naqshbandi principles">
                {SCENES.slice(1, 12).map((item, index) => (
                  <button type="button" className={index === 10 ? 'principle-eleven' : ''} key={item.slug} onClick={() => enterAt(index + 1)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.transliteration}</strong>
                    <small>{item.english}</small>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <nav className="intro-nav" aria-label="Introduction sequence">
          <button type="button" className="intro-arrow intro-previous" onClick={() => setIntroStep((current) => Math.max(0, current - 1))} disabled={introStep === 0} aria-label="Previous introduction page"><Arrow direction="left" /><span>Back</span></button>
          <div>
            {['Dedication', 'Five stations', 'Eleven principles'].map((label, index) => (
              <button type="button" key={label} className={introStep === index ? 'active' : ''} onClick={() => setIntroStep(index)} aria-current={introStep === index ? 'step' : undefined}>
                <span>0{index + 1}</span>{label}
              </button>
            ))}
          </div>
          <button type="button" className="intro-next" onClick={() => introStep === 2 ? enterAt(0) : setIntroStep((current) => current + 1)} aria-label={introStep === 2 ? 'Begin with the Point' : `Continue to ${['Five stations', 'Eleven principles'][introStep]}`}>
            <span className="intro-next-copy">
              <small>{introStep === 2 ? 'Begin the study' : 'Continue to'}</small>
              <strong>{['Five stations', 'Eleven principles', 'The Point'][introStep]}</strong>
            </span>
            <Arrow direction="right" />
          </button>
        </nav>
      </main>
    );
  }

  return (
    <main className="experience-shell">
      <header className="masthead">
        <button className="mark" type="button" onClick={openIntroduction} aria-label="Open the introduction and dedication">MD</button>
        <div className="identity">
          <p className="overline">Masters of the Design</p>
          <p className="status">Dedicated to Shaykh Abdullah al-Fa’iz ad-Daghestani ق</p>
        </div>
        <button type="button" className="intro-return" onClick={openIntroduction}>Introduction</button>
        <div className="header-progress" aria-label={`Scene ${sceneIndex + 1} of ${SCENES.length}`}>
          <span>{String(sceneIndex + 1).padStart(2, '0')}</span>
          <i aria-hidden="true" />
          <span>{String(SCENES.length).padStart(2, '0')}</span>
        </div>
      </header>

      <nav className="sequence-nav" aria-label="Experience sequence">
        <button type="button" className="nav-arrow previous" onClick={() => goTo(sceneIndex - 1)} aria-label={`Previous: ${previousScene.transliteration}`}><Arrow direction="left" /><span>Previous</span></button>
        <div className="scene-track">
          {SCENES.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className={index === sceneIndex ? 'track-point active' : 'track-point'}
              aria-label={`Go to ${item.transliteration}: ${item.english}`}
              aria-current={index === sceneIndex ? 'step' : undefined}
              onClick={() => goTo(index)}
            >
              <span>{item.number}</span>
            </button>
          ))}
        </div>
        <button type="button" className="nav-arrow next" onClick={() => goTo(sceneIndex + 1)} aria-label={sceneIndex === SCENES.length - 1 ? 'Begin again at The Point' : `Next: ${nextScene.transliteration}`}>
          <Arrow direction="right" />
        </button>
      </nav>

      <section className="scene-grid" aria-labelledby={`scene-${scene.slug}`}>
        <div className="geometry-stage" key={`geometry-${scene.slug}`}>
          <div className="axis axis-v" aria-hidden="true" />
          <div className="axis axis-h" aria-hidden="true" />
          <p className="geometry-caption top">Calculated from a center, radius, and angle.</p>
          <GeometryCanvas sceneIndex={sceneIndex} paused={paused} steady={steady} reducedMotion={reducedMotion} />
          <p className="geometry-caption bottom">Nine positions · 40° each</p>
        </div>

        <article className="scene-panel" key={scene.slug}>
          <div className="scene-number" aria-hidden="true">{scene.number}</div>
          <p className="scene-kicker">{sceneIndex === 0 ? 'Prologue' : sceneIndex === SCENES.length - 1 ? 'Epilogue' : `Principle ${scene.number}`}</p>
          <h1 id={`scene-${scene.slug}`}>{scene.transliteration}</h1>
          <p className="english">{scene.english}</p>

          {scene.overview && (
            <aside className="source-overview" aria-label={`Source overview for ${scene.transliteration}`}>
              <span>From the Naqshbandi Shaykhs</span>
              <p>{scene.overview}</p>
            </aside>
          )}

          <p className="scene-line">{scene.line}</p>

          <p className="interaction-cue"><span aria-hidden="true">◇</span>{scene.cue}</p>

          {sceneIndex === 7 && (
            <button
              type="button"
              className={steady ? 'ritual-control active' : 'ritual-control'}
              onPointerDown={() => setSteady(true)}
              onPointerUp={() => setSteady(false)}
              onPointerCancel={() => setSteady(false)}
              onPointerLeave={() => setSteady(false)}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') setSteady(true);
              }}
              onKeyUp={(event) => {
                if (event.key === ' ' || event.key === 'Enter') setSteady(false);
              }}
            >
              <span className="control-pulse" aria-hidden="true" />
              {steady ? 'Alignment held' : 'Hold to steady'}
            </button>
          )}

          {sceneIndex === 9 && (
            <button type="button" className={paused ? 'ritual-control active' : 'ritual-control'} onClick={() => setPaused((current) => !current)} aria-pressed={paused}>
              <span className="control-pulse" aria-hidden="true" />
              {paused ? 'Release time' : 'Pause time'}
            </button>
          )}

          {sceneIndex < SCENES.length - 1 && (
            <button type="button" className="sequence-continue" onClick={() => goTo(sceneIndex + 1)} aria-label={`Continue to ${nextScene.transliteration}: ${nextScene.english}`}>
              <span>{sceneIndex === 0 ? 'Next · Begin Principle 01' : `Next · Principle ${nextScene.number}`}</span>
              <strong>{nextScene.transliteration}</strong>
              <small>{nextScene.english}</small>
              <Arrow direction="right" />
            </button>
          )}

          {sceneIndex === 12 && (
            <button type="button" className="ritual-control" onClick={() => goTo(0)}>
              Begin again <Arrow direction="right" />
            </button>
          )}

          <details className="research-note">
            <summary>{sceneIndex === SCENES.length - 1 ? 'References & interpretation' : 'Source & interpretation'}</summary>
            <div>
              <p><span>Source relation</span>{scene.source}</p>
              <p><span>Design reading</span>{scene.interpretation}</p>
              {sceneIndex === SCENES.length - 1 && (
                <>
                  <p><span>Naqshbandi references</span><a href="https://naqshbandi.org/teachings/topics/the-principles-of-the-naqshbandi-way/" target="_blank" rel="noreferrer">The Principles of the Naqshbandi Way</a> · <a href="https://naqshbandi.org/the-naqshbandi-golden-chain/the-chain/muhammad-bahauddin-shah-naqshband/" target="_blank" rel="noreferrer">Muhammad Baha’uddin Shah Naqshband</a> · <a href="https://naqshbandi.org/the-naqshbandi-golden-chain/the-chain/shaykh-abdullah-al-faiz-ad-daghestani-3/" target="_blank" rel="noreferrer">Shaykh Abdullah al-Fa’iz ad-Daghestani</a></p>
                  <p><span>Secondary note</span>Idries Shah, <cite>A Perfumed Scorpion</cite>.</p>
                </>
              )}
            </div>
          </details>
        </article>
      </section>

      <p className="sr-only" aria-live="polite">Now showing {scene.transliteration}, {scene.english}.</p>
    </main>
  );
}

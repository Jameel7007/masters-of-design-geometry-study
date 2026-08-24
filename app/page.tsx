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
  shaykhQuote?: {
    text: string;
    attribution: string;
  };
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
    line: 'Nine positions and two number paths gather back toward the center from which the sign unfolds.',
    source: 'Bakhtiar directly supports zero, center and circumference, nine 40° divisions, three 120° regions, and the two number sequences.',
    interpretation: 'Revealing those dependencies as a timed construction is the experience’s narrative device.',
    cue: 'Watch every position return to the Point.',
  },
  {
    number: '01',
    slug: 'hosh-dar-dam',
    transliteration: 'Hosh dar dam',
    english: 'Conscious breathing',
    overview: 'Safeguard inhalation, exhalation, and the interval between them from heedlessness, so the heart remains connected to the Divine Presence. Conscious breathing is also remembering: attention reaches toward subtler perception without losing that Presence.',
    shaykhQuote: {
      text: 'This Order is built on breath.',
      attribution: 'Shah Naqshband ق',
    },
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
    overview: 'Join gaze and step: lower the gaze, avoid unnecessary sights that veil the heart, and move steadily toward the Divine Presence. In this joined awareness, every action becomes an occasion for watchfulness and concentration.',
    shaykhQuote: {
      text: 'The gaze precedes the step and the step follows the gaze.',
      attribution: 'Imam ar-Rabbani Ahmad al-Faruqi ق',
    },
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
    overview: 'Distinguish outward travel from the inward journey. To travel in one’s own land is to explore and transform the self: leaving lower manners and worldly desire for higher manners, purity, and movement from creation toward the Creator.',
    line: 'Journeys begin at different points around the circumference and return together to zero.',
    source: 'Bakhtiar directly describes inward microcosmic movement toward the spiritual center. Its pairing here is conceptually adjacent.',
    interpretation: 'The traveling point makes that inward relation spatial and visible.',
    cue: 'Watch the different paths gather into the center.',
  },
  {
    number: '04',
    slug: 'khalwat-dar-anjuman',
    transliteration: 'Khalwat dar anjuman',
    english: 'Solitude in the crowd',
    overview: 'Remain outwardly in companionship with people while the heart is inwardly present with God. Solitude in company becomes a discipline of detaching consciousness from distraction and returning it inwardly without abandoning the gathering.',
    shaykhQuote: {
      text: 'Our Way is Companionship, and Goodness is in the Gathering',
      attribution: 'Shah Naqshband ق',
    },
    line: 'The circumference circulates in many rhythms while the center stays undisturbed.',
    source: 'Center and circumference are directly supported geometry; their use as inner stillness and outer activity is conceptually adjacent.',
    interpretation: 'Independent peripheral rhythms surround a constant center.',
    cue: 'Watch the gathering move around the stillness at its heart.',
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
    overview: 'Return to Allah in surrender, submission, and humility, with God as the seeker’s goal. This returning is also restraint: a pulling back from dispersion toward the Divine aim.',
    shaykhQuote: {
      text: 'When I reached Him I saw that His remembering of me preceded my remembrance of Him.',
      attribution: 'Bayazid',
    },
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
    shaykhQuote: {
      text: 'It has been 40 years that Allah has been looking at my heart and has seen no one except Himself.',
      attribution: 'Abul Hassan al-Kharqani',
    },
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
    overview: 'Watch each moment for composure or heedlessness, recognizing presence and negligence, thanking God for good, and seeking forgiveness for lapses. The pause becomes a reprise in which thought and action can be seen again.',
    line: 'Turning rings make duration visible; one touch holds them at a single moment.',
    source: 'Bakhtiar directly treats breath as rhythm in time. Connecting that idea to this principle is conceptually adjacent.',
    interpretation: 'A visitor-controlled suspension makes temporal awareness visible.',
    cue: 'Use the control beneath the sign to pause the rings, then release them.',
  },
  {
    number: '10',
    slug: 'wuquf-i-adadi',
    transliteration: 'Wuquf-i adadi',
    english: 'Pause of numbers',
    overview: 'Counting in silent dhikr is not for the account itself: it gathers attention, guards the heart from intrusive thoughts, and turns number toward the One.',
    line: 'The nine positions are counted one by one; each number is held in relation to the single center.',
    source: 'The nine divisions, 3 / 6 / 9 triangle, zero, and 1 / 4 / 2 / 8 / 5 / 7 line are directly supported by Bakhtiar.',
    interpretation: 'A recurring count highlights one position at a time and gathers the completed cycle into the center; it is a visual metaphor, not a dhikr instruction.',
    cue: 'Follow the count around the sign, then watch the nine gather into One.',
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
    cue: 'Watch the outer structure soften into the heart, then return.',
  },
  {
    number: '12',
    slug: 'wajhullah',
    transliteration: 'Wajhullah',
    english: 'Sign of the Presence of God',
    line: 'The complete sign returns, then three quadrangular fields and their tributary lines draw the nine positions toward the spiritual heart.',
    source: 'Bakhtiar uses Wajhullah for the Sufi Enneagram as a whole. She also describes the nine positions connected through the threefold divisions to the positive trait of each segment, forming three quadrangles, with secondary lines compared to tributaries returning to a primary flow.',
    interpretation: 'The epilogue reveals those three quadrangular fields and inward connections after the familiar circle and number paths, treating the additional linework as an animated reading of Bakhtiar’s internal architecture.',
    cue: 'Watch the familiar sign complete itself, then open into its deeper network of lines.',
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
  const elapsedRef = useRef(0);
  const elapsedSceneRef = useRef(sceneIndex);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    if (elapsedSceneRef.current !== sceneIndex) {
      elapsedSceneRef.current = sceneIndex;
      elapsedRef.current = 0;
    }
    let elapsed = reducedMotion ? 3200 : elapsedRef.current;
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
      if (!paused && !reducedMotion) {
        elapsed += delta;
        elapsedRef.current = elapsed;
      }

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

      const drawCoordinatePath = (pathPoints: Point[], color: string, alpha = 1, progress = 1, close = true, lineWidth = 1) => {
        const coordinates = close ? [...pathPoints, pathPoints[0]] : pathPoints;
        const segmentCount = coordinates.length - 1;
        const amount = clamp(progress) * segmentCount;
        const completeSegments = Math.floor(amount);
        const remainder = amount - completeSegments;
        context.beginPath();
        context.moveTo(coordinates[0].x, coordinates[0].y);
        for (let index = 0; index < completeSegments; index += 1) {
          context.lineTo(coordinates[index + 1].x, coordinates[index + 1].y);
        }
        if (completeSegments < segmentCount && remainder > 0) {
          const from = coordinates[completeSegments];
          const to = coordinates[completeSegments + 1];
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
        const progress = reducedMotion ? 1 : clamp(elapsed / 6500);
        drawCenter(smooth(progress / 0.16));
        drawCircle(smooth((progress - 0.13) / 0.18));
        drawDivisions(smooth((progress - 0.28) / 0.18));
        drawPointsAndNumbers(smooth((progress - 0.43) / 0.16));
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .88)', smooth((progress - 0.60) / 0.16), 1, true, 1.15);
        drawPath(MOVEMENT, 'rgba(202, 190, 163, .72)', 1, smooth((progress - 0.70) / 0.18), true, 1);
        drawHeart(smooth((progress - 0.84) / 0.10));
        drawZero(smooth((progress - 0.43) / 0.16));

        const convergence = smooth((progress - 0.86) / 0.14);
        const inwardAlpha = Math.sin(convergence * Math.PI);
        if (inwardAlpha > 0) {
          points.forEach((point, number) => {
            const travelerX = point.x + (cx - point.x) * convergence;
            const travelerY = point.y + (cy - point.y) * convergence;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(travelerX, travelerY);
            stroke(number % 3 === 0 ? 'rgba(239, 207, 145, .78)' : 'rgba(214, 198, 166, .54)', 0.9, inwardAlpha * 0.84);
            context.beginPath();
            context.arc(travelerX, travelerY, 2.8 - convergence * 0.8, 0, Math.PI * 2);
            context.fillStyle = `rgba(242, 214, 157, ${inwardAlpha * 0.96})`;
            context.fill();
          });
        }
        drawCenter(0.78 + convergence * 0.22, 1 + convergence * 0.9);
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
        drawComplete(0.24);
        const cycle = reducedMotion ? 0.84 : (elapsed % 7600) / 7600;
        const inwardOrder = [1, 6, 2, 7, 3, 8, 4, 9, 5];
        let gathered = 0;

        inwardOrder.forEach((number, index) => {
          const origin = points.get(number)!;
          const start = 0.07 + index * 0.06;
          const progress = smooth((cycle - start) / 0.29);
          const arrivalFade = 1 - smooth((cycle - 0.87) / 0.08);
          const active = smooth((cycle - start) / 0.035) * arrivalFade;
          const travelerX = origin.x + (cx - origin.x) * progress;
          const travelerY = origin.y + (cy - origin.y) * progress;
          gathered += progress;

          context.beginPath();
          context.moveTo(origin.x, origin.y);
          context.lineTo(cx, cy);
          stroke(number % 3 === 0 ? 'rgba(235, 202, 138, .62)' : 'rgba(209, 197, 173, .34)', 0.85, active * (0.22 + progress * 0.48));

          context.beginPath();
          context.arc(travelerX, travelerY, 3.2 + (1 - progress) * 0.8, 0, Math.PI * 2);
          context.fillStyle = number % 3 === 0
            ? `rgba(244, 213, 151, ${active})`
            : `rgba(226, 210, 178, ${active * 0.9})`;
          context.fill();
        });

        const convergence = gathered / inwardOrder.length;
        drawHeart(0.38 + convergence * 0.34);
        drawCenter(0.82 + convergence * 0.18, 1.08 + convergence * 0.92);
      } else if (sceneIndex === 4) {
        drawDivisions(0.18);
        drawCircle(0.62);
        drawCircle(0.18, 1.025);
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .48)', 0.30);
        drawPath(MOVEMENT, 'rgba(202, 190, 163, .44)', 0.24);

        const orbitTime = reducedMotion ? 0.4 : elapsed * 0.00042;
        const arcLayers = [
          { scale: 0.965, speed: 1, offset: 0.1, length: 0.34 },
          { scale: 1, speed: -0.72, offset: 2.15, length: 0.24 },
          { scale: 1.035, speed: 0.48, offset: 4.1, length: 0.18 },
        ];

        arcLayers.forEach((arc, index) => {
          const start = arc.offset + orbitTime * arc.speed;
          const end = start + Math.PI * arc.length * Math.sign(arc.speed);
          context.beginPath();
          context.arc(cx, cy, radius * arc.scale, start, end, arc.speed < 0);
          stroke(
            index === 0 ? 'rgba(239, 208, 148, .82)' : 'rgba(210, 197, 171, .54)',
            index === 0 ? 1.35 : 0.9,
            reducedMotion ? 0.58 : 0.72,
          );
        });

        for (let index = 0; index < 5; index += 1) {
          const direction = index % 2 === 0 ? 1 : -1;
          const speed = 0.72 + index * 0.13;
          const angle = index * (Math.PI * 2 / 5) + orbitTime * direction * speed;
          const orbitRadius = radius * (0.985 + ((index % 3) - 1) * 0.018);
          const tailAngle = angle - direction * 0.11;
          const x = cx + Math.cos(angle) * orbitRadius;
          const y = cy + Math.sin(angle) * orbitRadius;

          context.beginPath();
          context.moveTo(
            cx + Math.cos(tailAngle) * orbitRadius,
            cy + Math.sin(tailAngle) * orbitRadius,
          );
          context.lineTo(x, y);
          stroke(
            index % 2 === 0 ? 'rgba(241, 210, 151, .78)' : 'rgba(213, 199, 172, .50)',
            1,
            0.78,
          );

          context.beginPath();
          context.arc(x, y, index === 0 ? 3.8 : 2.8, 0, Math.PI * 2);
          context.fillStyle = index === 0 ? 'rgba(247, 217, 158, .98)' : 'rgba(225, 208, 177, .82)';
          context.fill();
        }

        points.forEach((point, number) => {
          const pulse = reducedMotion
            ? 2.8
            : 2.6 + (Math.sin(elapsed * (0.0018 + number * 0.00003) + number * 1.4) + 1) * 2.5;
          context.beginPath();
          context.arc(point.x, point.y, pulse, 0, Math.PI * 2);
          context.fillStyle = number % 3 === 0 ? 'rgba(235, 204, 143, .78)' : 'rgba(205, 194, 171, .50)';
          context.fill();
        });
        drawHeart(0.62);
        drawCenter(1, 1.22);
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
        const timeAngle = reducedMotion ? -Math.PI * 0.36 : elapsed * 0.00052;
        drawComplete(0.48);
        for (let ring = 1; ring <= 3; ring += 1) {
          const ringRadius = radius * (0.34 + ring * 0.14);
          const direction = ring % 2 === 0 ? -1 : 1;
          const start = -Math.PI / 2 + timeAngle * direction * (0.72 + ring * 0.16);
          const arcLength = Math.PI * (0.26 + ring * 0.12);
          context.beginPath();
          context.arc(cx, cy, ringRadius, start, start + arcLength * direction, direction < 0);
          stroke(ring === 2 ? 'rgba(236, 204, 143, .82)' : 'rgba(216, 193, 150, .58)', ring === 2 ? 1.25 : 0.9, 0.86);

          const end = start + arcLength * direction;
          context.beginPath();
          context.arc(cx + Math.cos(end) * ringRadius, cy + Math.sin(end) * ringRadius, ring === 2 ? 3.5 : 2.6, 0, Math.PI * 2);
          context.fillStyle = ring === 2 ? 'rgba(246, 216, 158, .98)' : 'rgba(224, 205, 169, .82)';
          context.fill();
        }

        const handRadius = radius * 0.76;
        context.beginPath();
        context.moveTo(cx, cy);
        context.lineTo(cx + Math.cos(timeAngle - Math.PI / 2) * handRadius, cy + Math.sin(timeAngle - Math.PI / 2) * handRadius);
        stroke('rgba(237, 205, 144, .70)', 1, 0.82);
        drawCenter(1, paused ? 1.65 : 1.26);
      } else if (sceneIndex === 10) {
        const countPhase = reducedMotion ? 0.62 : (elapsed % 9000) / 9000;
        const countSpan = 0.78;
        const rawCount = clamp(countPhase / countSpan) * 9;
        const completed = Math.min(9, Math.floor(rawCount));
        const activeNumber = Math.min(9, completed + 1);
        const activeProgress = rawCount - Math.floor(rawCount);
        const gathering = smooth((countPhase - 0.80) / 0.18);
        const gatheringAlpha = Math.sin(gathering * Math.PI);

        drawDivisions(0.30);
        drawCircle(0.62);
        drawPath(TRIANGLE, 'rgba(232, 199, 133, .98)', 0.42, 1, true, 1.2);
        drawPath(MOVEMENT, 'rgba(216, 204, 179, .88)', 0.38, 1, true, 1.05);
        drawPointsAndNumbers(0.52);

        for (let number = 1; number <= 9; number += 1) {
          const point = points.get(number)!;
          const counted = number <= completed;
          const isActive = countPhase < countSpan && number === activeNumber;

          if (counted || isActive) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(cx, cy);
            stroke(isActive ? 'rgba(242, 210, 149, .88)' : 'rgba(215, 195, 158, .46)', isActive ? 1.25 : 0.75, (isActive ? 0.92 : 0.34) * (1 - gathering));
          }

          if (counted) {
            context.beginPath();
            context.arc(point.x, point.y, 3.1, 0, Math.PI * 2);
            context.fillStyle = 'rgba(226, 205, 165, .76)';
            context.globalAlpha = 1 - gathering;
            context.fill();
            context.globalAlpha = 1;
          }

          if (isActive) {
            const pulse = Math.sin(activeProgress * Math.PI);
            context.beginPath();
            context.arc(point.x, point.y, 6 + pulse * 5, 0, Math.PI * 2);
            stroke('rgba(244, 214, 155, .92)', 1.15, 0.54 + pulse * 0.46);
            context.beginPath();
            context.arc(point.x, point.y, 3.9, 0, Math.PI * 2);
            context.fillStyle = 'rgba(248, 220, 163, .98)';
            context.fill();
          }

          if (gatheringAlpha > 0) {
            const travelerX = point.x + (cx - point.x) * gathering;
            const travelerY = point.y + (cy - point.y) * gathering;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(travelerX, travelerY);
            stroke(number % 3 === 0 ? 'rgba(240, 207, 145, .72)' : 'rgba(211, 197, 169, .48)', 0.8, gatheringAlpha * 0.68);
            context.beginPath();
            context.arc(travelerX, travelerY, 2.7, 0, Math.PI * 2);
            context.fillStyle = `rgba(242, 215, 163, ${gatheringAlpha * 0.90})`;
            context.fill();
          }
        }

        drawHeart(0.48 + gathering * 0.42);
        drawCenter(1, 1.08 + (completed / 9) * 0.18 + gathering * 0.86);
        drawZero(1);
      } else if (sceneIndex === 11) {
        const phase = reducedMotion ? 0.5 : (elapsed % 12000) / 12000;
        const cycle = reducedMotion ? 0.82 : smooth((1 - Math.cos(phase * Math.PI * 2)) / 2);
        const peripheral = 0.62 * (1 - cycle) + 0.10;
        drawDivisions(peripheral * 0.65);
        drawCircle(peripheral);
        drawPath(TRIANGLE, 'rgba(224, 191, 123, .70)', peripheral);
        drawPath(MOVEMENT, 'rgba(202, 190, 163, .60)', peripheral);
        drawPointsAndNumbers(peripheral, [], false);
        drawHeart(0.68 + cycle * 0.32, 0.96 + cycle * 0.10);
        drawCenter(1, 1.12 + cycle * 0.34);
        drawZero(0.95);
      } else {
        const reveal = reducedMotion ? 1 : smooth(clamp(elapsed / 9200));
        const circleReveal = smooth((reveal - 0.05) / 0.16);
        const divisionReveal = smooth((reveal - 0.16) / 0.16);
        const pointReveal = smooth((reveal - 0.27) / 0.15);
        const triangleReveal = smooth((reveal - 0.39) / 0.16);
        const movementReveal = smooth((reveal - 0.51) / 0.20);
        const heartReveal = smooth((reveal - 0.67) / 0.13);
        const quadrangleReveal = smooth((reveal - 0.75) / 0.18);
        const tributaryReveal = smooth((reveal - 0.84) / 0.16);

        drawCircle(circleReveal * 0.90);
        drawDivisions(divisionReveal * 0.88);
        drawPointsAndNumbers(pointReveal * 0.96);
        drawPath(TRIANGLE, 'rgba(232, 199, 133, .98)', 1, triangleReveal, true, 1.28);
        drawPath(MOVEMENT, 'rgba(216, 204, 179, .88)', 1, movementReveal, true, 1.12);
        drawHeart(heartReveal, 1);
        drawCenter(1, reducedMotion ? 1.16 : 1.16 + (1 - reveal) * 0.58);

        const heartRadius = radius * 0.155;
        const heartPoints: Point[] = [0, 1, 2].map((index) => {
          const angle = -Math.PI / 2 + index * (Math.PI * 2 / 3);
          return {
            x: cx + Math.cos(angle) * heartRadius,
            y: cy + Math.sin(angle) * heartRadius,
            angle,
          };
        });
        const quadrangleGroups = [
          { outer: [8, 9, 1], inner: heartPoints[0] },
          { outer: [2, 3, 4], inner: heartPoints[1] },
          { outer: [5, 6, 7], inner: heartPoints[2] },
        ];

        quadrangleGroups.forEach((group, index) => {
          const localReveal = smooth(quadrangleReveal * 3 - index);
          const coordinates = [...group.outer.map((number) => points.get(number)!), group.inner];
          drawCoordinatePath(coordinates, index === 0 ? 'rgba(238, 207, 148, .82)' : 'rgba(214, 199, 169, .66)', 0.84, localReveal, true, 0.95);
        });

        const tributaries = quadrangleGroups.flatMap((group) => (
          group.outer.map((number) => ({ outer: points.get(number)!, inner: group.inner, number }))
        ));
        tributaries.forEach((line, index) => {
          const localReveal = smooth(tributaryReveal * tributaries.length - index);
          const travelerX = line.outer.x + (line.inner.x - line.outer.x) * localReveal;
          const travelerY = line.outer.y + (line.inner.y - line.outer.y) * localReveal;
          context.beginPath();
          context.moveTo(line.outer.x, line.outer.y);
          context.lineTo(travelerX, travelerY);
          stroke(line.number % 3 === 0 ? 'rgba(240, 208, 148, .58)' : 'rgba(205, 193, 168, .38)', line.number % 3 === 0 ? 0.9 : 0.72, localReveal * 0.82);
        });

        drawHeart(heartReveal * (0.78 + tributaryReveal * 0.22), 1);
        drawCenter(1, 1.16 + tributaryReveal * 0.48);
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
    if (!entered) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [entered, introStep]);

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
                <button type="button" className="intro-primary" onClick={() => setIntroStep(2)}>Continue to the eleven principles <Arrow direction="right" /></button>
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
                <p>The explanations bring the teachings of the Naqshbandi Shaykhs into dialogue with the sacred geometry. Each principle reveals a different expression of the same sign.</p>
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
        <div className={sceneIndex === 7 || sceneIndex === 9 ? 'geometry-stage has-control' : 'geometry-stage'} key={`geometry-${scene.slug}`}>
          <div className="axis axis-v" aria-hidden="true" />
          <div className="axis axis-h" aria-hidden="true" />
          <GeometryCanvas sceneIndex={sceneIndex} paused={paused} steady={steady} reducedMotion={reducedMotion} />
          <p className="geometry-caption bottom">Nine positions · 40° each</p>
          {sceneIndex === 7 && (
            <div className="geometry-interaction">
              <button
                type="button"
                className={steady ? 'geometry-control hold active' : 'geometry-control hold'}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setSteady(true);
                }}
                onPointerUp={(event) => {
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
                  setSteady(false);
                }}
                onPointerCancel={() => setSteady(false)}
                onLostPointerCapture={() => setSteady(false)}
                onContextMenu={(event) => event.preventDefault()}
                onKeyDown={(event) => {
                  if (event.key === ' ' || event.key === 'Enter') setSteady(true);
                }}
                onKeyUp={(event) => {
                  if (event.key === ' ' || event.key === 'Enter') setSteady(false);
                }}
                aria-pressed={steady}
              >
                <span className="control-pulse" aria-hidden="true" />
                <span><small>{steady ? 'Attention held' : 'Touch and hold'}</small><strong>{steady ? 'Geometry aligned' : 'Hold to steady'}</strong></span>
              </button>
            </div>
          )}
          {sceneIndex === 9 && (
            <div className="geometry-interaction">
              <button type="button" className={paused ? 'geometry-control time active' : 'geometry-control time'} onClick={() => setPaused((current) => !current)} aria-pressed={paused}>
                <span className="control-pulse" aria-hidden="true" />
                <span><small>{paused ? 'Time is held' : 'Time is moving'}</small><strong>{paused ? 'Resume the rings' : 'Pause the rings'}</strong></span>
              </button>
            </div>
          )}
        </div>

        <article className="scene-panel" key={scene.slug}>
          <div className="scene-number" aria-hidden="true">{scene.number}</div>
          <p className="scene-kicker">{sceneIndex === 0 ? 'Prologue' : sceneIndex === SCENES.length - 1 ? 'Epilogue' : `Principle ${scene.number}`}</p>
          <h1 id={`scene-${scene.slug}`}>{scene.transliteration}</h1>
          <p className="english">{scene.english}</p>

          {scene.overview && (
            <aside className="source-overview" aria-label={`Overview of ${scene.transliteration}`}>
              <p>{scene.overview}</p>
            </aside>
          )}

          {scene.shaykhQuote && (
            <figure className="shaykh-quote">
              <blockquote>“{scene.shaykhQuote.text}”</blockquote>
              <figcaption>— {scene.shaykhQuote.attribution} · <a href="https://naqshbandi.org/teachings/topics/the-principles-of-the-naqshbandi-way/" target="_blank" rel="noreferrer">Source</a></figcaption>
            </figure>
          )}

          <p className="scene-line">{scene.line}</p>

          <p className="interaction-cue"><span aria-hidden="true">◇</span>{scene.cue}</p>

          <div className={sceneIndex === 0 ? 'sequence-actions single' : 'sequence-actions'} aria-label="Page navigation">
            {sceneIndex > 0 && (
              <button type="button" className="sequence-back" onClick={() => goTo(sceneIndex - 1)} aria-label={sceneIndex === 1 ? 'Return to The Point' : 'Go to the previous principle'}>
                <Arrow direction="left" />
                <span>{sceneIndex === 1 ? 'Back to the Point' : 'Previous principle'}</span>
              </button>
            )}

            {sceneIndex < SCENES.length - 1 ? (
              <button type="button" className="sequence-continue" onClick={() => goTo(sceneIndex + 1)} aria-label={sceneIndex === 0 ? 'Continue to the first principle' : sceneIndex === SCENES.length - 2 ? 'Continue to the epilogue' : 'Continue to the next principle'}>
                <span>{sceneIndex === 0 ? 'Begin the study' : sceneIndex === SCENES.length - 2 ? 'Complete the study' : 'Continue'}</span>
                <strong>{sceneIndex === 0 ? 'First principle' : sceneIndex === SCENES.length - 2 ? 'Epilogue' : 'Next principle'}</strong>
                <Arrow direction="right" />
              </button>
            ) : (
              <button type="button" className="sequence-continue" onClick={() => goTo(0)} aria-label="Begin again at The Point">
                <span>Return to center</span>
                <strong>Begin again at The Point</strong>
                <Arrow direction="right" />
              </button>
            )}
          </div>

          <details className="research-note">
            <summary>{sceneIndex === SCENES.length - 1 ? 'References & interpretation' : 'Source & interpretation'}</summary>
            <div>
              <p><span>Source relation</span>{scene.source}</p>
              <p><span>Design reading</span>{scene.interpretation}</p>
              {sceneIndex === SCENES.length - 1 && (
                <>
                  <p><span>Naqshbandi references</span><a href="https://naqshbandi.org/teachings/topics/the-principles-of-the-naqshbandi-way/" target="_blank" rel="noreferrer">The Principles of the Naqshbandi Way</a> · <a href="https://naqshbandi.org/the-naqshbandi-golden-chain/the-chain/muhammad-bahauddin-shah-naqshband/" target="_blank" rel="noreferrer">Muhammad Baha’uddin Shah Naqshband</a> · <a href="https://naqshbandi.org/the-naqshbandi-golden-chain/the-chain/shaykh-abdullah-al-faiz-ad-daghestani-3/" target="_blank" rel="noreferrer">Shaykh Abdullah al-Fa’iz ad-Daghestani</a></p>
                  <p><span>Construction note</span>The diagram is calculated from a center, radius, and angle.</p>
                  <p><span>Idries Shah</span><cite>A Perfumed Scorpion</cite>, “The Eleven Rules of the Naqshbandiyya (Masters of the Design),” pp. 85–87.</p>
                </>
              )}
            </div>
          </details>

          {sceneIndex === SCENES.length - 1 && (
            <footer className="creator-signature" aria-label="Created and designed by Muhammad Jameel">
              <span className="creator-monogram" aria-hidden="true">MJ</span>
              <span>
                <small>Created &amp; designed by</small>
                <strong>Muhammad Jameel</strong>
              </span>
            </footer>
          )}
        </article>
      </section>

      <p className="sr-only" aria-live="polite">Now showing {scene.transliteration}, {scene.english}.</p>
    </main>
  );
}

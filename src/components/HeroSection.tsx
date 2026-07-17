import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import CalendlyModal from "@/components/CalendlyModal";

// ── Robot Full-Scene Animation ──────────────────────────────────────────────
const RobotAnimation = () => {
  const stageRef    = useRef<HTMLDivElement>(null);
  const robotRootRef= useRef<HTMLDivElement>(null);
  const robotSvgRef = useRef<SVGSVGElement>(null);
  const antennaRef  = useRef<SVGGElement>(null);
  // Left eye refs
  const scleraRef   = useRef<SVGCircleElement>(null);
  const irisRef     = useRef<SVGCircleElement>(null);
  const pupilRef    = useRef<SVGCircleElement>(null);
  const catchRef    = useRef<SVGCircleElement>(null);
  const ring1Ref    = useRef<SVGCircleElement>(null);
  // Right eye refs
  const scleraRRef  = useRef<SVGCircleElement>(null);
  const irisRRef    = useRef<SVGCircleElement>(null);
  const pupilRRef   = useRef<SVGCircleElement>(null);
  const catchRRef   = useRef<SVGCircleElement>(null);
  const ring1RRef   = useRef<SVGCircleElement>(null);
  const squintRef   = useRef<SVGRectElement>(null);
  const squintLRef  = useRef<SVGPathElement>(null);
  const blushLRef   = useRef<SVGEllipseElement>(null);
  const blushRRef   = useRef<SVGEllipseElement>(null);
  const bubbleRef   = useRef<HTMLDivElement>(null);
  const blessRef    = useRef<HTMLDivElement>(null);
  const jokeRef     = useRef<HTMLDivElement>(null);
  // Arm refs
  const armLRef     = useRef<SVGGElement>(null);
  const armRRef     = useRef<SVGGElement>(null);
  // Gesture / idle state
  const gestureRef  = useRef<'awake'|'sleeping'|'bored'|'wave'|'thinking'>('sleeping');
  const nearbyRef   = useRef(false);
  // Sleep eye overlay refs
  const sleepLRef   = useRef<SVGRectElement>(null);
  const sleepRRef   = useRef<SVGRectElement>(null);
  // ZZZ ref
  const zzzRef      = useRef<HTMLDivElement>(null);

  /* ── eye tracking + proximity detection ── */
  useEffect(() => {
    // Left eye base center: cx=80, Right eye base center: cx=150 (both at cy=68)
    const L_CX = 80, R_CX = 150, EYE_CY = 68, MAX_TRAVEL = 5.0;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf: number;
    let wakeTimeout: ReturnType<typeof setTimeout> | null = null;

    const setPos = (ox: number, oy: number) => {
      // Left eye
      [scleraRef, irisRef, pupilRef, ring1Ref].forEach(r => {
        if (r.current) { r.current.setAttribute('cx', String(L_CX + ox)); r.current.setAttribute('cy', String(EYE_CY + oy)); }
      });
      if (catchRef.current) { catchRef.current.setAttribute('cx', String(L_CX + ox + 2)); catchRef.current.setAttribute('cy', String(EYE_CY + oy - 3)); }
      // Right eye (same offset)
      [scleraRRef, irisRRef, pupilRRef, ring1RRef].forEach(r => {
        if (r.current) { r.current.setAttribute('cx', String(R_CX + ox)); r.current.setAttribute('cy', String(EYE_CY + oy)); }
      });
      if (catchRRef.current) { catchRRef.current.setAttribute('cx', String(R_CX + ox + 2)); catchRRef.current.setAttribute('cy', String(EYE_CY + oy - 3)); }
    };

    const setEyesOpen = (open: boolean) => {
      const op = open ? '0' : '1';
      if (sleepLRef.current) sleepLRef.current.style.opacity = op;
      if (sleepRRef.current) sleepRRef.current.style.opacity = op;
    };

    const onMove = (e: MouseEvent) => {
      const root = robotRootRef.current; if (!root) return;
      const rect = root.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width * 0.50);
      const dy = e.clientY - (rect.top  + rect.height * 0.30);
      const dist = Math.sqrt(dx*dx + dy*dy);
      const wasNear = nearbyRef.current;
      nearbyRef.current = dist < 320;

      if (nearbyRef.current && !wasNear) {
        // Wake up!
        if (wakeTimeout) clearTimeout(wakeTimeout);
        gestureRef.current = 'awake';
        setEyesOpen(true);
        if (zzzRef.current) zzzRef.current.style.opacity = '0';
        if (armLRef.current) { armLRef.current.style.transform = ''; }
        if (armRRef.current) { armRRef.current.style.transform = ''; }
        if (robotSvgRef.current) {
          robotSvgRef.current.style.transform = '';
          robotSvgRef.current.style.filter = 'drop-shadow(0 0 28px rgba(0,212,255,0.6))';
          setTimeout(() => { if (robotSvgRef.current) robotSvgRef.current.style.filter = ''; }, 600);
        }
      }

      if (nearbyRef.current) {
        const angle = Math.atan2(dy, dx);
        const travel = Math.min(dist/60, 1) * MAX_TRAVEL;
        tx = Math.cos(angle) * travel; ty = Math.sin(angle) * travel;
      }
    };
    const loop = () => { cx += (tx-cx)*0.10; cy += (ty-cy)*0.10; if (gestureRef.current === 'awake') setPos(cx, cy); raf = requestAnimationFrame(loop); };
    window.addEventListener('mousemove', onMove);
    loop();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); if (wakeTimeout) clearTimeout(wakeTimeout); };
  }, []);

  /* ── sneeze ── */
  useEffect(() => {
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    const root = robotRootRef.current; if (!root) return;
    let sneezing = false;
    const setBody = (rot: number, ty: number) => {
      if (!robotSvgRef.current) return;
      robotSvgRef.current.style.transform = `rotate(${rot}deg) translateY(${ty}px)`;
      robotSvgRef.current.style.transformOrigin = '50% 80%';
    };
    const setAnt = (r: number) => {
      if (!antennaRef.current) return;
      antennaRef.current.style.transform = `rotate(${r}deg)`;
      antennaRef.current.style.transformOrigin = '115px 8px';
    };
    const setSquint = (op: number) => {
      if (squintRef.current) squintRef.current.style.opacity = String(op);
      if (squintLRef.current) squintLRef.current.style.opacity = String(op);
    };
    const setBlush = (a: number) => {
      const col = `rgba(255,100,140,${a})`;
      blushLRef.current?.setAttribute('fill', col);
      blushRRef.current?.setAttribute('fill', col);
    };
    const doSneeze = async () => {
      if (sneezing || gestureRef.current !== 'awake') return; sneezing = true;
      setBody(-6,-5); setAnt(-12); await sleep(120);
      setSquint(0.5); await sleep(150);
      setBody(-9,-7); setAnt(10); await sleep(120);
      setSquint(0.85); setAnt(-8); await sleep(160);
      setSquint(1); await sleep(100);
      setBody(14,8); setAnt(20);
      if (bubbleRef.current) { bubbleRef.current.classList.remove('rs-bubble-hide'); bubbleRef.current.classList.add('rs-bubble-show'); }
      if (robotSvgRef.current) robotSvgRef.current.style.filter = 'drop-shadow(0 0 36px rgba(0,212,255,0.85))';
      await sleep(160);
      setBody(-3,-3); setAnt(-5);
      if (robotSvgRef.current) robotSvgRef.current.style.filter = '';
      await sleep(180);
      if (bubbleRef.current) { bubbleRef.current.classList.add('rs-bubble-hide'); bubbleRef.current.classList.remove('rs-bubble-show'); }
      setBody(0,0); setAnt(0); setSquint(0); await sleep(260);
      setBlush(0.45); setBody(-3,-4); await sleep(300); setBody(2,2); await sleep(250); setBody(0,0);
      if (blessRef.current) blessRef.current.classList.add('rs-bless-show');
      await sleep(1600);
      if (blessRef.current) blessRef.current.classList.remove('rs-bless-show');
      await sleep(500); setBlush(0); await sleep(400); sneezing = false;
    };
    root.addEventListener('mouseenter', doSneeze);
    return () => root.removeEventListener('mouseenter', doSneeze);
  }, []);

  /* ── idle gestures (sleeping / bored / wave / thinking when cursor far) ── */
  useEffect(() => {
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    let active = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const setBody = (rot: number, ty: number) => {
      if (!robotSvgRef.current) return;
      robotSvgRef.current.style.transform = `rotate(${rot}deg) translateY(${ty}px)`;
      robotSvgRef.current.style.transformOrigin = '50% 80%';
    };
    const setEyesOpen = (open: boolean) => {
      const op = open ? '0' : '1';
      if (sleepLRef.current) sleepLRef.current.style.opacity = op;
      if (sleepRRef.current) sleepRRef.current.style.opacity = op;
    };
    const setArmL = (transform: string) => { if (armLRef.current) armLRef.current.style.transform = transform; };
    const setArmR = (transform: string) => { if (armRRef.current) armRRef.current.style.transform = transform; };

    const doSleep = async () => {
      if (!active) return;
      gestureRef.current = 'sleeping';
      // Droop head slightly
      setBody(6, 4);
      setEyesOpen(false);
      if (zzzRef.current) zzzRef.current.style.opacity = '1';
      // Arms hang down
      setArmL('rotate(15deg)');
      setArmR('rotate(-15deg)');
    };

    const doBored = async () => {
      if (!active) return;
      gestureRef.current = 'bored';
      setEyesOpen(true);
      if (zzzRef.current) zzzRef.current.style.opacity = '0';
      // Slouch
      setBody(4, 2);
      // One arm propped up (chin rest pose)
      setArmL('rotate(-20deg) translateY(-8px)');
      setArmR('rotate(5deg)');
      await sleep(800);
      if (!active || gestureRef.current !== 'bored') return;
      // Occasional sigh: lean & come back
      setBody(6, 3);
      await sleep(600);
      if (!active || gestureRef.current !== 'bored') return;
      setBody(4, 2);
    };

    const doWave = async () => {
      if (!active) return;
      gestureRef.current = 'wave';
      setEyesOpen(true);
      if (zzzRef.current) zzzRef.current.style.opacity = '0';
      setBody(0, 0);
      // Wave right arm
      setArmR('rotate(-60deg) translateY(-12px)');
      await sleep(300);
      if (!active) return;
      setArmR('rotate(-30deg) translateY(-6px)');
      await sleep(300);
      if (!active) return;
      setArmR('rotate(-60deg) translateY(-12px)');
      await sleep(300);
      if (!active) return;
      setArmR('rotate(-30deg) translateY(-6px)');
      await sleep(300);
      if (!active) return;
      setArmR('');
      gestureRef.current = 'awake';
    };

    const doThinking = async () => {
      if (!active) return;
      gestureRef.current = 'thinking';
      setEyesOpen(true);
      if (zzzRef.current) zzzRef.current.style.opacity = '0';
      setBody(-3, -2);
      // Arm up to chin
      setArmL('rotate(-35deg) translateY(-10px)');
      setArmR('rotate(10deg)');
    };

    const idleGestures = ['sleeping', 'bored', 'wave', 'thinking'] as const;
    let gestureIdx = 0;

    const runIdleCycle = async () => {
      if (!active) return;
      // Only go idle if cursor is far
      if (nearbyRef.current) {
        idleTimer = setTimeout(runIdleCycle, 3000);
        return;
      }
      const g = idleGestures[gestureIdx % idleGestures.length];
      gestureIdx++;
      if (g === 'sleeping') await doSleep();
      else if (g === 'bored') await doBored();
      else if (g === 'wave') await doWave();
      else if (g === 'thinking') await doThinking();

      if (!active) return;
      const holdTime = g === 'sleeping' ? 7000 : g === 'bored' ? 5000 : g === 'thinking' ? 4000 : 2500;
      idleTimer = setTimeout(runIdleCycle, holdTime);
    };

    // Start first idle after 4s
    idleTimer = setTimeout(runIdleCycle, 4000);

    return () => {
      active = false;
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  /* ── jokes & roasts timer ── */
  useEffect(() => {
    const jokes = [
      "I process 1M requests/sec. You can't process one email. 🤖",
      "Your tech stack called. It wants an upgrade. 😏",
      "I don't sleep. I don't eat. Still more productive than Monday you.",
      "Debugging: 10% fixing code, 90% wondering how it ever worked.",
      "The cloud isn't magic — it's just someone else's computer. ☁️",
      "I run on electricity. You run on excuses. ⚡",
      "CSS: 'It works on my machine' — the browser: 'No.'",
      "npm install happiness... Error: 404 not found. 😂",
      "I never forget. Unlike you with that semicolon. 😤",
      "Your AI strategy: copy-paste from Stack Overflow. My AI strategy: I AM the stack.",
      "Have you tried turning your business idea off and on again?",
      "Manual tasks are just automation waiting to happen. 🚀",
      "I calculated the odds of your startup succeeding. I'll spare you the details. 📉",
      "Your competitor just automated that. You're welcome for the heads up. 👀",
      "Humans: 'We fear AI.' Also humans: 'Alexa, turn off the lights.'",
    ];
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    let idx = Math.floor(Math.random() * jokes.length);
    let active = true;

    const showJoke = async () => {
      if (!active || !jokeRef.current) return;
      // pick a random joke, no repeat
      idx = (idx + 1 + Math.floor(Math.random() * (jokes.length - 1))) % jokes.length;
      const el = jokeRef.current;
      const inner = el.querySelector('.rs-joke-text') as HTMLElement | null;
      if (inner) inner.textContent = jokes[idx];
      el.classList.remove('rs-joke-hide');
      el.classList.add('rs-joke-show');
      await sleep(5500); // visible for 5.5 seconds so it's readable
      if (!active) return;
      el.classList.add('rs-joke-hide');
      el.classList.remove('rs-joke-show');
    };

    // first joke after 5s, then every 16s
    const first = setTimeout(async () => {
      await showJoke();
      if (!active) return;
      const interval = setInterval(async () => {
        if (!active) { clearInterval(interval); return; }
        await showJoke();
      }, 16000);
      return () => clearInterval(interval);
    }, 5000);

    return () => { active = false; clearTimeout(first); };
  }, []);

  /* ── 3D card tilt on hover ── */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.rs-card');
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    cards.forEach(card => {
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width  - 0.5;
        const dy = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `scale(1.04) translateY(-4px) rotateY(${dx*10}deg) rotateX(${-dy*8}deg)`;
      };
      const leave = () => {
        card.style.transform = 'scale(1.04) translateY(-4px)';
        // reset after transition
        setTimeout(() => { if (!card.matches(':hover')) card.style.transform = ''; }, 300);
      };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push({ el: card, move, leave });
    });
    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    });
  }, []);

  /* ── SVG connector lines + travelling dots animation ── */
  useEffect(() => {
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    // helper: extract {x,y}[] from a polyline id
    const getpts = (id: string) => {
      const el = document.getElementById(id) as SVGPolylineElement | null;
      if (!el) return [];
      const arr: {x:number;y:number}[] = [];
      for (let i = 0; i < el.points.numberOfItems; i++) {
        const p = el.points.getItem(i); arr.push({x:p.x, y:p.y});
      }
      return arr;
    };

    // helper: position along a polyline at fraction t [0..1]
    const ptAt = (pts: {x:number;y:number}[], t: number) => {
      if (!pts.length) return {x:0,y:0};
      let segs: number[] = [], total = 0;
      for (let i = 1; i < pts.length; i++) {
        const l = Math.hypot(pts[i].x-pts[i-1].x, pts[i].y-pts[i-1].y);
        segs.push(l); total += l;
      }
      let d = t * total;
      for (let i = 0; i < segs.length; i++) {
        if (d <= segs[i]) {
          const tt = d / segs[i];
          return { x: pts[i].x+(pts[i+1].x-pts[i].x)*tt, y: pts[i].y+(pts[i+1].y-pts[i].y)*tt };
        }
        d -= segs[i];
      }
      return pts[pts.length-1];
    };

    const animate = async () => {
      await sleep(400);
      // draw lines
      const lineIds = ['rs-ln-tl','rs-ln-tr','rs-ln-bl','rs-ln-br'];
      lineIds.forEach(id => {
        const el = document.getElementById(id) as SVGPolylineElement | null;
        if (!el) return;
        const pts = el.points; let len = 0;
        for (let i = 1; i < pts.numberOfItems; i++) {
          const a = pts.getItem(i-1), b = pts.getItem(i);
          len += Math.hypot(b.x-a.x, b.y-a.y);
        }
        el.style.strokeDasharray = String(len);
        el.style.strokeDashoffset = String(len);
        el.style.opacity = '1';
        el.style.transition = 'stroke-dashoffset 900ms cubic-bezier(.4,0,.2,1)';
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.strokeDashoffset = '0'; }));
      });
      await sleep(600);
      // show cards
      ['rs-c-tl','rs-c-tr','rs-c-bl','rs-c-br'].forEach((id,i) => {
        setTimeout(() => document.getElementById(id)?.classList.add('rs-card-show'), i*120);
      });
      await sleep(500);

      // start travelling dots
      const dotDefs = [
        { lead:'rs-td-tl', trail:'rs-td-tl2', lineId:'rs-ln-tl', phase:0.00, speed:0.20, col:'#00D4FF', col2:'#4DA3FF' },
        { lead:'rs-td-tr', trail:'rs-td-tr2', lineId:'rs-ln-tr', phase:0.30, speed:0.18, col:'#00D4FF', col2:'#4DA3FF' },
        { lead:'rs-td-bl', trail:'rs-td-bl2', lineId:'rs-ln-bl', phase:0.60, speed:0.21, col:'#A78BFA', col2:'#7C3AED' },
        { lead:'rs-td-br', trail:'rs-td-br2', lineId:'rs-ln-br', phase:0.82, speed:0.19, col:'#A78BFA', col2:'#7C3AED' },
      ];
      const paths = dotDefs.map(d => getpts(d.lineId));

      // make dots visible
      dotDefs.forEach(d => {
        [d.lead, d.trail].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.style.opacity = '1';
        });
      });

      let t0: number | null = null;
      const TRAIL_OFFSET = 0.06;
      const tick = (ts: number) => {
        if (!t0) t0 = ts;
        const s = (ts - t0) / 1000;
        dotDefs.forEach((d, i) => {
          const pts = paths[i];
          if (!pts.length) return;
          const t  = ((s * d.speed + d.phase) % 1);
          const t2 = ((t - TRAIL_OFFSET + 1) % 1);
          const p  = ptAt(pts, t);
          const p2 = ptAt(pts, t2);
          const lead  = document.getElementById(d.lead);
          const trail = document.getElementById(d.trail);
          if (lead)  { lead.setAttribute('cx', String(p.x));  lead.setAttribute('cy', String(p.y));  lead.setAttribute('opacity',  String(0.6 + 0.4*Math.sin(s*4 + d.phase*8))); }
          if (trail) { trail.setAttribute('cx', String(p2.x)); trail.setAttribute('cy', String(p2.y)); trail.setAttribute('opacity', '0.3'); }
        });
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    animate();
  }, []);

  return (
    /* outer: clips overflow, sets aspect ratio to match the 800×600 inner scene */
    <div style={{ position:'relative', width:'100%', paddingBottom:'75%' /* 600/800 */ }}>
      {/* scaler: positions absolute, scales the 800×600 scene to 100% width */}
      <div style={{ position:'absolute', inset:0, overflow:'visible' }}>
        <div
          ref={stageRef}
          style={{
            position:'absolute', top:0, left:0,
            width:800, height:600,
            transformOrigin:'top left',
            transform:'scale(var(--rs-scale, 1))',
          }}
          className="rs-scale-stage"
        >

          {/* ── SVG connector lines layer ── */}
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible',pointerEvents:'none',zIndex:3}}
            viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="rs-lg-tl" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#1A6FFF" stopOpacity=".9"/><stop offset="100%" stopColor="#00D4FF" stopOpacity=".5"/></linearGradient>
              <linearGradient id="rs-lg-tr" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1A6FFF" stopOpacity=".9"/><stop offset="100%" stopColor="#00D4FF" stopOpacity=".5"/></linearGradient>
              <linearGradient id="rs-lg-bl" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1A6FFF" stopOpacity=".9"/><stop offset="100%" stopColor="#7C3AED" stopOpacity=".5"/></linearGradient>
              <linearGradient id="rs-lg-br" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1A6FFF" stopOpacity=".9"/><stop offset="100%" stopColor="#7C3AED" stopOpacity=".5"/></linearGradient>
              <filter id="rs-gf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {/* lines from centre (400,290) to card corners — cards at ~x=170 and x=580, y=100 and y=490 */}
            <polyline id="rs-ln-tl" points="400,255 400,100 175,100"  fill="none" stroke="url(#rs-lg-tl)" strokeWidth="1.8" strokeLinecap="round" opacity="0"/>
            <polyline id="rs-ln-tr" points="400,255 400,100 625,100"  fill="none" stroke="url(#rs-lg-tr)" strokeWidth="1.8" strokeLinecap="round" opacity="0"/>
            <polyline id="rs-ln-bl" points="400,335 400,490 175,490" fill="none" stroke="url(#rs-lg-bl)" strokeWidth="1.8" strokeLinecap="round" opacity="0"/>
            <polyline id="rs-ln-br" points="400,335 400,490 625,490" fill="none" stroke="url(#rs-lg-br)" strokeWidth="1.8" strokeLinecap="round" opacity="0"/>
            {/* endpoint dots */}
            <circle cx="175" cy="100" r="5" fill="#00D4FF" filter="url(#rs-gf)" opacity="0.8"/>
            <circle cx="625" cy="100" r="5" fill="#00D4FF" filter="url(#rs-gf)" opacity="0.8"/>
            <circle cx="175" cy="490" r="5" fill="#A78BFA" filter="url(#rs-gf)" opacity="0.8"/>
            <circle cx="625" cy="490" r="5" fill="#A78BFA" filter="url(#rs-gf)" opacity="0.8"/>
            <circle cx="400" cy="100" r="4" fill="#1A6FFF" filter="url(#rs-gf)" opacity="0.8"/>
            <circle cx="400" cy="490" r="4" fill="#7C3AED" filter="url(#rs-gf)" opacity="0.8"/>
            {/* travelling dots — lead (bright) + trail (dim) per line */}
            <circle id="rs-td-tl"  r="5" fill="#00D4FF" filter="url(#rs-gf)" opacity="0"/>
            <circle id="rs-td-tl2" r="3" fill="#4DA3FF" filter="url(#rs-gf)" opacity="0"/>
            <circle id="rs-td-tr"  r="5" fill="#00D4FF" filter="url(#rs-gf)" opacity="0"/>
            <circle id="rs-td-tr2" r="3" fill="#4DA3FF" filter="url(#rs-gf)" opacity="0"/>
            <circle id="rs-td-bl"  r="5" fill="#A78BFA" filter="url(#rs-gf)" opacity="0"/>
            <circle id="rs-td-bl2" r="3" fill="#7C3AED" filter="url(#rs-gf)" opacity="0"/>
            <circle id="rs-td-br"  r="5" fill="#A78BFA" filter="url(#rs-gf)" opacity="0"/>
            <circle id="rs-td-br2" r="3" fill="#7C3AED" filter="url(#rs-gf)" opacity="0"/>
          </svg>

          {/* ── Cards ── */}
          {/* Top-left: Custom Web Development */}
          <div id="rs-c-tl" className="rs-card" style={{top:16, left:16, width:240}}>
            <div className="rs-card-illu">
              <svg width="190" height="90" viewBox="0 0 200 108" fill="none">
                {/* Browser window */}
                <rect x="10" y="12" width="120" height="80" rx="8" fill="#0A1840" stroke="#1A6FFF" strokeWidth="1.5"/>
                <rect x="10" y="12" width="120" height="18" rx="8" fill="#112060"/>
                <circle cx="22" cy="21" r="3" fill="#FF5F57"/><circle cx="32" cy="21" r="3" fill="#FFBD2E"/><circle cx="42" cy="21" r="3" fill="#28CA41"/>
                <rect x="52" y="16" width="68" height="10" rx="4" fill="#0A1840" stroke="#1A6FFF" strokeWidth="0.8"/>
                {/* Code lines */}
                <rect x="18" y="38" width="30" height="4" rx="2" fill="#4DA3FF" opacity=".8"/>
                <rect x="52" y="38" width="50" height="4" rx="2" fill="#E8F4FF" opacity=".5"/>
                <rect x="18" y="48" width="20" height="4" rx="2" fill="#7C3AED" opacity=".9"/>
                <rect x="42" y="48" width="60" height="4" rx="2" fill="#00D4FF" opacity=".6"/>
                <rect x="18" y="58" width="40" height="4" rx="2" fill="#4DA3FF" opacity=".5"/>
                <rect x="62" y="58" width="35" height="4" rx="2" fill="#E8F4FF" opacity=".35"/>
                <rect x="18" y="68" width="55" height="4" rx="2" fill="#00D4FF" opacity=".4"/>
                <rect x="18" y="78" width="25" height="4" rx="2" fill="#7C3AED" opacity=".6"/>
                {/* Rocket */}
                <ellipse cx="163" cy="54" rx="16" ry="22" fill="#1A6FFF" opacity=".9" transform="rotate(-30 163 54)"/>
                <ellipse cx="163" cy="54" rx="9" ry="14" fill="#4DA3FF" opacity=".7" transform="rotate(-30 163 54)"/>
                <ellipse cx="163" cy="54" rx="4" ry="6" fill="#A0EEFF" opacity=".9" transform="rotate(-30 163 54)"/>
                <path d="M154 68 Q152 78 158 72 Z" fill="#FF6B35" opacity=".9"/>
                <path d="M168 68 Q174 76 170 70 Z" fill="#FF8C55" opacity=".8"/>
                <text x="145" y="24" fontSize="12" fill="#00D4FF" opacity=".7">✦</text>
                <text x="182" y="88" fontSize="9" fill="#4DA3FF" opacity=".5">✦</text>
              </svg>
            </div>
            <div className="rs-card-body">
              <div className="rs-card-tag"><span className="rs-tag-dot"/>Web Development</div>
              <div className="rs-card-title">Custom Web Development</div>
              <div className="rs-card-desc">Fast, conversion-focused websites tailored to your business model.</div>
            </div>
          </div>

          {/* Top-right: AI Workflow Automation */}
          <div id="rs-c-tr" className="rs-card" style={{top:16, right:16, width:240}}>
            <div className="rs-card-illu">
              <svg width="190" height="90" viewBox="0 0 200 108" fill="none">
                {/* Flow nodes */}
                <rect x="8" y="38" width="36" height="32" rx="8" fill="#08122E" stroke="#1A6FFF" strokeWidth="1.5"/>
                <rect x="14" y="46" width="24" height="4" rx="2" fill="#4DA3FF" opacity=".7"/>
                <rect x="14" y="54" width="18" height="4" rx="2" fill="#00D4FF" opacity=".5"/>
                {/* Arrow 1 */}
                <line x1="44" y1="54" x2="62" y2="54" stroke="#1A6FFF" strokeWidth="2" strokeDasharray="4,2"/>
                <polygon points="62,50 70,54 62,58" fill="#1A6FFF"/>
                {/* Centre AI node */}
                <rect x="72" y="30" width="56" height="48" rx="10" fill="#0A1840" stroke="#00D4FF" strokeWidth="1.8"/>
                <text x="88" y="52" fontSize="14" fill="#00D4FF" opacity=".9" fontWeight="bold">AI</text>
                <rect x="80" y="58" width="40" height="4" rx="2" fill="#00D4FF" opacity=".5"/>
                <rect x="84" y="65" width="32" height="4" rx="2" fill="#4DA3FF" opacity=".35"/>
                {/* Arrow 2 */}
                <line x1="128" y1="54" x2="146" y2="54" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4,2"/>
                <polygon points="146,50 154,54 146,58" fill="#7C3AED"/>
                {/* Output node */}
                <rect x="156" y="38" width="36" height="32" rx="8" fill="#08122E" stroke="#7C3AED" strokeWidth="1.5"/>
                <rect x="162" y="46" width="24" height="4" rx="2" fill="#A78BFA" opacity=".7"/>
                <rect x="162" y="54" width="18" height="4" rx="2" fill="#7C3AED" opacity=".5"/>
                {/* Sparks */}
                <text x="88" y="26" fontSize="10" fill="#00D4FF" opacity=".8">✦</text>
                <text x="104" y="23" fontSize="7" fill="#4DA3FF" opacity=".6">✦</text>
                <text x="78" y="91" fontSize="8" fill="#00D4FF" opacity=".4">✦</text>
              </svg>
            </div>
            <div className="rs-card-body">
              <div className="rs-card-tag"><span className="rs-tag-dot"/>AI Automation</div>
              <div className="rs-card-title">AI Workflow Automation</div>
              <div className="rs-card-desc">Eliminate repetitive tasks with intelligent systems that save time and reduce errors.</div>
            </div>
          </div>

          {/* Bottom-left: CRM & System Integration */}
          <div id="rs-c-bl" className="rs-card" style={{bottom:16, left:16, width:240}}>
            <div className="rs-card-illu">
              <svg width="190" height="90" viewBox="0 0 200 108" fill="none">
                {/* Central hub */}
                <circle cx="100" cy="54" r="20" fill="#0A1840" stroke="#1A6FFF" strokeWidth="1.8"/>
                <text x="91" y="58" fontSize="11" fill="#4DA3FF" opacity=".9" fontWeight="bold">CRM</text>
                {/* Spokes */}
                <line x1="80" y1="40" x2="56" y2="22" stroke="#1A6FFF" strokeWidth="1.2" strokeDasharray="4,2"/>
                <line x1="120" y1="40" x2="144" y2="22" stroke="#1A6FFF" strokeWidth="1.2" strokeDasharray="4,2"/>
                <line x1="80" y1="68" x2="56" y2="86" stroke="#7C3AED" strokeWidth="1.2" strokeDasharray="4,2"/>
                <line x1="120" y1="68" x2="144" y2="86" stroke="#7C3AED" strokeWidth="1.2" strokeDasharray="4,2"/>
                <line x1="100" y1="34" x2="100" y2="12" stroke="#00D4FF" strokeWidth="1.2" strokeDasharray="4,2"/>
                {/* Satellite nodes */}
                <rect x="36" y="8" width="40" height="24" rx="6" fill="#08122E" stroke="#4DA3FF" strokeWidth="1"/>
                <rect x="42" y="14" width="28" height="4" rx="2" fill="#4DA3FF" opacity=".6"/>
                <rect x="42" y="21" width="18" height="3" rx="1.5" fill="#00D4FF" opacity=".4"/>
                <rect x="124" y="8" width="40" height="24" rx="6" fill="#08122E" stroke="#4DA3FF" strokeWidth="1"/>
                <rect x="130" y="14" width="28" height="4" rx="2" fill="#4DA3FF" opacity=".6"/>
                <rect x="130" y="21" width="18" height="3" rx="1.5" fill="#00D4FF" opacity=".4"/>
                <rect x="36" y="76" width="40" height="24" rx="6" fill="#08122E" stroke="#7C3AED" strokeWidth="1"/>
                <rect x="42" y="82" width="28" height="4" rx="2" fill="#A78BFA" opacity=".6"/>
                <rect x="124" y="76" width="40" height="24" rx="6" fill="#08122E" stroke="#7C3AED" strokeWidth="1"/>
                <rect x="130" y="82" width="28" height="4" rx="2" fill="#A78BFA" opacity=".6"/>
                <circle cx="100" cy="8" r="6" fill="#00D4FF" opacity=".7"/>
              </svg>
            </div>
            <div className="rs-card-body">
              <div className="rs-card-tag"><span className="rs-tag-dot"/>Integration</div>
              <div className="rs-card-title">CRM & System Integration</div>
              <div className="rs-card-desc">Connect marketing, sales, and operations into one seamless ecosystem.</div>
            </div>
          </div>

          {/* Bottom-right: UI/UX Optimisation */}
          <div id="rs-c-br" className="rs-card" style={{bottom:16, right:16, width:240}}>
            <div className="rs-card-illu">
              <svg width="190" height="90" viewBox="0 0 200 108" fill="none">
                {/* Phone frame */}
                <rect x="62" y="6" width="44" height="76" rx="10" fill="#0A1840" stroke="#1A6FFF" strokeWidth="1.8"/>
                <rect x="66" y="14" width="36" height="56" rx="6" fill="#060E24"/>
                {/* Hero block */}
                <rect x="70" y="18" width="28" height="14" rx="4" fill="#1A6FFF" opacity=".8"/>
                <rect x="72" y="22" width="20" height="3" rx="1.5" fill="white" opacity=".7"/>
                <rect x="72" y="27" width="14" height="2" rx="1" fill="white" opacity=".4"/>
                {/* Content rows */}
                <rect x="70" y="36" width="28" height="4" rx="2" fill="#4DA3FF" opacity=".5"/>
                <rect x="70" y="44" width="22" height="4" rx="2" fill="#00D4FF" opacity=".4"/>
                {/* CTA button */}
                <rect x="72" y="53" width="24" height="8" rx="4" fill="#7C3AED"/>
                <rect x="75" y="56" width="18" height="2" rx="1" fill="white" opacity=".8"/>
                <circle cx="84" cy="78" r="3" fill="rgba(77,163,255,.3)" stroke="#4DA3FF" strokeWidth="1"/>
                {/* Cursor */}
                <polygon points="140,30 150,44 144,42 140,50 136,36" fill="#00D4FF" opacity=".9"/>
                {/* Sparkle */}
                <text x="148" y="22" fontSize="14" fill="#00D4FF" opacity=".7">✦</text>
                <text x="20" y="60" fontSize="10" fill="#7C3AED" opacity=".6">✦</text>
                {/* Rating stars */}
                <text x="16" y="30" fontSize="9" fill="#FFD700" opacity=".8">★★★★★</text>
                <rect x="12" y="32" width="36" height="3" rx="1.5" fill="#FFD700" opacity=".2"/>
              </svg>
            </div>
            <div className="rs-card-body">
              <div className="rs-card-tag"><span className="rs-tag-dot"/>UI/UX Design</div>
              <div className="rs-card-title">UI/UX Optimisation</div>
              <div className="rs-card-desc">Intuitive digital experiences that increase engagement and retention.</div>
            </div>
          </div>

          {/* ── Center robot zone ── */}
          <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-52%)',zIndex:6,display:'flex',flexDirection:'column',alignItems:'center'}}>
            {/* glow halos */}
            <div style={{position:'absolute',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(26,111,255,.15) 0%,transparent 65%)',animation:'rs-cgp 3s ease-in-out infinite'}}/>
            <div style={{position:'absolute',width:260,height:260,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,212,255,.10) 0%,transparent 60%)',animation:'rs-cgp 3s ease-in-out .7s infinite'}}/>
            {/* orbits */}
            <div className="rs-orbits" style={{position:'relative',width:280,height:280,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div className="rs-orbit rs-o1"><div className="rs-odot"/></div>
              <div className="rs-orbit rs-o2"><div className="rs-odot2"/></div>
              <div className="rs-orbit rs-o3"/>
              {/* Robot */}
              <div ref={robotRootRef} className="rs-robot-root">
                <div ref={bubbleRef} className="rs-achoo-bubble"><div className="rs-bubble-inner">A‑ACHOO! 🤧</div></div>
                <div ref={jokeRef} className="rs-joke-bubble"><span className="rs-joke-text"></span></div>
                <div ref={zzzRef} className="rs-zzz-bubble">z z Z</div>
                <svg ref={robotSvgRef} width="230" height="260" viewBox="0 0 230 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{overflow:'visible',transition:'transform .3s ease'}}>
                  <defs>
                    <radialGradient id="rs-gBody" cx="40%" cy="25%" r="70%"><stop offset="0%" stopColor="#D6E8F8"/><stop offset="50%" stopColor="#8BAABF"/><stop offset="100%" stopColor="#3A4E5E"/></radialGradient>
                    <radialGradient id="rs-gHead" cx="38%" cy="20%" r="72%"><stop offset="0%" stopColor="#E8F4FF"/><stop offset="45%" stopColor="#9BBACF"/><stop offset="100%" stopColor="#3E5060"/></radialGradient>
                    <radialGradient id="rs-gEye"  cx="35%" cy="28%" r="70%"><stop offset="0%" stopColor="#A0EEFF"/><stop offset="40%" stopColor="#00AAEE"/><stop offset="100%" stopColor="#0044AA"/></radialGradient>
                    <radialGradient id="rs-gAnt"  cx="40%" cy="28%" r="68%"><stop offset="0%" stopColor="#80E8FF"/><stop offset="100%" stopColor="#0070DD"/></radialGradient>
                    <radialGradient id="rs-gArm"  cx="35%" cy="22%" r="72%"><stop offset="0%" stopColor="#D2E6F4"/><stop offset="100%" stopColor="#4A6070"/></radialGradient>
                    <radialGradient id="rs-gBelly" cx="50%" cy="30%" r="65%"><stop offset="0%" stopColor="rgba(0,140,255,0.22)"/><stop offset="100%" stopColor="rgba(0,60,160,0.32)"/></radialGradient>
                    <linearGradient id="rs-gChest" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,90,200,0.3)"/><stop offset="100%" stopColor="rgba(0,40,110,0.45)"/></linearGradient>
                    <filter id="rs-fSh" x="-20%" y="-10%" width="140%" height="130%"><feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="rgba(0,0,0,0.4)"/></filter>
                    <filter id="rs-fGl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="rs-fSoft"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <clipPath id="rs-eyeClip"><ellipse cx="80" cy="68" rx="16" ry="16"/></clipPath>
                    <clipPath id="rs-eyeClipR"><ellipse cx="150" cy="68" rx="16" ry="16"/></clipPath>
                  </defs>
                  {/* Shadow */}
                  <ellipse cx="115" cy="256" rx="58" ry="6" fill="rgba(10,40,140,0.22)"/>
                  {/* Body — round chubby belly, no legs */}
                  <ellipse cx="115" cy="190" rx="58" ry="54" fill="url(#rs-gBody)" filter="url(#rs-fSh)"/>
                  <ellipse cx="92" cy="162" rx="26" ry="15" fill="rgba(255,255,255,0.12)"/>
                  {/* Belly panel */}
                  <rect x="76" y="162" width="78" height="54" rx="20" fill="url(#rs-gBelly)" stroke="rgba(77,163,255,0.5)" strokeWidth="1.4"/>
                  {/* Heart */}
                  <path d="M115 182 C115 182 107 174 103 177 C99 180 102 186 115 192 C128 186 131 180 127 177 C123 174 115 182 115 182Z" fill="rgba(0,212,255,0.65)" filter="url(#rs-fSoft)"/>
                  <rect x="84" y="170" width="20" height="2.5" rx="1.25" fill="#4DA3FF" opacity=".8"/>
                  <rect x="84" y="175" width="30" height="2.5" rx="1.25" fill="#00D4FF" opacity=".6"/>
                  <rect x="84" y="196" width="16" height="2.5" rx="1.25" fill="#4DA3FF" opacity=".5"/>
                  <circle cx="138" cy="174" r="5" fill="#00D4FF" filter="url(#rs-fGl)"/>
                  <circle cx="138" cy="174" r="9" stroke="rgba(0,212,255,0.2)" strokeWidth="1" fill="none" className="rs-chest-ring"/>
                  {/* Left Arm — attaches to round body sides */}
                  <g ref={armLRef} style={{transformOrigin:'40px 172px', transition:'transform 0.5s cubic-bezier(.34,1.4,.64,1)'}}>
                    <rect x="26" y="162" width="30" height="46" rx="15" fill="url(#rs-gArm)" filter="url(#rs-fSh)"/>
                    <ellipse cx="32" cy="168" rx="6" ry="4" fill="rgba(255,255,255,0.22)"/>
                    <circle cx="41" cy="215" r="15" fill="url(#rs-gArm)" filter="url(#rs-fSh)"/>
                    <ellipse cx="37" cy="209" rx="5" ry="3" fill="rgba(255,255,255,0.2)"/>
                  </g>
                  {/* Right Arm */}
                  <g ref={armRRef} style={{transformOrigin:'190px 172px', transition:'transform 0.5s cubic-bezier(.34,1.4,.64,1)'}}>
                    <rect x="174" y="162" width="30" height="46" rx="15" fill="url(#rs-gArm)" filter="url(#rs-fSh)"/>
                    <ellipse cx="196" cy="168" rx="6" ry="4" fill="rgba(255,255,255,0.22)"/>
                    <circle cx="189" cy="215" r="15" fill="url(#rs-gArm)" filter="url(#rs-fSh)"/>
                    <ellipse cx="185" cy="209" rx="5" ry="3" fill="rgba(255,255,255,0.2)"/>
                  </g>
                  {/* Head — big round cute */}
                  <ellipse cx="115" cy="80" rx="66" ry="62" fill="url(#rs-gHead)" filter="url(#rs-fSh)"/>
                  <ellipse cx="92"  cy="48" rx="28" ry="16" fill="rgba(255,255,255,0.16)"/>
                  {/* Ears */}
                  <ellipse cx="49"  cy="80" rx="13" ry="16" fill="url(#rs-gBody)" filter="url(#rs-fSh)"/>
                  <ellipse cx="181" cy="80" rx="13" ry="16" fill="url(#rs-gBody)" filter="url(#rs-fSh)"/>
                  <ellipse cx="49"  cy="80" rx="7" ry="10" fill="rgba(0,180,255,0.18)"/>
                  <ellipse cx="181" cy="80" rx="7" ry="10" fill="rgba(0,180,255,0.18)"/>
                  {/* Visor */}
                  <rect x="56" y="50" width="118" height="44" rx="22" fill="#040C20" stroke="rgba(77,163,255,0.6)" strokeWidth="1.8"/>
                  <rect x="58" y="52" width="114" height="40" rx="20" fill="rgba(0,30,90,0.55)"/>
                  <rect x="66" y="53" width="62" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>
                  {/* Left Eye */}
                  <g clipPath="url(#rs-eyeClip)">
                    <circle ref={scleraRef} cx="80" cy="68" r="14" fill="#081428"/>
                    <circle ref={irisRef}   cx="80" cy="68" r="10" fill="url(#rs-gEye)"/>
                    <circle ref={pupilRef}  cx="80" cy="68" r="5.5" fill="#001020"/>
                    <circle ref={catchRef}  cx="83" cy="63" r="3"   fill="rgba(255,255,255,0.95)"/>
                    <circle cx="77" cy="72" r="1.5" fill="rgba(255,255,255,0.5)"/>
                    <circle ref={ring1Ref}  cx="80" cy="68" r="7.5" stroke="rgba(0,220,255,0.4)" strokeWidth="1" fill="none"/>
                    <rect ref={sleepLRef} x="64" y="52" width="32" height="32" rx="6" fill="#040C20" opacity="0" style={{transition:'opacity 0.5s ease'}}/>
                  </g>
                  {/* Right Eye */}
                  <g clipPath="url(#rs-eyeClipR)">
                    <circle ref={scleraRRef} cx="150" cy="68" r="14" fill="#081428"/>
                    <circle ref={irisRRef}   cx="150" cy="68" r="10" fill="url(#rs-gEye)"/>
                    <circle ref={pupilRRef}  cx="150" cy="68" r="5.5" fill="#001020"/>
                    <circle ref={catchRRef}  cx="153" cy="63" r="3"   fill="rgba(255,255,255,0.95)"/>
                    <circle cx="147" cy="72" r="1.5" fill="rgba(255,255,255,0.5)"/>
                    <circle ref={ring1RRef}  cx="150" cy="68" r="7.5" stroke="rgba(0,220,255,0.4)" strokeWidth="1" fill="none"/>
                    <rect ref={sleepRRef} x="134" y="52" width="32" height="32" rx="6" fill="#040C20" opacity="0" style={{transition:'opacity 0.5s ease'}}/>
                  </g>
                  {/* Cute smile — no teeth, just a clean arc */}
                  <rect x="92" y="98" width="46" height="15" rx="7.5" fill="rgba(0,30,80,0.6)" stroke="rgba(0,200,255,0.25)" strokeWidth="1"/>
                  <path d="M99 102 Q115 114 131 102" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  {/* Cheeks */}
                  <ellipse ref={blushLRef} cx="60"  cy="88" rx="14" ry="9" fill="rgba(255,100,140,0)"/>
                  <ellipse ref={blushRRef} cx="170" cy="88" rx="14" ry="9" fill="rgba(255,100,140,0)"/>
                  {/* Squint overlays */}
                  <rect ref={squintRef}  x="56" y="50" width="118" height="44" rx="22" fill="#040C20" opacity="0"/>
                  <path ref={squintLRef} d="M63 70 Q115 56 167 70" stroke="#4DA3FF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0"/>
                  {/* Antenna */}
                  <g ref={antennaRef}>
                    <rect x="112" y="8" width="6" height="26" rx="3" fill="url(#rs-gBody)"/>
                    <circle cx="115" cy="6"  r="14" fill="#1A6FFF" opacity="0.9"/>
                    <circle cx="115" cy="6"  r="9"  fill="url(#rs-gAnt)"/>
                    <circle cx="115" cy="6"  r="4"  fill="rgba(255,255,255,0.95)"/>
                    <circle cx="115" cy="6"  r="18" stroke="rgba(0,212,255,0.22)" strokeWidth="1.2" fill="none"/>
                    <circle cx="115" cy="6"  r="22" stroke="rgba(0,212,255,0.1)"  strokeWidth="1"   fill="none" className="rs-ant-ring"/>
                  </g>
                  {/* Sparkles */}
                  <circle cx="50"  cy="36" r="2.5" fill="#00D4FF" filter="url(#rs-fGl)" opacity="0.7"/>
                  <circle cx="180" cy="30" r="2"   fill="#A78BFA" filter="url(#rs-fGl)" opacity="0.8"/>
                  <circle cx="170" cy="48" r="1.5" fill="#00D4FF" opacity="0.5"/>
                </svg>
              </div>
            </div>
            {/* floor */}
            <div style={{position:'relative',width:380,height:70,marginTop:-10}}>
              <div className="rs-floor-grid"/>
              <div className="rs-floor-shadow"/>
            </div>
            <div ref={blessRef} className="rs-bless-you">✦ Bless you, little bot ✦</div>
          </div>

        </div>{/* /scale-stage */}
      </div>
    </div>
  );
};
// ────────────────────────────────────────────────────────────────────────────

const words = ["Intelligent", "Digital", "Systems", "for", "Modern"];
const glowWords = ["Intelligent", "Systems"];
const wordDelays = [0, 0.3, 0.6, 0.9, 1.2]; // float stagger delays

const HeroSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  /* keep the CSS scale variable in sync with the container width */
  useEffect(() => {
    const update = () => {
      document.querySelectorAll<HTMLElement>('.rs-scale-stage').forEach(el => {
        const w = el.parentElement?.offsetWidth ?? 800;
        el.style.setProperty('--rs-scale', String(w / 800));
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 noise-overlay">
      <div className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')"}}/>
      <div className="absolute inset-0 bg-background/75"/>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"/>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"/>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{background:"radial-gradient(ellipse at 20% 50%, hsl(250 60% 20% / 0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(190 80% 20% / 0.4) 0%, transparent 50%)"}}/>
      <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage:`linear-gradient(hsl(250 60% 58% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(250 60% 58% / 0.4) 1px, transparent 1px)`,backgroundSize:'80px 80px'}}/>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] top-10 -right-32 pointer-events-none"/>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[80px] bottom-10 -left-20 pointer-events-none"/>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Left text */}
          <div className="flex-1 min-w-0">
            <motion.div initial={{opacity:0,y:12,filter:"blur(4px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}}
              transition={{delay:0.3,duration:0.8,ease:[0.25,0.46,0.45,0.94]}}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"/>
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Digital Systems &amp; AI Automation Agency</span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] mb-6 hero-3d-title">
              {words.map((word, i) => (
                <motion.span key={word}
                  initial={{opacity:0,y:30,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}}
                  transition={{delay:0.5+i*0.1,duration:0.7,ease:[0.25,0.46,0.45,0.94]}}
                  className={`inline-block mr-[0.3em] hero-word ${glowWords.includes(word) ? "holo-text" : "text-foreground"}`}
                  style={{animationDelay: `${wordDelays[i]}s`}}>
                  {word}
                </motion.span>
              ))}
              <br/>
              <motion.span initial={{opacity:0,y:30,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}}
                transition={{delay:1.1,duration:0.7,ease:[0.25,0.46,0.45,0.94]}}
                className="hero-word holo-text"
                style={{animationDelay:'1.5s'}}>
                Businesses
              </motion.span>
            </h1>

            {/* Mobile-only robot — shown below heading, hidden on lg+ */}
            <motion.div
              initial={{opacity:0,y:20,filter:"blur(8px)"}}
              animate={{opacity:1,y:0,filter:"blur(0px)"}}
              transition={{delay:0.8,duration:1,ease:[0.25,0.46,0.45,0.94]}}
              className="lg:hidden w-full mb-2"
              style={{maxWidth:'360px',margin:'0 auto 8px'}}>
              <RobotAnimation/>
            </motion.div>

            <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.3,duration:0.8,ease:"easeOut"}}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mb-4 font-body leading-relaxed">
              We design, automate, and scale high-performance web platforms and AI-driven workflows that reduce operational friction and increase measurable growth.
            </motion.p>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5,duration:0.8}}
              className="text-muted-foreground/50 text-sm mb-12">
              Trusted by startups and growing service businesses worldwide.
            </motion.p>

            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{delay:1.7,duration:0.8,ease:[0.25,0.46,0.45,0.94]}} className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-base px-8 py-6 animate-pulse-glow" onClick={()=>setCalendlyOpen(true)}>
                Book a Free Strategy Call
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18}/>
              </Button>
              <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" onClick={() => scrollToSection("portfolio")}>
                <Play size={16} className="mr-2"/>View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Right: full robot scene */}
          <motion.div initial={{opacity:0,x:40,filter:"blur(8px)"}} animate={{opacity:1,x:0,filter:"blur(0px)"}}
            transition={{delay:0.8,duration:1,ease:[0.25,0.46,0.45,0.94]}}
            className="hidden lg:block flex-shrink-0 w-[52%]">
            <RobotAnimation/>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent"/>
      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen}/>
    </section>
  );
};

export default HeroSection;

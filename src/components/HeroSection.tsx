import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import CalendlyModal from "@/components/CalendlyModal";

// ─── Robot Animation Component ───────────────────────────────────────────────
const RobotAnimation = () => {
  const robotRootRef = useRef<HTMLDivElement>(null);
  const robotSvgRef  = useRef<SVGSVGElement>(null);
  const antennaRef   = useRef<SVGGElement>(null);
  const eyeGroupRef  = useRef<SVGGElement>(null);
  const scleraRef    = useRef<SVGCircleElement>(null);
  const irisRef      = useRef<SVGCircleElement>(null);
  const pupilRef     = useRef<SVGCircleElement>(null);
  const catchRef     = useRef<SVGCircleElement>(null);
  const ring1Ref     = useRef<SVGCircleElement>(null);
  const squintRef    = useRef<SVGRectElement>(null);
  const squintLineRef= useRef<SVGPathElement>(null);
  const blushLRef    = useRef<SVGEllipseElement>(null);
  const blushRRef    = useRef<SVGEllipseElement>(null);
  const bubbleRef    = useRef<HTMLDivElement>(null);
  const blessRef     = useRef<HTMLDivElement>(null);
  const snotRef      = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const EYE_CX = 79, EYE_CY = 58, MAX_TRAVEL = 4.5;
    let targetX = EYE_CX, targetY = EYE_CY;
    let currentX = EYE_CX, currentY = EYE_CY;
    let raf: number;

    function setEyePos(cx: number, cy: number) {
      [scleraRef.current, irisRef.current, pupilRef.current, ring1Ref.current].forEach(el => {
        if (el) { el.setAttribute('cx', String(cx)); el.setAttribute('cy', String(cy)); }
      });
      if (catchRef.current) {
        catchRef.current.setAttribute('cx', String(cx + 2));
        catchRef.current.setAttribute('cy', String(cy - 3));
      }
    }

    function onMouseMove(e: MouseEvent) {
      const root = robotRootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const rx = rect.left + rect.width  * 0.42;
      const ry = rect.top  + rect.height * 0.30;
      const dx = e.clientX - rx, dy = e.clientY - ry;
      const angle = Math.atan2(dy, dx);
      const travel = Math.min(Math.sqrt(dx*dx+dy*dy)/60, 1) * MAX_TRAVEL;
      targetX = EYE_CX + Math.cos(angle) * travel;
      targetY = EYE_CY + Math.sin(angle) * travel;
    }

    function smooth() {
      currentX += (targetX - currentX) * 0.10;
      currentY += (targetY - currentY) * 0.10;
      setEyePos(currentX, currentY);
      raf = requestAnimationFrame(smooth);
    }

    window.addEventListener('mousemove', onMouseMove);
    smooth();
    return () => { window.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    const root = robotRootRef.current;
    if (!root) return;
    let sneezing = false;
    let snotRaf: number;

    function setBody(rot: number, ty: number) {
      const svg = robotSvgRef.current;
      if (!svg) return;
      svg.style.transform = `rotate(${rot}deg) translateY(${ty}px)`;
      svg.style.transformOrigin = '50% 80%';
    }
    function setAntenna(r: number) {
      const ant = antennaRef.current;
      if (!ant) return;
      ant.style.transform = `rotate(${r}deg)`;
      ant.style.transformOrigin = '95px 28px';
    }
    function setSquint(op: number) {
      if (squintRef.current)     squintRef.current.style.opacity     = String(op);
      if (squintLineRef.current) squintLineRef.current.style.opacity = String(op);
    }
    function setBlush(alpha: number) {
      const col = `rgba(255,100,140,${alpha})`;
      if (blushLRef.current) blushLRef.current.setAttribute('fill', col);
      if (blushRRef.current) blushRRef.current.setAttribute('fill', col);
    }

    function spawnParticles() {
      const canvas = snotRef.current;
      if (!canvas) return;
      canvas.style.display = 'block';
      const ctx = canvas.getContext('2d')!;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const rect = root.getBoundingClientRect();
      const ox = rect.left + rect.width  * 0.5;
      const oy = rect.top  + rect.height * 0.35;
      type P = {x:number;y:number;vx:number;vy:number;r:number;life:number;decay:number;gravity:number;col:string;isStar:boolean};
      const particles: P[] = [];
      for (let i = 0; i < 38; i++) {
        const angle = (-30 + Math.random() * 80) * Math.PI / 180;
        const spd = 2 + Math.random() * 9;
        particles.push({ x:ox, y:oy, vx:Math.cos(angle)*spd*(Math.random()>.5?1:-0.4),
          vy:Math.sin(angle)*spd-1.5, r:1.2+Math.random()*3.5, life:1,
          decay:.016+Math.random()*.018, gravity:.14+Math.random()*.08,
          col:Math.random()>.4?'0,200,255':'77,163,255', isStar:Math.random()>.65 });
      }
      function draw() {
        ctx.clearRect(0,0,canvas!.width,canvas!.height);
        let alive = false;
        particles.forEach(p => {
          if (p.life <= 0) return; alive = true;
          p.x+=p.vx; p.y+=p.vy; p.vy+=p.gravity; p.life-=p.decay;
          const a = Math.max(0, p.life);
          if (p.isStar) {
            ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.life*8);
            ctx.globalAlpha=a*.85; ctx.strokeStyle=`rgba(${p.col},1)`; ctx.lineWidth=1.4;
            for (let j=0;j<4;j++){const ag=j*Math.PI/2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(ag)*p.r*1.8,Math.sin(ag)*p.r*1.8);ctx.stroke();}
            ctx.restore();
          } else {
            const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*2.8);
            g.addColorStop(0,`rgba(${p.col},${a*.85})`); g.addColorStop(1,`rgba(${p.col},0)`);
            ctx.beginPath(); ctx.arc(p.x,p.y,p.r*2.8,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
            ctx.beginPath(); ctx.arc(p.x,p.y,p.r*.5,0,Math.PI*2); ctx.fillStyle=`rgba(200,240,255,${a*.7})`; ctx.fill();
          }
        });
        if (alive) snotRaf = requestAnimationFrame(draw);
        else { ctx.clearRect(0,0,canvas!.width,canvas!.height); canvas!.style.display='none'; }
      }
      draw();
    }

    async function doSneeze() {
      if (sneezing) return; sneezing = true;
      setBody(-6,-5); setAntenna(-12); await sleep(120);
      setSquint(0.5); await sleep(150);
      setBody(-9,-7); setAntenna(10); await sleep(120);
      setSquint(0.85); setAntenna(-8); await sleep(160);
      setSquint(1); await sleep(100);
      setBody(14,8); setAntenna(20);
      if (bubbleRef.current) { bubbleRef.current.classList.remove('robot-bubble-hide'); bubbleRef.current.classList.add('robot-bubble-show'); }
      if (robotSvgRef.current) robotSvgRef.current.style.filter = 'drop-shadow(0 0 36px rgba(0,212,255,0.85))';
      spawnParticles();
      await sleep(160);
      setBody(-3,-3); setAntenna(-5);
      if (robotSvgRef.current) robotSvgRef.current.style.filter = '';
      await sleep(180);
      if (bubbleRef.current) { bubbleRef.current.classList.add('robot-bubble-hide'); bubbleRef.current.classList.remove('robot-bubble-show'); }
      setBody(0,0); setAntenna(0); setSquint(0); await sleep(260);
      setBlush(0.45); setBody(-3,-4); await sleep(300); setBody(2,2); await sleep(250); setBody(0,0);
      if (blessRef.current) blessRef.current.classList.add('robot-bless-show');
      await sleep(1600);
      if (blessRef.current) blessRef.current.classList.remove('robot-bless-show');
      await sleep(500); setBlush(0); await sleep(400); sneezing = false;
    }

    root.addEventListener('mouseenter', doSneeze);
    return () => { root.removeEventListener('mouseenter', doSneeze); cancelAnimationFrame(snotRaf); };
  }, []);

  return (
    <div className="robot-stage">
      {/* Pulse rings */}
      <div className="robot-pulse-ring" /><div className="robot-pulse-ring" /><div className="robot-pulse-ring" />

      {/* Orbits + Robot */}
      <div className="robot-orbits">
        <div className="robot-orbit robot-o1"><div className="robot-odot" /></div>
        <div className="robot-orbit robot-o2"><div className="robot-odot2" /></div>
        <div className="robot-orbit robot-o3" />

        <div ref={robotRootRef} className="robot-root" style={{ position:'relative', zIndex:2, width:190, height:210, cursor:'default' }}>
          {/* Sneeze bubble */}
          <div ref={bubbleRef} className="robot-achoo-bubble">
            <div className="robot-bubble-inner">A‑ACHOO! 🤧</div>
          </div>

          <svg ref={robotSvgRef} id="robot-body-svg-hero" width="190" height="210" viewBox="0 0 190 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{overflow:'visible', transition:'transform .15s ease'}}>
            <defs>
              <radialGradient id="hgBody" cx="38%" cy="22%" r="72%"><stop offset="0%" stopColor="#E2ECF4"/><stop offset="40%" stopColor="#A8BAC8"/><stop offset="100%" stopColor="#52606E"/></radialGradient>
              <radialGradient id="hgHead" cx="35%" cy="18%" r="75%"><stop offset="0%" stopColor="#EBF3FA"/><stop offset="45%" stopColor="#AABCCC"/><stop offset="100%" stopColor="#4E5C6A"/></radialGradient>
              <radialGradient id="hgSph"  cx="30%" cy="22%" r="70%"><stop offset="0%" stopColor="#C8D8E6"/><stop offset="100%" stopColor="#424E58"/></radialGradient>
              <radialGradient id="hgSph2" cx="30%" cy="22%" r="70%"><stop offset="0%" stopColor="#A8B8C6"/><stop offset="100%" stopColor="#323840"/></radialGradient>
              <radialGradient id="hgEye"  cx="38%" cy="30%" r="70%"><stop offset="0%" stopColor="#A0EEFF"/><stop offset="45%" stopColor="#0099EE"/><stop offset="100%" stopColor="#003A88"/></radialGradient>
              <radialGradient id="hgAnt"  cx="40%" cy="28%" r="68%"><stop offset="0%" stopColor="#70DAFF"/><stop offset="100%" stopColor="#0060CC"/></radialGradient>
              <linearGradient id="hgChest" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,80,180,0.35)"/><stop offset="100%" stopColor="rgba(0,40,100,0.5)"/></linearGradient>
              <filter id="hfShadow" x="-20%" y="-10%" width="140%" height="130%"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(0,0,0,0.45)"/></filter>
              <filter id="hfGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <clipPath id="heyeClip"><rect x="58" y="46" width="42" height="24" rx="5"/></clipPath>
            </defs>
            <ellipse cx="95" cy="204" rx="56" ry="7" fill="rgba(20,80,200,0.18)"/>
            {/* Satellite spheres */}
            <circle cx="20"  cy="154" r="18" fill="url(#hgSph)"  filter="url(#hfShadow)"/>
            <circle cx="170" cy="154" r="18" fill="url(#hgSph)"  filter="url(#hfShadow)"/>
            <circle cx="46"  cy="174" r="14" fill="url(#hgSph2)" filter="url(#hfShadow)"/>
            <circle cx="144" cy="174" r="14" fill="url(#hgSph2)" filter="url(#hfShadow)"/>
            <circle cx="95"  cy="182" r="12" fill="url(#hgSph2)" filter="url(#hfShadow)"/>
            <ellipse cx="15"  cy="148" rx="6"   ry="4"   fill="rgba(255,255,255,0.22)"/>
            <ellipse cx="165" cy="148" rx="6"   ry="4"   fill="rgba(255,255,255,0.22)"/>
            <ellipse cx="42"  cy="169" rx="4.5" ry="3"   fill="rgba(255,255,255,0.18)"/>
            <ellipse cx="140" cy="169" rx="4.5" ry="3"   fill="rgba(255,255,255,0.18)"/>
            <ellipse cx="91"  cy="177" rx="4"   ry="2.5" fill="rgba(255,255,255,0.16)"/>
            {/* Body */}
            <ellipse cx="95" cy="136" rx="48" ry="52" fill="url(#hgBody)" filter="url(#hfShadow)"/>
            <ellipse cx="78" cy="112" rx="20" ry="28" fill="rgba(255,255,255,0.09)"/>
            <ellipse cx="108" cy="162" rx="32" ry="20" fill="rgba(0,0,0,0.12)"/>
            <rect x="66" y="116" width="58" height="42" rx="9" fill="url(#hgChest)" stroke="rgba(77,163,255,0.6)" strokeWidth="1.5"/>
            <rect x="66" y="116" width="58" height="42" rx="9" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="3"/>
            <rect x="73" y="123" width="18" height="3.5" rx="1.75" fill="#4DA3FF" opacity=".9"/>
            <rect x="73" y="130" width="28" height="3.5" rx="1.75" fill="#00D4FF" opacity=".75"/>
            <rect x="73" y="137" width="14" height="3.5" rx="1.75" fill="#4DA3FF" opacity=".6"/>
            <rect x="73" y="144" width="22" height="3.5" rx="1.75" fill="#4DA3FF" opacity=".4"/>
            <circle cx="108" cy="124" r="3.5" fill="#00D4FF" filter="url(#hfGlow)"/>
            {/* Neck */}
            <rect x="81" y="80" width="28" height="18" rx="6" fill="url(#hgBody)"/>
            <line x1="85" y1="85" x2="111" y2="85" stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
            <line x1="85" y1="90" x2="111" y2="90" stroke="rgba(0,0,0,0.10)" strokeWidth="1"/>
            <line x1="85" y1="95" x2="111" y2="95" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
            {/* Head */}
            <rect x="44" y="28" width="102" height="64" rx="24" fill="url(#hgHead)" filter="url(#hfShadow)"/>
            <ellipse cx="72" cy="38" rx="22" ry="11" fill="rgba(255,255,255,0.13)"/>
            <rect x="44" y="76" width="102" height="16" rx="12" fill="rgba(0,0,0,0.08)"/>
            {/* Ear modules */}
            <rect x="26" y="42" width="20" height="30" rx="8" fill="url(#hgBody)" stroke="rgba(77,163,255,0.3)" strokeWidth="1.2"/>
            <rect x="30" y="48" width="8"  height="18" rx="3" fill="rgba(26,111,255,0.14)"/>
            <rect x="31" y="50" width="6"  height="4"  rx="2" fill="rgba(77,163,255,0.5)"/>
            <rect x="144" y="42" width="20" height="30" rx="8" fill="url(#hgBody)" stroke="rgba(77,163,255,0.3)" strokeWidth="1.2"/>
            <rect x="152" y="48" width="8" height="18" rx="3" fill="rgba(26,111,255,0.14)"/>
            <rect x="153" y="50" width="6" height="4"  rx="2" fill="rgba(77,163,255,0.5)"/>
            {/* Visor */}
            <rect x="56" y="44" width="78" height="28" rx="14" fill="#060E24" stroke="rgba(77,163,255,0.55)" strokeWidth="1.6"/>
            <rect x="58" y="46" width="74" height="24" rx="12" fill="rgba(0,40,110,0.5)"/>
            {/* Eye group */}
            <g ref={eyeGroupRef} clipPath="url(#heyeClip)">
              <circle ref={scleraRef} cx="79" cy="58" r="11" fill="#0A1840"/>
              <circle ref={irisRef}   cx="79" cy="58" r="8"  fill="url(#hgEye)"/>
              <circle ref={pupilRef}  cx="79" cy="58" r="4.5" fill="#001830"/>
              <circle ref={catchRef}  cx="81" cy="55" r="1.8" fill="rgba(255,255,255,0.9)"/>
              <circle ref={ring1Ref}  cx="79" cy="58" r="6"  stroke="rgba(0,212,255,0.35)" strokeWidth="1" fill="none"/>
            </g>
            <rect ref={squintRef}    x="56" y="44" width="78" height="28" rx="14" fill="#060E24" opacity="0"/>
            <path ref={squintLineRef} d="M62 58 Q79 50 96 58" stroke="#4DA3FF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0"/>
            {/* Antenna */}
            <g ref={antennaRef}>
              <rect x="92" y="10" width="6" height="22" rx="3" fill="url(#hgBody)"/>
              <circle cx="95" cy="8" r="10" fill="#1A6FFF"/>
              <circle cx="95" cy="8" r="6.5" fill="url(#hgAnt)"/>
              <circle cx="95" cy="8" r="3"   fill="rgba(255,255,255,0.92)"/>
              <circle cx="95" cy="8" r="14"  stroke="rgba(0,212,255,0.28)" strokeWidth="1.2" fill="none"/>
            </g>
            {/* Blush */}
            <ellipse ref={blushLRef} cx="52"  cy="70" rx="10" ry="6" fill="rgba(255,100,140,0)"/>
            <ellipse ref={blushRRef} cx="138" cy="70" rx="10" ry="6" fill="rgba(255,100,140,0)"/>
          </svg>
        </div>
      </div>

      {/* Floor grid */}
      <div className="robot-floor-wrap">
        <div className="robot-floor-grid" />
        <div className="robot-floor-shadow" />
      </div>

      <div ref={blessRef} className="robot-bless-you">✦ Bless you, little bot ✦</div>
      <canvas ref={snotRef} className="robot-snot-canvas" style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:25,display:'none',width:'100%',height:'100%'}} />
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

const words = ["Intelligent", "Digital", "Systems", "for", "Modern"];
const glowWords = ["Intelligent", "Systems"];

const Orb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 3, ease: "easeOut" }}
    className={`absolute rounded-full pointer-events-none ${className}`}
  />
);

const HeroSection = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 noise-overlay">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/75" />
      {/* Top + bottom fade to blend into adjacent sections */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      {/* Static layered glow — no per-frame animation */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(250 60% 20% / 0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(190 80% 20% / 0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, hsl(270 50% 15% / 0.5) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(250 60% 58% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(250 60% 58% / 0.4) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Static decorative orbs (blur cached once, not re-painted per frame) */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] top-10 -right-32 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[80px] bottom-10 -left-20 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* ── Left: Text content ── */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                Digital Systems &amp; AI Automation Agency
              </span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.08] mb-6">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`inline-block mr-[0.3em] ${glowWords.includes(word) ? "gradient-text" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 1.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="gradient-text"
              >
                Businesses
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mb-4 font-body leading-relaxed"
            >
              We design, automate, and scale high-performance web platforms and AI-driven workflows that reduce operational friction and increase measurable growth.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-muted-foreground/50 text-sm mb-12"
            >
              Trusted by startups and growing service businesses worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="hero"
                size="lg"
                className="text-base px-8 py-6 animate-pulse-glow"
                onClick={() => setCalendlyOpen(true)}
              >
                Book a Free Strategy Call
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </Button>
              <Button
                variant="hero-outline"
                size="lg"
                className="text-base px-8 py-6"
                onClick={() => scrollToSection("case-studies")}
              >
                <Play size={16} className="mr-2" />
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* ── Right: Robot Animation ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex flex-shrink-0 w-[48%] max-w-[560px] items-center justify-center"
          >
            <RobotAnimation />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade — extra tall to melt into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent" />

      <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
    </section>
  );
};

export default HeroSection;

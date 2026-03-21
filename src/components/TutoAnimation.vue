<template>
  <div class="font-[Inter] min-h-screen bg-[#0e100f] text-gray-200">
    <!-- Header sticky — GSAP dark style -->
    <div class="sticky top-0 z-30 bg-[#0e100f]/95 backdrop-blur-md border-b border-[#1a1d1b] px-4 py-3 flex items-center gap-3">
      <button @click="$emit('back')" class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0ae448] bg-[#1a1d1b] hover:bg-[#222522] border border-[#2a2d2b] px-3 py-1.5 rounded-lg transition cursor-pointer shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Retour
      </button>
      <div class="flex-1 min-w-0 flex items-center gap-2">
        <!-- GSAP logo green -->
        <svg class="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#0ae448"/><path d="M7 12h4l2-5 2 8 2-3h2" stroke="#0e100f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h1 class="text-sm sm:text-base font-bold text-white truncate">GSAP — Animations Portfolio</h1>
      </div>
      <!-- Burger mobile -->
      <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-lg hover:bg-[#1a1d1b] transition cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
      </button>
    </div>

    <div class="flex">
      <!-- Sidebar overlay mobile -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

      <!-- Sidebar — GSAP dark style with green line -->
      <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'" class="fixed lg:sticky top-[53px] left-0 z-50 lg:z-10 lg:translate-x-0 w-[280px] sm:w-64 lg:w-60 xl:w-64 h-[calc(100vh-53px)] bg-[#131613] border-r border-[#1e211e] overflow-y-auto transition-transform duration-300 lg:block shrink-0">
        <nav class="py-4 pl-4 pr-3">
          <p class="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0ae448]/60">Documentation</p>
          <!-- Vertical line -->
          <div class="relative">
            <div class="absolute left-[11px] top-0 bottom-0 w-px bg-[#1e211e]"></div>
            <div class="space-y-0.5">
              <button
                v-for="(section, i) in sections"
                :key="i"
                @click="scrollToSection(i)"
                class="group w-full text-left pl-7 pr-2 py-2 rounded-r-lg text-[13px] leading-snug transition-all duration-200 cursor-pointer relative"
                :class="activeSection === i
                  ? 'text-[#0ae448] font-semibold bg-[#0ae448]/8'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/3'"
              >
                <!-- Dot on the line -->
                <span class="absolute left-[7px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full border-2 transition-all duration-200"
                  :class="activeSection === i ? 'border-[#0ae448] bg-[#0ae448] shadow-[0_0_8px_rgba(10,228,72,0.5)]' : 'border-[#2a2d2b] bg-[#131613] group-hover:border-gray-500'"></span>
                <span class="block truncate">{{ section.title.split(' — ')[0] }}</span>
                <span v-if="section.title.includes(' — ')" class="block text-[11px] truncate mt-0.5" :class="activeSection === i ? 'text-[#0ae448]/60' : 'text-gray-600'">{{ section.title.split(' — ')[1] }}</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Contenu principal -->
      <main class="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 py-8 pb-24">
        <!-- Intro — GSAP Hero style -->
        <div class="mb-12 relative">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#0ae448"/><path d="M11 20h7l3-8 4 14 3-6h4" stroke="#0e100f" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Animations GSAP</h1>
              <p class="text-sm text-gray-500 font-medium">Documentation Portfolio</p>
            </div>
          </div>
          <p class="text-gray-400 leading-relaxed max-w-3xl">
            Toutes les animations GSAP utilisees dans mon <span class="text-[#0ae448] font-semibold">portfolio</span> (foliolara).
            Chaque section contient une <span class="text-white font-medium">explication</span>, le <span class="text-white font-medium">code source</span>, puis une
            <span class="text-white font-medium">analyse detaillee</span> du fonctionnement.
          </p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-[#0ae448]/10 text-[#0ae448] border border-[#0ae448]/20 rounded-full text-xs font-bold">GSAP 3.12+</span>
            <span class="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">ScrollTrigger</span>
            <span class="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">Timeline</span>
            <span class="px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-xs font-bold">Ticker</span>
          </div>
        </div>

        <!-- Sections -->
        <div v-for="(section, i) in sections" :key="i" :ref="el => sectionRefs[i] = el" class="mb-16">
          <!-- Titre section — green accent -->
          <div class="flex items-center gap-3 mb-5 pb-3 border-b border-[#1e211e]">
            <span class="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0ae448]/10 text-lg">{{ section.icon }}</span>
            <div>
              <h2 class="text-lg sm:text-xl font-extrabold text-white">{{ section.title.split(' — ')[0] }}</h2>
              <p v-if="section.title.includes(' — ')" class="text-sm text-gray-500 mt-0.5">{{ section.title.split(' — ')[1] }}</p>
            </div>
            <span class="ml-auto text-[11px] font-mono text-gray-600 bg-[#1a1d1b] px-2 py-0.5 rounded">{{ String(i + 1).padStart(2, '0') }}/{{ String(sections.length).padStart(2, '0') }}</span>
          </div>

          <!-- Explication — dark card -->
          <div class="bg-[#131613] border border-[#1e211e] rounded-xl p-4 sm:p-5 mb-5">
            <h3 class="font-bold text-[#0ae448] mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              Explication
            </h3>
            <p class="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{{ section.explanation }}</p>
          </div>

          <!-- Demo interactive -->
          <div v-if="section.demoId" class="mb-5 bg-[#131613] border border-dashed border-[#2a2d2b] rounded-xl p-5 overflow-hidden" :ref="el => demoRefs[section.demoId] = el">
            <p class="text-[10px] text-[#0ae448] font-bold uppercase tracking-widest mb-3">⚡ Demo interactive</p>
            <component :is="section.demoComponent" v-if="section.demoComponent" />
            <div v-else :id="section.demoId"></div>
          </div>

          <!-- Code — GSAP dark code style -->
          <div class="mb-5 rounded-xl overflow-hidden border border-[#1e211e]">
            <div class="flex items-center justify-between bg-[#1a1d1b] px-4 py-2.5">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span class="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span class="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                <span class="text-xs font-mono text-gray-500 ml-2">{{ section.codeLabel || 'javascript' }}</span>
              </div>
              <button @click="copyCode(section.code)" class="text-xs text-gray-500 hover:text-[#0ae448] transition cursor-pointer flex items-center gap-1.5 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>
                <span :class="copied === section.code ? 'text-[#0ae448]' : ''">{{ copied === section.code ? '✓ Copie !' : 'Copier' }}</span>
              </button>
            </div>
            <pre class="bg-[#0e100f] text-gray-300 p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed"><code>{{ section.code }}</code></pre>
          </div>

          <!-- Analyse du code — dark card with green bullets -->
          <div class="bg-[#131613] border border-[#1e211e] rounded-xl p-4 sm:p-5">
            <h3 class="font-bold text-[#0ae448] mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
              Analyse du code
            </h3>
            <ul class="space-y-2.5 text-sm text-gray-300">
              <li v-for="(point, j) in section.analysis" :key="j" class="flex gap-2.5 items-start">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0ae448] shrink-0 mt-1.5"></span>
                <span v-html="point"></span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineEmits(['back'])

const sidebarOpen = ref(false)
const activeSection = ref(0)
const copied = ref('')
const sectionRefs = reactive({})
const demoRefs = reactive({})

const copyCode = (code) => {
  navigator.clipboard.writeText(code)
  copied.value = code
  setTimeout(() => { copied.value = '' }, 2000)
}

const scrollToSection = (i) => {
  sidebarOpen.value = false
  const el = sectionRefs[i]
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Observer pour highlight sidebar
let observer = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Object.keys(sectionRefs).find(k => sectionRefs[k] === entry.target)
        if (idx !== undefined) activeSection.value = Number(idx)
      }
    })
  }, { rootMargin: '-20% 0px -60% 0px' })

  setTimeout(() => {
    Object.values(sectionRefs).forEach(el => {
      if (el) observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

// ========================== SECTIONS DATA ==========================
const sections = [
  // ─── 1. gsap.set() ───
  {
    icon: '🎯',
    title: 'gsap.set() — Proprietes instantanees',
    explanation: `gsap.set() applique des proprietes CSS instantanement (sans animation). C'est l'equivalent d'un style inline mais en plus puissant car il comprend les transforms GSAP (x, y, scale, rotation...).

Dans le portfolio, on l'utilise dans le ticker pour positionner le cursor blob a chaque frame sans transition — c'est ce qui donne l'effet de suivi fluide.`,
    code: `// Positionner le blob curseur a chaque frame
gsap.set(cursorBlob, {
    left: blobX,
    top: blobY,
    rotation: angle,
    scaleX: 1 + stretch,
    scaleY: 1 - squeeze,
    skewX: skew,
    xPercent: -50,
    yPercent: -50
});

// Initialiser des elements avant animation
gsap.set('.logo, .nav-links a', { y: -20, opacity: 0 });
gsap.set('.hero-cta a', { x: -30, opacity: 0 });`,
    analysis: [
      '<strong>gsap.set(element, { props })</strong> — applique les proprietes instantanement, 0 duree',
      '<strong>left, top</strong> — position CSS classique, ici calculee par interpolation lineaire (lerp)',
      '<strong>rotation</strong> — angle en degres calcule avec <code>Math.atan2(vy, vx)</code> (direction du mouvement)',
      '<strong>scaleX / scaleY</strong> — deformation basee sur la velocite : plus la souris va vite, plus le blob s\'etire',
      '<strong>skewX</strong> — inclinaison proportionnelle a la vitesse pour un effet organique',
      '<strong>xPercent: -50, yPercent: -50</strong> — centrage du transform-origin (equivalent de translate(-50%, -50%))',
      'Utilise dans le ticker (60fps), <code>gsap.set</code> est plus performant que de modifier element.style directement car GSAP batche les modifications',
    ]
  },

  // ─── 2. gsap.to() ───
  {
    icon: '➡️',
    title: 'gsap.to() — Animer vers une cible',
    explanation: `gsap.to() est LA methode fondamentale de GSAP. Elle anime un element de son etat actuel vers les valeurs cibles.

Dans le portfolio, elle est utilisee pour :
• Agrandir le blob au survol des liens/boutons
• Creer l'effet magnetique des boutons (le bouton suit la souris)
• Le retour elastique quand la souris quitte le bouton`,
    code: `// Agrandir le cursor blob au survol d'un lien
el.addEventListener('mouseenter', () => {
    gsap.to(cursorBlob, {
        width: 80, height: 80,
        duration: 0.3,
        ease: 'power2.out'
    });
});
el.addEventListener('mouseleave', () => {
    gsap.to(cursorBlob, {
        width: 30, height: 30,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Effet magnetique : le bouton suit la souris
btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
        x: dx * 0.3,
        y: dy * 0.3,
        scaleX: 1 + Math.abs(dx) * 0.001,
        scaleY: 1 + Math.abs(dy) * 0.002,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Retour elastique au mouseleave
btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
        x: 0, y: 0,
        scaleX: 1, scaleY: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
    });
});`,
    analysis: [
      '<strong>gsap.to(target, { vars })</strong> — anime du state actuel vers les valeurs dans vars',
      '<strong>duration: 0.3</strong> — duree en secondes de l\'animation',
      '<strong>ease: "power2.out"</strong> — courbe d\'acceleration : commence vite, ralentit a la fin (deceleration naturelle)',
      '<strong>ease: "elastic.out(1, 0.4)"</strong> — rebond elastique ! Le <code>1</code> = amplitude, <code>0.4</code> = periode (plus bas = plus de rebonds)',
      '<strong>getBoundingClientRect()</strong> — recupere la position du bouton, puis on calcule le delta (dx, dy) entre la souris et le centre',
      '<strong>x: dx * 0.3</strong> — le bouton se deplace a 30% de la distance souris-centre → effet "magnetique" subtil',
      '<strong>scaleX/scaleY</strong> — legere deformation du bouton basee sur la distance, comme si le bouton etait en caoutchouc',
      'Chaque nouvel appel <code>gsap.to()</code> sur le meme element ecrase automatiquement l\'animation precedente → pas de conflit',
    ]
  },

  // ─── 3. gsap.ticker ───
  {
    icon: '⏱️',
    title: 'gsap.ticker — Animation par frame (60fps)',
    explanation: `gsap.ticker est le moteur interne de GSAP. En ajoutant une callback avec ticker.add(), on execute du code a chaque frame (60fps en general).

C'est plus performant que requestAnimationFrame car GSAP coordonne tout en un seul repaint.

Dans le portfolio, le ticker gere :
• Le suivi fluide du cursor blob (interpolation lineaire)
• Le calcul de la velocite pour la deformation organique
• L'effet de repulsion magnetique des caracteres du titre`,
    code: `let mouseX = 0, mouseY = 0;
let blobX = 0, blobY = 0;
let prevBlobX = 0, prevBlobY = 0;
let smoothVx = 0, smoothVy = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

gsap.ticker.add(() => {
    // 1) Interpolation lineaire (lerp) : blob suit la souris avec retard
    blobX += (mouseX - blobX) * 0.12;
    blobY += (mouseY - blobY) * 0.12;

    // 2) Calcul de la velocite lissee
    const vx = blobX - prevBlobX;
    const vy = blobY - prevBlobY;
    smoothVx += (vx - smoothVx) * 0.2;
    smoothVy += (vy - smoothVy) * 0.2;
    prevBlobX = blobX;
    prevBlobY = blobY;

    // 3) Deformation basee sur la vitesse
    const velocity = Math.sqrt(smoothVx ** 2 + smoothVy ** 2);
    const angle = Math.atan2(smoothVy, smoothVx) * (180 / Math.PI);
    const stretch = Math.min(velocity * 0.04, 0.6);

    // 4) Border-radius organique
    const r1 = 50 - stretch * 15;
    const r2 = 50 + stretch * 10;
    const r3 = 50 - stretch * 8;
    const r4 = 50 + stretch * 12;

    gsap.set(cursorBlob, {
        left: blobX, top: blobY,
        rotation: angle,
        scaleX: 1 + stretch,
        scaleY: 1 - stretch * 0.5
    });
    cursorBlob.style.borderRadius =
        \`\${r1}% \${r2}% \${r3}% \${r4}%\`;
});`,
    analysis: [
      '<strong>gsap.ticker.add(callback)</strong> — ajoute une fonction executee a chaque frame du moteur GSAP (~60fps)',
      '<strong>Interpolation lineaire (lerp)</strong> : <code>blobX += (mouseX - blobX) * 0.12</code> → le blob parcourt 12% de la distance restante a chaque frame, creant un suivi fluide avec inertie',
      '<strong>Velocite lissee</strong> : au lieu de prendre la vitesse brute (saccadee), on applique un 2e lerp : <code>smoothVx += (vx - smoothVx) * 0.2</code> pour lisser les a-coups',
      '<strong>Math.atan2(vy, vx)</strong> — calcule l\'angle de direction du mouvement en radians, converti en degres pour la rotation',
      '<strong>stretch / squeeze</strong> — la vitesse controle l\'etirement horizontal et le "squeeze" vertical, comme une goutte d\'eau en mouvement',
      '<strong>Border-radius asymetrique</strong> — 4 valeurs differentes pour chaque coin (r1% r2% r3% r4%), variant avec le stretch → forme organique qui se deforme en temps reel',
      '<strong>Math.min(velocity * 0.04, 0.6)</strong> — cap a 0.6 pour eviter une deformation excessive a haute vitesse',
    ]
  },

  // ─── 4. gsap.timeline() ───
  {
    icon: '🎬',
    title: 'gsap.timeline() — Sequence d\'animations',
    explanation: `gsap.timeline() permet d'enchainer des animations dans un ordre precis. Au lieu de calculer les delais manuellement, chaque .to() s'enchaine automatiquement apres le precedent.

Le parametre de position ("-=0.4") cree des chevauchements : l'animation commence 0.4s avant la fin de la precedente.

Dans le portfolio, la timeline anime l'apparition initiale : logo → liens nav → bouton → titre → sous-titre → CTA.`,
    code: `// Etats initiaux (tout est cache)
gsap.set('.logo, .nav-links a, .nav-right', {
    y: -20, opacity: 0
});
gsap.set('.hero-title, .hero-subtitle', {
    y: -20, opacity: 0
});
gsap.set('.hero-cta a', { x: -30, opacity: 0 });

// Timeline sequentielle
const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
});

tl.to('.logo', {
    opacity: 1, y: 0,
    duration: 0.8, delay: 0.3
})
.to('.nav-links a', {
    opacity: 1, y: 0,
    duration: 0.6, stagger: 0.1      // chaque lien decale de 0.1s
}, "-=0.4")                           // commence 0.4s avant la fin
.to('.nav-right', {
    opacity: 1, y: 0,
    duration: 0.6
}, "-=0.4")
.to('.hero-title', {
    opacity: 1, y: 0,
    duration: 0.8
}, "-=0.2")
.to('.hero-subtitle', {
    opacity: 1, y: 0,
    duration: 0.6
}, "-=0.4")
.to('.hero-cta a', {
    opacity: 1, x: 0,
    duration: 0.6, stagger: 0.15
}, "-=0.4");`,
    analysis: [
      '<strong>gsap.timeline({ defaults })</strong> — cree une timeline avec des valeurs par defaut appliquees a toutes les animations enfants',
      '<strong>defaults: { ease: "power3.out" }</strong> — toutes les animations de cette timeline utiliseront cette ease sauf si on la surcharge',
      '<strong>.to(target, vars, position)</strong> — ajoute une animation a la timeline. Le 3e argument est la position dans la timeline',
      '<strong>"-=0.4"</strong> — position relative : commence 0.4s AVANT la fin de l\'animation precedente → cree un chevauchement fluide',
      '<strong>stagger: 0.1</strong> — si le selecteur vise plusieurs elements (ex: ".nav-links a" = 4 liens), chaque lien demarre 0.1s apres le precedent',
      '<strong>delay: 0.3</strong> — sur la 1ere animation uniquement, attend 0.3s apres le chargement de la page',
      'L\'ordre est : Logo (0.3s) → Liens nav (stagger 0.1 chacun, chevauche) → Bouton nav → Titre → Sous-titre → Boutons CTA (stagger 0.15)',
      'Sans timeline, il faudrait calculer manuellement chaque delay → timeline rend le code lisible et maintenable',
    ]
  },

  // ─── 5. Text Split — Caractere par caractere ───
  {
    icon: '✂️',
    title: 'Text Split — Decoupe caractere / mot',
    explanation: `Pour animer du texte lettre par lettre ou mot par mot, on doit d'abord "splitter" le texte en elements individuels (<span>).

GSAP ne peut pas animer des lettres dans un textContent — il faut que chaque lettre soit dans son propre element DOM.

Dans le portfolio, le split est utilise pour :
• Le titre "CHEIKH / KEINDE" (repulsion magnetique par caractere)
• "A PROPOS" (reveal progressif caractere par caractere au scroll)
• Le paragraphe "about" (reveal mot par mot)`,
    code: `// ===== SPLIT PAR CARACTERE =====
const aboutText = document.getElementById('aboutText');
const aboutString = aboutText.textContent;    // "A PROPOS"
aboutText.textContent = '';                   // vider le noeud

aboutString.split('').forEach(char => {
    const span = document.createElement('span');
    span.className = 'about-char';
    // Espace insecable pour garder les espaces visibles
    span.textContent = char === ' ' ? '\\u00A0' : char;
    aboutText.appendChild(span);
});

const aboutChars = aboutText.querySelectorAll('.about-char');

// ===== SPLIT PAR MOT =====
const aboutPara = aboutContent.querySelector('p');
const words = aboutPara.textContent.trim().split(/\\s+/);
aboutPara.textContent = '';

words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'about-word';
    span.textContent = word;
    aboutPara.appendChild(span);
    // Ajouter un espace texte entre les mots
    if (i < words.length - 1) {
        aboutPara.appendChild(
            document.createTextNode(' ')
        );
    }
});

const aboutWordEls = aboutPara.querySelectorAll('.about-word');`,
    analysis: [
      '<strong>Split par caractere</strong> : <code>string.split("")</code> transforme "HELLO" en ["H", "E", "L", "L", "O"]',
      '<strong>Split par mot</strong> : <code>string.split(/\\s+/)</code> coupe sur les espaces (regex \\s+ = un ou plusieurs espaces)',
      '<strong>\\u00A0</strong> — espace insecable (non-breaking space). Sans ca, les <code>&lt;span&gt; &lt;/span&gt;</code> avec un espace normal seraient ignores par le navigateur',
      '<strong>document.createTextNode(" ")</strong> — entre les mots, on injecte un noeud texte espace au lieu d\'un span, pour que le navigateur gere le word-wrap naturellement',
      '<strong>Pourquoi splitter ?</strong> GSAP anime des elements DOM. Pour animer chaque lettre individuellement (opacite, position, scale), chaque lettre doit etre un element separe',
      '<strong>querySelectorAll(".about-char")</strong> — apres le split, on recupere tous les spans pour les animer individuellement dans le ScrollTrigger',
      'Il existe un plugin officiel <code>SplitText</code> de GSAP (payant) qui fait ca automatiquement — ici on le fait manuellement',
    ]
  },

  // ─── 6. ScrollTrigger — Morph au scroll ───
  {
    icon: '📜',
    title: 'ScrollTrigger.create() — Animation au scroll',
    explanation: `ScrollTrigger lie une animation au defilement de la page. Avec scrub, l'animation progresse proportionnellement au scroll (0% en haut → 100% en bas).

trigger : l'element qui declenche l'animation
start / end : quand l'animation commence et finit (par rapport au viewport)
scrub : lie l'animation au scroll (true ou nombre = smoothing)

Dans le portfolio, ScrollTrigger controle TOUT le layout morph : le hero text qui grossit, l'overlay sombre qui glisse, les sections qui montent...`,
    code: `gsap.registerPlugin(ScrollTrigger);

// Phase 1 : Hero text scale + move au scroll
ScrollTrigger.create({
    trigger: '#scrollSection1',
    start: 'top bottom',    // quand le haut de #scrollSection1
                            // touche le bas du viewport
    end: 'top top',         // jusqu'a ce qu'il touche le haut
    scrub: 0.5,             // smoothing de 0.5s
    onUpdate: (self) => {
        const progress = self.progress;  // 0 → 1
        const mob = window.innerWidth < 768;

        if (progress > 0.01) {
            const targetX = mob ? 16 : 48;
            const targetY = window.innerHeight / 2;

            // Interpolation position
            currentX = startX + (targetX - startX) * progress;
            currentY = startY + (targetY - startY) * progress;
            currentScale = 1 + progress * (mob ? 0.15 : 0.6);

            gsap.set(heroText, {
                left: currentX,
                top: currentY,
                yPercent: -50,
                scale: currentScale,
                transformOrigin: 'left center'
            });

            // Fade out CTA buttons
            gsap.set(heroCta, {
                opacity: 1 - progress * 1.5
            });
        }
    },
    onLeaveBack: () => {
        gsap.set(heroText, { clearProps: 'all' });
    }
});`,
    analysis: [
      '<strong>gsap.registerPlugin(ScrollTrigger)</strong> — obligatoire, enregistre le plugin avant utilisation',
      '<strong>trigger: "#scrollSection1"</strong> — l\'element DOM qui sert de reference pour le declenchement',
      '<strong>start: "top bottom"</strong> — l\'animation commence quand le HAUT du trigger atteint le BAS du viewport (l\'element entre dans l\'ecran)',
      '<strong>end: "top top"</strong> — l\'animation finit quand le HAUT du trigger atteint le HAUT du viewport (l\'element est completement visible)',
      '<strong>scrub: 0.5</strong> — l\'animation est liee au scroll avec un lissage de 0.5 seconde. <code>scrub: true</code> = instantane, <code>scrub: 2</code> = tres lisse',
      '<strong>self.progress</strong> — valeur de 0 a 1 representant la progression entre start et end',
      '<strong>Interpolation lineaire</strong> : <code>currentX = startX + (targetX - startX) * progress</code> → a progress=0 on est a startX, a progress=1 on est a targetX',
      '<strong>clearProps: "all"</strong> — remet toutes les proprietes GSAP a leur etat initial (important pour le scroll inverse)',
      '<strong>onLeaveBack</strong> — se declenche quand on scroll vers le haut et qu\'on depasse le point "start" → reinitialise a l\'etat original',
    ]
  },

  // ─── 7. Reveal progressif au scroll ───
  {
    icon: '👁️',
    title: 'Reveal progressif — Caracteres & mots au scroll',
    explanation: `En combinant le Text Split avec ScrollTrigger, on obtient un reveal progressif : chaque caractere ou mot apparait au fur et a mesure du scroll.

Le principe : on map la progression du scroll (0→1) sur l'index de chaque element. Chaque element a sa propre fenetre de progression.

Dans le portfolio :
• "A PROPOS" : chaque lettre apparait une par une de gauche a droite
• Le paragraphe : chaque mot apparait avec un stagger calcule au scroll`,
    code: `// Reveal caractere par caractere (A PROPOS)
ScrollTrigger.create({
    trigger: '#apropos',
    start: 'top bottom',
    end: 'top top',
    scrub: 0.5,
    onUpdate: (self) => {
        const progress = self.progress;
        const totalChars = aboutChars.length;

        aboutChars.forEach((char, i) => {
            // Chaque caractere a sa propre fenetre
            const charProgress = Math.max(0, Math.min(1,
                (progress * totalChars - i) * 2
            ));
            char.style.opacity = charProgress;
        });
    }
});

// Reveal mot par mot (paragraphe about)
ScrollTrigger.create({
    trigger: '#scrollSection5',
    start: 'top bottom',
    end: 'center center',
    scrub: 0.5,
    onUpdate: (self) => {
        const progress = self.progress;
        const total = aboutWordEls.length;

        aboutWordEls.forEach((word, i) => {
            // Fenetre de chaque mot
            const wordStart = (i / total) * 0.7;
            const wordEnd = wordStart + 0.4;
            const wordProgress = Math.max(0, Math.min(1,
                (progress - wordStart) / (wordEnd - wordStart)
            ));

            word.style.opacity = String(wordProgress);
            word.style.transform =
                \`translateY(\${(1 - wordProgress) * 18}px)\`;
        });
    }
});`,
    analysis: [
      '<strong>Reveal caractere</strong> : <code>(progress * totalChars - i) * 2</code> → distribue la progression sur tous les caracteres. Le <code>* 2</code> fait que chaque char s\'anime sur une portion reduite du scroll (plus rapide)',
      '<strong>Math.max(0, Math.min(1, ...))</strong> — clamp entre 0 et 1 : empeche les valeurs negatives ou superieures a 1',
      '<strong>Reveal mot - fenetre decalee</strong> : chaque mot a un <code>wordStart</code> et <code>wordEnd</code> differents',
      '<strong>wordStart = (i / total) * 0.7</strong> — le 1er mot demarre a 0%, le dernier a 70% de la progression → les mots ne se revelent pas simultanement',
      '<strong>wordEnd = wordStart + 0.4</strong> — chaque mot a une fenetre de 40% de la progression totale pour son animation complete',
      '<strong>translateY((1 - wordProgress) * 18)</strong> — chaque mot monte de 18px vers sa position finale, creant un effet de "montee" mot par mot',
      '<strong>String(wordProgress)</strong> — les styles inline CSS attendent un string, pas un number',
      'Le <code>overlap</code> entre les fenetres (0.4 > 0.3 d\'ecart) fait que plusieurs mots s\'animent en meme temps → effet de vague',
    ]
  },

  // ─── 8. Overlay & Section Slide ───
  {
    icon: '🎭',
    title: 'Overlay wipe + Section slide-up',
    explanation: `Un pattern recurrent dans le portfolio : une section "glisse" par-dessus la precedente (translateY: 100% → 0%).

L'overlay sombre utilise un effet de "wipe" : un div s'elargit de droite a gauche pour couvrir l'ecran, permettant de passer du theme clair au theme sombre.

Un "clip wrapper" avec le texte en blanc est positionne par-dessus, creant un effet de split-color : le texte est noir a gauche, blanc a droite, exactement la ou l'overlay est.`,
    code: `// Phase 2 : Overlay sombre qui glisse de droite a gauche
ScrollTrigger.create({
    trigger: '#scrollSection2',
    start: 'top bottom',
    end: 'center center',
    scrub: 0.5,
    onUpdate: (self) => {
        const progress = self.progress;

        // L'overlay s'elargit de 0% a 100% depuis la droite
        darkOverlay.style.width = (progress * 100) + '%';

        // Le clip wrapper (texte blanc) suit exactement
        clipWrapper.style.width = (progress * 100) + '%';

        // Le clone blanc est positionne a l'interieur
        const wrapperLeft = window.innerWidth * (1 - progress);
        const cloneLeft = currentMorphX - wrapperLeft;
        gsap.set(heroTextClone, {
            left: cloneLeft,
            top: currentMorphY,
            yPercent: -50,
            scale: currentMorphScale,
            transformOrigin: 'left center'
        });
    }
});

// Section qui slide par-dessus (Stacks → Projets → Contact)
ScrollTrigger.create({
    trigger: '#scrollSection6',
    start: 'top bottom',
    end: 'top top',
    scrub: 0.5,
    onUpdate: (self) => {
        const progress = self.progress;
        const slideUp = (1 - progress) * 100;
        stacksSection.style.transform =
            \`translateY(\${slideUp}%)\`;
    },
    onLeaveBack: () => {
        stacksSection.style.transform = 'translateY(100%)';
    }
});`,
    analysis: [
      '<strong>darkOverlay</strong> — un div avec <code>position: fixed; right: 0; background: dark;</code>. En changeant sa width de 0→100%, il "envahit" l\'ecran depuis la droite',
      '<strong>clipWrapper</strong> — un div <code>position: fixed; right: 0; overflow: hidden;</code> contenant un clone du texte hero en BLANC. Il s\'elargit en meme temps que l\'overlay',
      '<strong>Effet split-color</strong> : le texte original est noir sur fond clair. Le clone blanc dans le clipWrapper apparait progressivement la ou l\'overlay est noir → le texte semble changer de couleur',
      '<strong>wrapperLeft = window.innerWidth * (1 - progress)</strong> — position du bord gauche du wrapper. Le clone doit etre decale pour rester visuellement au meme endroit que l\'original',
      '<strong>Section slide-up</strong> : <code>translateY(100%)</code> = hors ecran en bas. On anime vers <code>translateY(0%)</code> au scroll → la section glisse par-dessus la precedente',
      '<strong>position: fixed + z-index</strong> — les sections empilees utilisent position fixed pour rester en place pendant que la suivante monte. Le z-index determine l\'ordre d\'empilement',
      'Ce pattern est repete 3 fois : Stacks monte sur A Propos, Projets monte sur Stacks, Contact monte sur Projets',
    ]
  },

  // ─── 9. Repulsion magnetique du texte ───
  {
    icon: '🧲',
    title: 'Repulsion magnetique des caracteres',
    explanation: `Quand la souris approche du titre hero, chaque lettre est "repoussee" dans la direction opposee. C'est un calcul physique simplifie : on mesure la distance entre la souris et chaque caractere, et si elle est dans le rayon d'influence, on pousse le caractere.

L'effet est calcule a chaque frame dans le ticker GSAP, ce qui donne un mouvement fluide et reactif.`,
    code: `const MAGNETIC_RADIUS = 150;   // rayon d'influence en px
const MAGNETIC_STRENGTH = 35;  // force de repulsion max en px

gsap.ticker.add(() => {
    heroChars.forEach(char => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        // Distance souris ↔ caractere
        const dx = charCenterX - mouseX;
        const dy = charCenterY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS) {
            // Force inversement proportionnelle a la distance
            const force = 1 - dist / MAGNETIC_RADIUS;
            const angle = Math.atan2(dy, dx);

            const pushX = Math.cos(angle) * force * MAGNETIC_STRENGTH;
            const pushY = Math.sin(angle) * force * MAGNETIC_STRENGTH;
            const rotate = pushX * 0.15;
            const scale = 1 + force * 0.08;

            gsap.set(char, {
                x: pushX,
                y: pushY,
                rotation: rotate,
                scale: scale
            });
        } else {
            // Hors du rayon → position normale
            gsap.set(char, {
                x: 0, y: 0, rotation: 0, scale: 1
            });
        }
    });
});`,
    analysis: [
      '<strong>MAGNETIC_RADIUS = 150</strong> — distance maximale d\'influence en pixels. Au-dela, le caractere n\'est pas affecte',
      '<strong>MAGNETIC_STRENGTH = 35</strong> — deplacement maximal d\'un caractere quand la souris est exactement dessus',
      '<strong>getBoundingClientRect()</strong> — position actuelle du caractere a l\'ecran (chaque frame car il peut bouger)',
      '<strong>force = 1 - dist / MAGNETIC_RADIUS</strong> — quand dist=0 (souris sur le char), force=1 (max). Quand dist=RADIUS, force=0. Relation lineaire inverse',
      '<strong>Math.atan2(dy, dx)</strong> — angle entre la souris et le caractere → direction de la repulsion (le char fuit DANS la direction opposee a la souris)',
      '<strong>Math.cos(angle) * force * STRENGTH</strong> — decompose la force en composantes X et Y dans la direction de repulsion',
      '<strong>rotation: pushX * 0.15</strong> — ajoute une legere rotation proportionnelle au deplacement horizontal → les lettres "pivotent" en etant repoussees',
      '<strong>scale: 1 + force * 0.08</strong> — les lettres proches grossissent legerement (8% max), ajoutant de la profondeur a l\'effet',
      'L\'else remet x/y/rotation/scale a 0 quand la souris est hors du rayon → retour instantane (pas de transition ici car c\'est fait a chaque frame)',
    ]
  },

  // ─── 10. Transition de projets ───
  {
    icon: '🔄',
    title: 'Transition animee entre projets',
    explanation: `Dans la section projets du portfolio, quand on passe d'un projet a un autre (par scroll ou boutons), GSAP anime la sortie et l'entree du contenu.

Le pattern : on anime l'ancien contenu vers la gauche avec un fade-out, puis on injecte le nouveau contenu et on l'anime depuis la droite. gsap.fromTo() permet de definir a la fois l'etat de depart ET l'etat d'arrivee.`,
    code: `function showProjet(index) {
    if (index === currentProjetIndex) return;
    currentProjetIndex = index;

    // Progress bar
    const fill = ((index + 1) / projets.length * 100);
    progressFill.style.width = fill + '%';

    // Contenu texte : sort vers la gauche, entre depuis la droite
    gsap.to('.projet-info', {
        opacity: 0,
        x: -30,
        duration: 0.2,
        onComplete: () => {
            setProjet(index);  // injecte les nouvelles donnees
            gsap.fromTo('.projet-info',
                { opacity: 0, x: 30 },    // etat de depart
                { opacity: 1, x: 0, duration: 0.35 }  // etat final
            );
        }
    });

    // Image : fade out + shrink, puis fade in + grow
    gsap.to('#projetImage', {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        onComplete: () => {
            gsap.fromTo('#projetImage',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.35 }
            );
        }
    });
}

// Lie au scroll
ScrollTrigger.create({
    trigger: '#scrollSection9',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
        const idx = Math.min(
            Math.floor(self.progress * projets.length),
            projets.length - 1
        );
        showProjet(idx);
    }
});`,
    analysis: [
      '<strong>gsap.to() + onComplete</strong> — d\'abord on anime la sortie, puis dans le callback <code>onComplete</code>, on change le contenu et on anime l\'entree',
      '<strong>gsap.fromTo(target, fromVars, toVars)</strong> — definit EXPLICTEMENT l\'etat de depart ET l\'etat d\'arrivee. Sans fromTo, l\'etat de depart serait les props actuelles de l\'element',
      '<strong>x: -30 → x: 30 → x: 0</strong> — le texte sort vers la gauche (-30), le nouveau texte entre depuis la droite (+30) et atterrit a 0 → sensation de carrousel',
      '<strong>scale: 0.95</strong> — l\'image retrecit legerement avant de disparaitre, puis le nouveau projet revient a scale: 1 → effet de "zoom"',
      '<strong>duration sortie (0.2s) < duree entree (0.35s)</strong> — la sortie est plus rapide que l\'entree → sensation de reactivite (pas de latence a la sortie) mais douceur a l\'entree',
      '<strong>Math.floor(self.progress * projets.length)</strong> — map lineairement la progression du scroll (0→1) sur l\'index des projets. 5 projets = chacun a 20% du scroll total',
      '<strong>Math.min(..., length - 1)</strong> — securite : quand progress = 1.0, floor donnerait length (hors limites), donc on cap a length - 1',
      'Le <code>if (index === currentProjetIndex) return</code> evite de relancer l\'animation si on est deja sur le bon projet (optimisation)',
    ]
  },

  // ─── 11. Easing GSAP ───
  {
    icon: '📈',
    title: 'Les easing GSAP — Courbes d\'acceleration',
    explanation: `L'easing determine la "sensation" d'une animation. GSAP propose des dizaines de courbes :

• power1-4 : accelerations croissantes (.in = lent→rapide, .out = rapide→lent, .inOut = les deux)
• elastic : rebond elastique, comme un ressort
• bounce : rebond comme une balle
• back : depasse legerement la cible avant de revenir

Dans le portfolio, les easings les plus utilises :
• power2.out — deceleration naturelle (boutons, blob)
• power3.out — deceleration plus marquee (timeline)
• elastic.out(1, 0.4) — rebond elastique (retour boutons magnetiques)`,
    code: `// power2.out : deceleration naturelle
gsap.to(el, {
    x: 100,
    duration: 0.3,
    ease: 'power2.out'
});

// elastic.out : rebond comme un ressort
gsap.to(btn, {
    x: 0, y: 0,
    scaleX: 1, scaleY: 1,
    duration: 0.5,
    ease: 'elastic.out(1, 0.4)'
    // 1 = amplitude (hauteur des rebounds)
    // 0.4 = period (frequence, plus bas = plus de rebonds)
});

// power3.out : deceleration forte (timeline)
const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
});

// back.out : depasse legerement puis revient
gsap.to(el, {
    scale: 1,
    duration: 0.4,
    ease: 'back.out(1.7)'
    // 1.7 = overshoot (depassement, defaut = 1.7)
});

// Comparaison visuelle des courbes :
// linear     : ──────────── (constant)
// power1.out : ═══════───── (leger ralenti)
// power2.out : ════════──── (ralenti moyen)
// power3.out : ═════════─── (fort ralenti)
// power4.out : ══════════── (tres fort ralenti)
// elastic    : ═══╗╔╗╔═════ (rebonds)
// bounce     : ═══╦╦═══════ (rebonds durs)`,
    analysis: [
      '<strong>"power2.out"</strong> — la courbe la plus utilisee dans le portfolio. Le mouvement commence rapidement et ralentit doucement → sensation naturelle, comme un objet qui decelere',
      '<strong>.in / .out / .inOut</strong> — .in = acceleration, .out = deceleration, .inOut = acceleration puis deceleration',
      '<strong>"elastic.out(amplitude, period)"</strong> — simule un ressort. amplitude=1 = standard. period=0.4 = frequence moyenne. Baisser period → plus de rebonds, plus rapides',
      '<strong>"back.out(overshoot)"</strong> — l\'element depasse sa cible de <code>overshoot</code> puis revient. 1.7 = depassement par defaut. Bon pour les apparitions dynamiques',
      '<strong>Pourquoi "out" partout ?</strong> Dans les interactions utilisateur, on veut une reponse IMMEDIATE (debut rapide) qui se stabilise en douceur (fin lente) → .out est ideal',
      '<strong>defaults dans timeline</strong> — <code>defaults: { ease: "power3.out" }</code> applique l\'ease a TOUTES les animations de la timeline. Chaque .to() peut quand meme surcharger avec son propre ease',
      'GSAP propose aussi <code>CustomEase</code> et <code>CustomWiggle</code> pour creer ses propres courbes via SVG path',
    ]
  },

  // ─── 12. Scroll horizontal (Marquee infini CSS + GSAP reveal) ───
  {
    icon: '↔️',
    title: 'Scroll horizontal — Marquee infini + Reveal GSAP',
    explanation: `Le portfolio utilise un scroll horizontal infini (marquee) pour afficher les technologies maitrisees. Deux rangees defilent en sens oppose : la premiere vers la gauche, la seconde vers la droite.

Le defilement est fait en CSS pur avec @keyframes et translateX(-50%) — on duplique le contenu pour creer la boucle infinie. GSAP intervient pour le scroll-reveal : les rangees n'apparaissent qu'en scrollant (Phase 7), avec un decalage stagger entre le titre, la rangee 1 et la rangee 2.

Le hover met en pause l'animation (animation-play-state: paused) pour laisser l'utilisateur lire.`,
    code: `/* ===== CSS : Marquee infini ===== */

/* Conteneur : cache le debordement */
.marquee-wrapper {
    width: 100%;
    overflow: hidden;
    opacity: 0;              /* cache par defaut, GSAP revelera */
}

/* Piste qui defile : flex row, largeur auto */
.marquee-track {
    display: flex;
    gap: 32px;
    width: max-content;      /* prend la largeur de tout le contenu */
    animation: marquee-scroll 25s linear infinite;
}
.marquee-track:hover {
    animation-play-state: paused;   /* pause au survol */
}

/* L'animation : de 0 a -50% (car le contenu est duplique) */
@keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

/* 2e rangee : direction inverse, vitesse differente */
.marquee-track-reverse {
    display: flex;
    gap: 32px;
    width: max-content;
    animation: marquee-scroll-reverse 30s linear infinite;
    margin-top: 24px;
}
@keyframes marquee-scroll-reverse {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
}`,
    codeLabel: 'css',
    analysis: [
      '<strong>overflow: hidden</strong> — le wrapper cache tout ce qui depasse → on ne voit que la "fenetre" visible du defilement',
      '<strong>width: max-content</strong> — la piste prend la largeur totale de TOUS ses enfants, meme si ca depasse l\'ecran. C\'est ce qui permet le defilement',
      '<strong>translateX(-50%)</strong> — on deplace la piste de la moitie de sa largeur. Comme le contenu est duplique (2 copies identiques), quand on atteint -50%, on retrouve exactement le meme visuel qu\'a 0% → boucle infinie parfaite',
      '<strong>animation: linear infinite</strong> — <code>linear</code> = vitesse constante (pas d\'acceleration), <code>infinite</code> = boucle sans fin',
      '<strong>25s vs 30s</strong> — la 2e rangee defile plus lentement (30s) que la 1ere (25s), ce qui cree un effet de parallaxe subtil entre les deux rangees',
      '<strong>animation-play-state: paused</strong> — au survol (:hover), l\'animation se fige pour permettre la lecture. Le navigateur reprend exactement la ou il s\'etait arrete',
      '<strong>Duplication du contenu</strong> — dans le HTML, chaque item est present 2 fois dans la piste. C\'est obligatoire pour que le saut de -50% a 0% soit invisible',
    ]
  },

  // ─── 13. Stagger Scroll-Reveal (elements en cascade) ───
  {
    icon: '🌊',
    title: 'Stagger Scroll-Reveal — Cascade au scroll',
    explanation: `Un pattern puissant : reveler plusieurs elements en cascade lie au scroll, chacun avec sa propre fenetre de progression.

Dans la section "Stacks" du portfolio, 3 elements apparaissent en cascade au scroll :
1. Le titre (0→40% du scroll) : monte de 60px avec fade-in
2. La rangee marquee 1 (30→70%) : glisse depuis la droite
3. La rangee marquee 2 (50→90%) : glisse depuis la gauche

Les fenetres se chevauchent, creant un effet de vague fluide.`,
    code: `// Phase 7 : Content scroll-reveal en cascade
ScrollTrigger.create({
    trigger: '#scrollSection7',
    start: 'top bottom',
    end: 'center center',
    scrub: 0.8,            // lissage plus doux (0.8s)
    onUpdate: (self) => {
        const progress = self.progress;   // 0 → 1

        // Phase A (0 → 0.4) : Titre monte depuis le bas
        const titleProgress = Math.min(1, progress / 0.4);
        gsap.set(stacksTitle, {
            opacity: titleProgress,
            y: (1 - titleProgress) * 60
        });

        // Phase B (0.3 → 0.7) : Rangee 1 glisse depuis la droite
        const row1Progress = Math.max(0,
            Math.min(1, (progress - 0.3) / 0.4)
        );
        gsap.set(marqueeRow1, {
            opacity: row1Progress,
            x: (1 - row1Progress) * 120
        });

        // Phase C (0.5 → 0.9) : Rangee 2 glisse depuis la gauche
        const row2Progress = Math.max(0,
            Math.min(1, (progress - 0.5) / 0.4)
        );
        gsap.set(marqueeRow2, {
            opacity: row2Progress,
            x: (1 - row2Progress) * -120
        });
    },
    onLeaveBack: () => {
        gsap.set(stacksTitle, { opacity: 0, y: 60 });
        gsap.set(marqueeRow1, { opacity: 0, x: 120 });
        gsap.set(marqueeRow2, { opacity: 0, x: -120 });
    }
});`,
    analysis: [
      '<strong>Fenetres decalees</strong> — chaque element a sa propre plage : titre [0, 0.4], rangee1 [0.3, 0.7], rangee2 [0.5, 0.9]. Les chevauchements creent la cascade',
      '<strong>Math.min(1, progress / 0.4)</strong> — normalise la progression de [0, 0.4] vers [0, 1]. Quand progress=0.2, titleProgress=0.5 (50%)',
      '<strong>(progress - 0.3) / 0.4</strong> — decale le debut : rien avant 0.3, puis normalise de [0.3, 0.7] vers [0, 1]',
      '<strong>y: (1 - titleProgress) * 60</strong> — a progress=0, y=60px (en bas). A progress=1, y=0 (position finale). Mouvement ascendant',
      '<strong>x: (1 - row1Progress) * 120</strong> — rangee 1 entre depuis +120px (droite). <code>* -120</code> pour la rangee 2 = depuis la gauche. Effet oppose → visuellement dynamique',
      '<strong>scrub: 0.8</strong> — smoothing plus important (0.8s) que les autres sections (0.5s). Le reveal en cascade est plus fluide avec plus de lissage',
      '<strong>onLeaveBack</strong> — quand l\'utilisateur scroll vers le haut et depasse le start, on reinitialise tout : opacite a 0, positions de depart. Essentiel pour que l\'animation soit rejouable',
      'Ce pattern est reutilisable pour tout type de section : hero, features, pricing cards... Il suffit de definir les fenetres [start, end] de chaque element',
    ]
  },

  // ─── 14. gsap.fromTo() — Animation bidirectionnelle ───
  {
    icon: '🔃',
    title: 'gsap.fromTo() — Depart ET arrivee explicites',
    explanation: `gsap.fromTo() definit a la fois l'etat de DEPART et l'etat D'ARRIVEE d'une animation. Contrairement a gsap.to() qui part de l'etat actuel, fromTo() force un etat de depart precis.

C'est indispensable quand on ne connait pas l'etat actuel de l'element (par exemple apres un changement de contenu dans un callback onComplete).

Dans le portfolio, fromTo() est utilise pour les transitions de projets : le nouveau contenu entre TOUJOURS depuis la droite, peu importe son etat CSS actuel.`,
    code: `// Transition de projet : sortie → changement → entree
gsap.to('.projet-info', {
    opacity: 0,
    x: -30,
    duration: 0.2,
    onComplete: () => {
        setProjet(index);    // change le contenu dans le DOM

        // fromTo : depart explicite (opacity:0, x:30)
        //          arrivee explicite (opacity:1, x:0)
        gsap.fromTo('.projet-info',
            { opacity: 0, x: 30 },      // FROM
            { opacity: 1, x: 0, duration: 0.35 }  // TO
        );
    }
});

// Comparaison des 3 methodes :
// gsap.set(el, { x: 100 })               → instantane
// gsap.to(el, { x: 100 })                → anime de l'etat ACTUEL vers x:100
// gsap.from(el, { x: 100 })              → anime DE x:100 vers l'etat ACTUEL
// gsap.fromTo(el, { x: 100 }, { x: 0 })  → anime DE x:100 vers x:0

// gsap.from() — animation inverse
gsap.from('.card', {
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.1
});
// Chaque .card part de (opacity:0, y:50) et anime
// vers son etat CSS actuel. Utile pour les apparitions.`,
    analysis: [
      '<strong>gsap.fromTo(target, fromVars, toVars)</strong> — 3 arguments : cible, proprietes de depart, proprietes d\'arrivee',
      '<strong>Pourquoi pas juste gsap.to() ?</strong> Apres <code>setProjet()</code>, l\'element a des styles inconnus (l\'animation de sortie l\'a mis a opacity:0, x:-30). <code>fromTo()</code> force un point de depart propre',
      '<strong>gsap.from()</strong> — l\'inverse de to(). Anime DEPUIS les valeurs donnees vers l\'etat CSS actuel. Ideal pour les apparitions : on definit juste d\'ou ca vient',
      '<strong>from + stagger</strong> — combinaison tres courante. <code>stagger: 0.1</code> avec <code>from</code> → chaque carte apparait 0.1s apres la precedente, toutes depuis le meme offset',
      '<strong>onComplete callback</strong> — le changement de contenu (<code>setProjet()</code>) se fait ENTRE la sortie et l\'entree. C\'est le callback <code>onComplete</code> de la sortie qui declenche l\'entree',
      '<strong>set vs from vs to vs fromTo</strong> — 4 niveaux : instantane, animation depuis actuel, animation vers actuel, animation complete avec depart et arrivee',
    ]
  },

  // ─── 15. WebGL + GSAP — Deformation d'image ───
  {
    icon: '🖼️',
    title: 'WebGL + GSAP — Deformation d\'image au survol',
    explanation: `Le portfolio utilise WebGL (shaders GLSL) pour deformer les images de projet au survol. GSAP coordonne le suivi de la souris avec un lerp, et le shader applique un effet de distorsion basee sur la velocite.

Le principe : une texture (l'image) est rendue sur un canvas WebGL. Dans le fragment shader, la position UV de chaque pixel est decalee proportionnellement a la distance et vitesse de la souris → effet de "vague" organique.

GSAP n'anime pas directement les pixels — il interpole les coordonnees de la souris (mouse smoothing) qui sont passees au shader comme uniforms.`,
    code: `class WebGLImageDeform {
    constructor(container) {
        this.canvas = document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl');
        this.mouse = { x: 0.5, y: 0.5 };
        this.targetMouse = { x: 0.5, y: 0.5 };
        this.velocity = { x: 0, y: 0 };
        // ...setup shaders, load texture...
    }

    // Vertex Shader : positionne les pixels
    vertexShader = \`
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
            vUv = position * 0.5 + 0.5;  // [-1,1] → [0,1]
            gl_Position = vec4(position, 0.0, 1.0);
        }
    \`;

    // Fragment Shader : deforme l'image
    fragmentShader = \`
        precision mediump float;
        uniform sampler2D uTexture;
        uniform vec2 uMouse;       // position souris [0,1]
        uniform vec2 uVelocity;    // vitesse souris
        varying vec2 vUv;

        void main() {
            vec2 uv = vUv;

            // Distance souris → pixel
            float dist = distance(uv, uMouse);
            float strength = smoothstep(0.5, 0.0, dist);

            // Deformation proportionnelle a la vitesse
            uv += uVelocity * strength * 0.15;

            gl_FragColor = texture2D(uTexture, uv);
        }
    \`;

    // GSAP ticker pour le lerp souris → shader
    animate() {
        gsap.ticker.add(() => {
            // Interpolation douce
            this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
            this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;

            // Vitesse = delta entre frames
            this.velocity.x = this.targetMouse.x - this.mouse.x;
            this.velocity.y = this.targetMouse.y - this.mouse.y;

            // Envoyer au shader
            gl.uniform2f(uMouseLoc, this.mouse.x, this.mouse.y);
            gl.uniform2f(uVelocityLoc, this.velocity.x, this.velocity.y);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        });
    }
}`,
    analysis: [
      '<strong>WebGL</strong> — API bas niveau pour le rendu GPU dans un &lt;canvas&gt;. Beaucoup plus performant que le CSS pour les deformations pixel par pixel',
      '<strong>Vertex Shader</strong> — s\'execute pour chaque sommet (4 coins du rectangle). Transforme les coordonnees de [-1,1] vers [0,1] pour le mapping texture (UV)',
      '<strong>Fragment Shader</strong> — s\'execute pour CHAQUE PIXEL de l\'image. C\'est ici que la deformation se produit',
      '<strong>uniform</strong> — variable passee de JavaScript vers le shader. Mise a jour a chaque frame par GSAP : position et vitesse de la souris',
      '<strong>smoothstep(0.5, 0.0, dist)</strong> — fonction GLSL qui interpole de 1 (quand dist=0, souris sur le pixel) a 0 (quand dist>=0.5, loin de la souris). Gradient doux',
      '<strong>uv += uVelocity * strength * 0.15</strong> — chaque pixel est decale proportionnellement a la vitesse de la souris ET a sa proximite. Plus pres = plus deforme, plus vite = plus deforme',
      '<strong>GSAP ticker + lerp</strong> — meme pattern que le cursor blob ! Le mouse smoothing (0.1 lerp) evite les saccades et le shader recoit des coordonnees fluides',
      '<strong>texture2D(uTexture, uv)</strong> — lit la couleur du pixel aux coordonnees UV (deformees). Le resultat : l\'image semble onduler autour de la souris',
    ]
  },
]
</script>

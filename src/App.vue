<template>
  <div :class="(screen === 'tutorial' || screen === 'tutoAnimation') ? '' : 'max-w-5xl mx-auto px-4 py-4 sm:py-8'">

    <!-- ============ ECRAN 1 : Accueil ============ -->
    <div v-if="screen === 'home'" class="rise">
      <!-- En-tete -->
      <header class="relative overflow-hidden rounded-3xl bg-ink text-paper px-5 sm:px-10 py-8 sm:py-12 mb-8">
        <div class="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-brand/40 blur-3xl"></div>
        <div class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-brand via-brand to-sun"></div>
        <div class="relative">
          <span class="inline-block text-[11px] font-bold tracking-[.2em] uppercase bg-sun text-ink px-3 py-1 rounded-full mb-4">Révise · Pratique · Progresse</span>
          <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[.95]">Quiz <span class="text-sun">App</span></h1>
          <p class="text-paper/70 mt-3 text-sm sm:text-base max-w-md">Cours et quiz pour apprendre l'API Sophia GO, Linux, Oracle et Python.</p>
          <div class="grid grid-cols-3 gap-2 sm:gap-4 mt-6 max-w-lg">
            <div class="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <div class="text-2xl sm:text-3xl font-extrabold">{{ totals.modules }}</div>
              <div class="text-[11px] uppercase tracking-wider text-paper/60">modules</div>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <div class="text-2xl sm:text-3xl font-extrabold">{{ totals.done }}<span class="text-paper/40 text-lg">/{{ totals.quizzes }}</span></div>
              <div class="text-[11px] uppercase tracking-wider text-paper/60">quiz faits</div>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <div class="text-2xl sm:text-3xl font-extrabold text-sun">{{ totals.pct }}%</div>
              <div class="text-[11px] uppercase tracking-wider text-paper/60">progression</div>
            </div>
          </div>
        </div>
      </header>

      <!-- Groupes -->
      <section v-for="g in groups" :key="g.name" class="mb-4 bg-white border border-line rounded-3xl overflow-hidden">
        <!-- En-tete du groupe : clic pour deplier / replier -->
        <button @click="toggleGroup(g.name)" :aria-expanded="isOpen(g.name)"
          class="w-full flex items-center gap-3 sm:gap-4 text-left p-4 sm:p-5 cursor-pointer hover:bg-paper/60 transition">
          <span class="flex -space-x-3 shrink-0">
            <span v-for="c in g.items.slice(0, 3)" :key="c.id" class="w-10 h-10 rounded-xl bg-paper border-2 border-white grid place-items-center">
              <img v-if="c.iconUrl" :src="c.iconUrl" alt="" class="w-5 h-5" /><template v-else>{{ c.icon }}</template>
            </span>
          </span>
          <span class="flex-1 min-w-0">
            <span class="block text-lg sm:text-xl font-extrabold tracking-tight leading-tight">{{ g.name }}</span>
            <span class="block text-xs text-muted mt-0.5">{{ g.items.length }} modules · {{ groupPct(g) }} % fait</span>
            <span class="block h-1 bg-paper rounded-full overflow-hidden mt-2 max-w-48">
              <span class="block h-full bg-brand rounded-full transition-all duration-500" :style="{ width: groupPct(g) + '%' }"></span>
            </span>
          </span>
          <svg class="w-6 h-6 text-muted shrink-0 transition-transform duration-300" :class="isOpen(g.name) ? 'rotate-180 text-brand' : ''" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </button>
        <div v-if="isOpen(g.name)" class="rise grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-5 pb-4 sm:pb-5">
          <button
            v-for="cat in g.items" :key="cat.id"
            @click="selectCategory(cat)"
            class="group text-left bg-paper/50 border border-line rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_12px_30px_-12px_rgba(0,133,63,.45)]"
          >
            <div class="flex items-start gap-3">
              <span class="shrink-0 w-11 h-11 rounded-xl bg-white group-hover:bg-brand/10 grid place-items-center text-2xl transition"><img v-if="cat.iconUrl" :src="cat.iconUrl" alt="" class="w-7 h-7" /><template v-else>{{ cat.icon }}</template></span>
              <div class="min-w-0 flex-1">
                <div class="font-bold text-ink leading-tight">{{ cat.name }}</div>
                <div class="text-xs text-muted mt-1">
                  {{ cat.type === 'tutorial' ? 'Tutoriel pas à pas' : (cat.courseFile ? 'Cours + ' : '') + cat.quizzes.length + ' quiz' }}
                </div>
              </div>
              <svg class="w-5 h-5 text-line group-hover:text-brand group-hover:translate-x-0.5 transition" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </div>
            <div v-if="cat.quizzes && cat.quizzes.length" class="mt-3">
              <div class="h-1.5 bg-paper rounded-full overflow-hidden">
                <div class="h-full rounded-full bg-brand transition-all duration-500" :style="{ width: catPct(cat) + '%' }"></div>
              </div>
              <div class="text-[11px] text-muted mt-1.5">{{ catPct(cat) === 100 ? '✓ Terminé' : catPct(cat) + ' % fait' }}</div>
            </div>
          </button>
        </div>
      </section>

      <!-- Carte de l'API Netwo (page statique de reference) -->
      <a href="netwo-carte.html"
        class="w-full flex items-center gap-4 text-left rounded-2xl bg-white border-2 border-brand p-5 sm:p-6 mt-6 mb-4 no-underline text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span class="w-12 h-12 rounded-xl bg-brand/10 grid place-items-center shrink-0"><img :src="'icons/n-bases.svg'" alt="" class="w-7 h-7" /></span>
        <span class="flex-1">
          <span class="block text-[11px] font-bold uppercase tracking-wider text-brand">Référence de développement</span>
          <span class="block font-bold text-lg">Carte de l'API Netwo</span>
          <span class="block text-xs text-muted">Acteurs, 93 routes par partie, parcours types</span>
        </span>
        <svg class="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </a>

      <!-- Tuto GSAP -->
      <button
        @click="screen = 'tutoAnimation'"
        class="w-full flex items-center gap-4 text-left rounded-2xl bg-night text-paper p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <span class="w-12 h-12 rounded-xl bg-sun grid place-items-center shrink-0"><img :src="'icons/gsap.svg'" alt="GSAP" class="w-7 h-7" /></span>
        <span class="flex-1">
          <span class="block font-bold text-lg">Animations GSAP</span>
          <span class="block text-xs text-paper/60">Documentation portfolio</span>
        </span>
        <svg class="w-5 h-5 text-sun" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>

      <!-- Compteur en ligne temps reel -->
      <div class="mt-8 text-center">
        <button @click="showAdmin" class="inline-flex items-center gap-2 text-xs text-muted hover:text-brand transition cursor-pointer">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          {{ deviceCount }} en ligne
        </button>
      </div>
    </div>

    <!-- ============ ECRAN 2 : Une categorie ============ -->
    <div v-if="screen === 'category'" class="rise">
      <button @click="screen = 'home'" :class="backBtn">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Accueil
      </button>

      <div class="relative overflow-hidden rounded-3xl bg-ink text-paper p-6 sm:p-8 mb-6">
        <div class="absolute -bottom-24 -right-10 w-72 h-72 rounded-full bg-brand/40 blur-3xl"></div>
        <div class="relative flex items-center gap-4">
          <span class="w-16 h-16 rounded-2xl bg-white/10 grid place-items-center text-4xl shrink-0"><img v-if="selectedCat.iconUrl" :src="selectedCat.iconUrl" alt="" class="w-9 h-9 brightness-0 invert" /><template v-else>{{ selectedCat.icon }}</template></span>
          <div>
            <div class="text-[11px] font-bold tracking-[.2em] uppercase text-sun">{{ selectedCat.group }}</div>
            <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">{{ selectedCat.name }}</h1>
          </div>
        </div>
        <div v-if="catProgress.total > 0" class="relative mt-6">
          <div class="h-2 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-sun rounded-full transition-all duration-500" :style="{ width: catProgress.pct + '%' }"></div>
          </div>
          <div class="text-xs text-paper/60 mt-2">{{ catProgress.done }} / {{ catProgress.total }} quiz faits</div>
        </div>
      </div>

      <!-- Video du module -->
      <div v-if="selectedCat.videoFile" class="mb-4 rounded-2xl overflow-hidden bg-ink border border-line">
        <video v-if="showVideo" :src="selectedCat.videoFile" controls autoplay playsinline class="w-full aspect-video bg-ink"></video>
        <button v-else @click="showVideo = true" class="w-full flex items-center gap-4 text-left p-4 sm:p-5 text-paper cursor-pointer hover:bg-night transition">
          <span class="w-12 h-12 rounded-full bg-sun text-ink grid place-items-center shrink-0">
            <svg class="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z"/></svg>
          </span>
          <span class="flex-1">
            <span class="block text-[11px] font-bold uppercase tracking-wider text-sun">Vidéo</span>
            <span class="block font-bold text-lg">Regarder l'explication en vidéo</span>
          </span>
        </button>
      </div>

      <!-- Etape 1 : cours -->
      <button v-if="selectedCat.courseFile" @click="loadCourse"
        class="w-full flex items-center gap-4 text-left bg-white border-2 border-brand rounded-2xl p-4 sm:p-5 mb-4 cursor-pointer transition hover:bg-brand/5 hover:-translate-y-0.5">
        <span class="w-12 h-12 rounded-xl bg-brand text-white grid place-items-center shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
        </span>
        <span class="flex-1">
          <span class="block text-[11px] font-bold uppercase tracking-wider text-brand">Étape 1</span>
          <span class="block font-bold text-lg">Lire le cours</span>
        </span>
        <svg class="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>

      <!-- Etape 2 : quiz -->
      <div class="text-[11px] font-bold uppercase tracking-wider text-muted mb-2 px-1">{{ selectedCat.courseFile ? 'Étape 2 · ' : '' }}S'entraîner</div>
      <div class="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          v-for="q in selectedCat.quizzes" :key="q.id"
          @click="loadQuiz(q)"
          class="flex flex-col items-start text-left p-4 rounded-2xl border bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-lg"
          :class="getScore(q.id) !== null ? 'border-brand/50' : 'border-line'"
        >
          <span class="w-10 h-10 rounded-xl bg-paper grid place-items-center text-xl mb-2"><img v-if="selectedCat.iconUrl && selectedCat.group !== 'Informatique'" :src="selectedCat.iconUrl" alt="" class="w-6 h-6" /><template v-else>{{ q.icon }}</template></span>
          <span class="text-sm font-bold leading-snug">{{ q.title }}</span>
          <span class="text-xs text-muted mt-0.5">{{ q.questions }} questions</span>
          <span v-if="getScore(q.id) !== null" class="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand bg-brand/10 px-2 py-1 rounded-full">
            ★ Meilleur : {{ getScore(q.id) }} / {{ q.questions }}
          </span>
          <span v-else class="mt-3 text-xs font-semibold text-ink bg-sun px-2 py-1 rounded-full">Commencer</span>
        </button>
      </div>
    </div>

    <!-- ============ ECRAN 3 : Mini-cours ============ -->
    <div v-if="screen === 'course'">
      <CoursePage :course="courseData" @back="screen = 'category'" />
    </div>

    <!-- ============ ECRAN 3b : Tutoriel (type tutorial) ============ -->
    <div v-if="screen === 'tutorial'">
      <TutorialPage :course="courseData" @back="screen = 'home'" />
    </div>

    <!-- ============ ECRAN : Tuto Animations GSAP ============ -->
    <div v-if="screen === 'tutoAnimation'">
      <TutoAnimation @back="screen = 'home'" />
    </div>

    <!-- ============ ECRAN 4 : Quiz en cours ============ -->
    <div v-if="screen === 'quiz' && quizData">
      <button @click="screen = 'category'" :class="backBtn">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        {{ selectedCat ? selectedCat.name : 'Retour' }}
      </button>
      <Quiz :quiz="quizData" :key="quizKey" @finished="onQuizFinished" />
    </div>

    <!-- ============ Erreur ============ -->
    <div v-if="screen === 'error'" class="text-center mt-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
      <p class="text-gray-600 mb-4">Impossible de charger les donnees.</p>
      <button @click="screen = 'home'" class="bg-gray-100 hover:bg-gray-200 border border-gray-200 px-5 py-2 rounded-lg text-sm text-gray-600 transition cursor-pointer">Retour au menu</button>
    </div>

    <!-- ============ ECRAN 6 : Admin - Appareils en ligne (temps reel) ============ -->
    <div v-if="screen === 'admin'" class="mt-4">
      <button @click="screen = 'home'" :class="backBtn">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Retour
      </button>

      <div class="text-center mb-6">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900">Appareils en ligne</h1>
        </div>
        <p class="text-green-600 font-bold text-lg">{{ onlineDevices.length }} appareil{{ onlineDevices.length > 1 ? 's' : '' }} en temps reel</p>
        <p class="text-xs text-gray-400 mt-1">Mise a jour automatique</p>
      </div>

      <div class="flex flex-col gap-3">
        <div v-for="d in onlineDevices" :key="d.device_id" class="bg-white border border-green-200 rounded-xl p-3 sm:p-4 shadow-sm flex items-center gap-3 transition-all duration-300">
          <!-- Pulsing green dot -->
          <span class="relative flex h-2.5 w-2.5 shrink-0">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <!-- Device icon -->
          <div class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg" :class="d.device_type === 'Mobile' ? 'bg-blue-100 text-blue-600' : d.device_type === 'Tablette' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'">
            {{ d.device_type === 'Mobile' ? '📱' : d.device_type === 'Tablette' ? '📲' : '💻' }}
          </div>
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="text-sm font-bold text-gray-800">{{ d.device_type }} — {{ d.os }}</div>
            <div class="text-xs text-gray-400 truncate">{{ d.browser }} · {{ d.screen_size }} · {{ d.language }}</div>
            <div class="text-xs text-green-500 mt-0.5 font-medium">En ligne depuis {{ timeSince(d.online_since) }}</div>
          </div>
          <!-- Current page badge -->
          <div class="shrink-0 hidden sm:block">
            <span class="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-medium">
              {{ pageLabel(d.current_page) }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="onlineDevices.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
        <p class="text-gray-400">Aucun appareil en ligne</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
import Quiz from './components/quiz.vue';
import CoursePage from './components/CoursePage.vue';
import TutorialPage from './components/TutorialPage.vue';
import TutoAnimation from './components/TutoAnimation.vue';
import { registerDevice, startPresence, updatePresencePage, stopPresence } from './tracker.js';

const screen = ref('home');
const categories = ref([]);
const selectedCat = ref(null);
const quizData = ref(null);
const quizKey = ref(0);
const courseData = ref(null);
const currentQuizMeta = ref(null);
const progressVersion = ref(0);   // compteur reactif pour forcer le recalcul

// Tracking temps reel
const onlineDevices = ref([]);
const deviceCount = computed(() => onlineDevices.value.length);
const tick = ref(0);
let tickInterval = null;

const STORAGE_KEY = 'quiz-app-progress';
const showVideo = ref(false);

const backBtn = 'inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink bg-white border border-line hover:border-brand px-4 py-2 rounded-full transition mb-5 cursor-pointer';

// Categories regroupees pour l'accueil
const groups = computed(() => {
  const map = new Map();
  for (const c of categories.value) {
    const g = c.group || 'Autres';
    if (!map.has(g)) map.set(g, []);
    map.get(g).push(c);
  }
  return [...map].map(([name, items]) => ({ name, items }));
});

// Groupes depliables sur l'accueil (etat memorise dans le navigateur)
const OPEN_KEY = 'quiz-app-open-groups';
const openGroups = ref((() => {
  try { return JSON.parse(localStorage.getItem(OPEN_KEY)) || []; } catch { return []; }
})());
const isOpen = (name) => openGroups.value.includes(name);
const toggleGroup = (name) => {
  openGroups.value = isOpen(name) ? openGroups.value.filter(n => n !== name) : [...openGroups.value, name];
  try { localStorage.setItem(OPEN_KEY, JSON.stringify(openGroups.value)); } catch {}
};
const groupPct = (g) => {
  progressVersion.value;
  const qs = g.items.flatMap(c => c.quizzes || []);
  if (!qs.length) return 0;
  const p = loadProgress();
  return Math.round(qs.filter(q => p[q.id] !== undefined).length / qs.length * 100);
};

const catPct = (cat) => {
  progressVersion.value;
  const qs = cat.quizzes || [];
  if (!qs.length) return 0;
  const p = loadProgress();
  return Math.round(qs.filter(q => p[q.id] !== undefined).length / qs.length * 100);
};

const totals = computed(() => {
  progressVersion.value;
  const p = loadProgress();
  const all = categories.value.flatMap(c => c.quizzes || []);
  const done = all.filter(q => p[q.id] !== undefined).length;
  return { modules: categories.value.length, quizzes: all.length, done, pct: all.length ? Math.round(done / all.length * 100) : 0 };
});

const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
};

const saveScore = (quizId, score) => {
  const progress = loadProgress();
  const prev = progress[quizId];
  if (prev === undefined || prev === null || score > prev) {
    progress[quizId] = score;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  progressVersion.value++;   // declenche le recalcul des computed
};

const getScore = (quizId) => {
  progressVersion.value;     // abonnement reactif
  const progress = loadProgress();
  return progress[quizId] !== undefined ? progress[quizId] : null;
};

const catProgress = computed(() => {
  progressVersion.value;     // abonnement reactif
  if (!selectedCat.value) return { done: 0, total: 0, pct: 0 };
  const quizzes = selectedCat.value.quizzes;
  const total = quizzes.length;
  const done = quizzes.filter(q => {
    const p = loadProgress();
    return p[q.id] !== undefined;
  }).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
});

onMounted(() => {
  fetch('quizzes.json', { cache: 'no-cache' })
    .then(r => r.json())
    .then(data => { categories.value = data.categories; })
    .catch(() => { screen.value = 'error'; });

  // Enregistrer + Presence temps reel
  registerDevice();
  startPresence(devices => { onlineDevices.value = devices; });
  tickInterval = setInterval(() => tick.value++, 30000);
});

watch(screen, (val) => {
  updatePresencePage(val);
});

onUnmounted(() => {
  clearInterval(tickInterval);
  stopPresence();
});

const showAdmin = () => {
  screen.value = 'admin';
};

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const timeSince = (isoStr) => {
  tick.value;
  if (!isoStr) return '';
  const diff = Math.floor((Date.now() - new Date(isoStr).getTime()) / 1000);
  if (diff < 60) return "moins d'1 min";
  if (diff < 3600) return Math.floor(diff / 60) + ' min';
  return Math.floor(diff / 3600) + 'h ' + Math.floor((diff % 3600) / 60) + 'min';
};

const pageLabel = (page) => {
  const labels = { home: 'Accueil', category: 'Categories', tutorial: 'Tutoriel', quiz: 'Quiz', course: 'Mini-cours', admin: 'Admin' };
  return labels[page] || page || 'Accueil';
};

const selectCategory = (cat) => {
  if (cat.type === 'tutorial') {
    // Ouvrir directement le tutoriel
    fetch(cat.tutorialFile, { cache: 'no-cache' })
      .then(r => { if (r.ok) return r.json(); throw new Error(); })
      .then(data => { courseData.value = data; screen.value = 'tutorial'; })
      .catch(() => { screen.value = 'error'; });
    return;
  }
  selectedCat.value = cat;
  showVideo.value = false;
  screen.value = 'category';
};

const loadQuiz = (quizMeta) => {
  currentQuizMeta.value = quizMeta;
  fetch(quizMeta.file, { cache: 'no-cache' })
    .then(r => { if (r.ok) return r.json(); throw new Error(); })
    .then(data => { quizData.value = data; quizKey.value++; screen.value = 'quiz'; })
    .catch(() => { screen.value = 'error'; });
};

const loadCourse = () => {
  fetch(selectedCat.value.courseFile, { cache: 'no-cache' })
    .then(r => { if (r.ok) return r.json(); throw new Error(); })
    .then(data => { courseData.value = data; screen.value = 'course'; })
    .catch(() => { screen.value = 'error'; });
};

const onQuizFinished = (score) => {
  if (currentQuizMeta.value) saveScore(currentQuizMeta.value.id, score);
};
</script>
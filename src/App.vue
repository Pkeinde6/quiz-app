<template>
  <div class="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 font-[Inter]">

    <!-- ============ ECRAN 1 : Choix de la categorie ============ -->
    <div v-if="screen === 'home'" class="mt-4">
      <h1 class="text-center text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1">Quiz App</h1>
      <p class="text-center text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">Choisis ta matiere</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="group flex flex-col items-center justify-center py-6 sm:py-10 px-4 sm:px-6 rounded-2xl border-3 cursor-pointer transition-all duration-300 shadow-md hover:-translate-y-1.5 hover:shadow-xl"
          :style="{ background: cat.color, borderColor: cat.borderColor }"
          @click="selectCategory(cat)"
        >
          <span class="text-3xl sm:text-5xl mb-2">{{ cat.icon }}</span>
          <span class="text-lg sm:text-xl font-extrabold text-gray-800">{{ cat.name }}</span>
          <span class="text-sm text-gray-600 mt-1">{{ cat.quizzes.length }} quiz</span>
        </button>
      </div>
    </div>

    <!-- ============ ECRAN 2 : Liste des quiz d'une categorie ============ -->
    <div v-if="screen === 'category'" class="mt-4">
      <!-- Bouton retour -->
      <button @click="screen = 'home'" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 py-2 rounded-lg transition mb-6 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Retour
      </button>

      <h1 class="text-center text-xl sm:text-3xl font-extrabold text-gray-900 mb-2">{{ selectedCat.icon }} {{ selectedCat.name }}</h1>

      <!-- Bouton mini-cours -->
      <div class="text-center my-5">
        <button @click="loadCourse" class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-sm sm:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
          Mini-cours {{ selectedCat.name }}
        </button>
      </div>

      <!-- Progression globale -->
      <div v-if="catProgress.total > 0" class="mb-4 text-center">
        <div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
          <div class="h-full bg-gradient-to-r from-green-500 to-lime-400 rounded-full transition-all duration-500" :style="{ width: catProgress.pct + '%' }"></div>
        </div>
        <span class="text-sm text-gray-500 font-semibold">{{ catProgress.done }} / {{ catProgress.total }} quiz termines</span>
      </div>

      <div class="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
        <button
          v-for="q in selectedCat.quizzes"
          :key="q.id"
          class="flex flex-col items-center justify-center py-4 sm:py-5 px-2 sm:px-3 rounded-xl border-2 bg-white cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg"
          :class="getScore(q.id) !== null ? 'border-green-400 bg-green-50' : 'border-gray-200'"
          @click="loadQuiz(q)"
        >
          <span class="text-2xl sm:text-3xl mb-1.5">{{ q.icon }}</span>
          <span class="text-xs sm:text-sm font-bold text-gray-800 text-center mb-0.5">{{ q.title }}</span>
          <span class="text-xs text-gray-400">{{ q.questions }} questions</span>
          <span v-if="getScore(q.id) !== null" class="flex items-center gap-1 text-xs font-bold text-green-600 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            {{ getScore(q.id) }} / {{ q.questions }}
          </span>
        </button>
      </div>
    </div>

    <!-- ============ ECRAN 3 : Mini-cours ============ -->
    <div v-if="screen === 'course'">
      <CoursePage :course="courseData" @back="screen = 'category'" />
    </div>

    <!-- ============ ECRAN 4 : Quiz en cours ============ -->
    <div v-if="screen === 'quiz' && quizData">
      <button @click="screen = 'category'" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 py-2 rounded-lg transition mb-4 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Retour aux quiz
      </button>
      <Quiz :quiz="quizData" :key="quizKey" @finished="onQuizFinished" />
    </div>

    <!-- ============ Erreur ============ -->
    <div v-if="screen === 'error'" class="text-center mt-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
      <p class="text-gray-600 mb-4">Impossible de charger les donnees.</p>
      <button @click="screen = 'home'" class="bg-gray-100 hover:bg-gray-200 border border-gray-200 px-5 py-2 rounded-lg text-sm text-gray-600 transition cursor-pointer">Retour au menu</button>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, computed } from 'vue';
import Quiz from './components/quiz.vue';
import CoursePage from './components/CoursePage.vue';

const screen = ref('home');
const categories = ref([]);
const selectedCat = ref(null);
const quizData = ref(null);
const quizKey = ref(0);
const courseData = ref(null);
const currentQuizMeta = ref(null);

const STORAGE_KEY = 'quiz-app-progress';

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
};

const getScore = (quizId) => {
  const progress = loadProgress();
  return progress[quizId] !== undefined ? progress[quizId] : null;
};

const catProgress = computed(() => {
  if (!selectedCat.value) return { done: 0, total: 0, pct: 0 };
  const quizzes = selectedCat.value.quizzes;
  const total = quizzes.length;
  const done = quizzes.filter(q => getScore(q.id) !== null).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
});

onMounted(() => {
  fetch('quizzes.json')
    .then(r => r.json())
    .then(data => { categories.value = data.categories; })
    .catch(() => { screen.value = 'error'; });
});

const selectCategory = (cat) => {
  selectedCat.value = cat;
  screen.value = 'category';
};

const loadQuiz = (quizMeta) => {
  currentQuizMeta.value = quizMeta;
  fetch(quizMeta.file)
    .then(r => { if (r.ok) return r.json(); throw new Error(); })
    .then(data => { quizData.value = data; quizKey.value++; screen.value = 'quiz'; })
    .catch(() => { screen.value = 'error'; });
};

const loadCourse = () => {
  fetch(selectedCat.value.courseFile)
    .then(r => { if (r.ok) return r.json(); throw new Error(); })
    .then(data => { courseData.value = data; screen.value = 'course'; })
    .catch(() => { screen.value = 'error'; });
};

const onQuizFinished = (score) => {
  if (currentQuizMeta.value) saveScore(currentQuizMeta.value.id, score);
};
</script>
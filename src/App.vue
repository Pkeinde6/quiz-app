<template>
  <div class="app-wrapper">

    <!-- ============ ECRAN 1 : Choix de la categorie ============ -->
    <div v-if="screen === 'home'" class="select-screen">
      <h1 class="app-title">Quiz App</h1>
      <p class="app-subtitle">Choisis ta matiere</p>

      <div class="cat-grid">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="cat-card"
          :style="{ background: cat.color, borderColor: cat.borderColor }"
          @click="selectCategory(cat)"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-count">{{ cat.quizzes.length }} quiz</span>
        </button>
      </div>
    </div>

    <!-- ============ ECRAN 2 : Liste des quiz d'une categorie ============ -->
    <div v-if="screen === 'category'" class="select-screen">
      <button class="back-btn" @click="screen = 'home'">← Retour</button>
      <h1 class="app-title">{{ selectedCat.icon }} {{ selectedCat.name }}</h1>

      <!-- Bouton mini-cours -->
      <div class="course-btn-wrap">
        <button class="course-btn" @click="loadCourse">
          📚 Voir le mini-cours {{ selectedCat.name }}
        </button>
      </div>

      <!-- Progression globale -->
      <div class="progress-summary" v-if="catProgress.total > 0">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: catProgress.pct + '%' }"></div>
        </div>
        <span class="progress-text">{{ catProgress.done }} / {{ catProgress.total }} quiz termines</span>
      </div>

      <div class="quiz-grid">
        <button
          v-for="q in selectedCat.quizzes"
          :key="q.id"
          class="quiz-card-btn"
          :class="{ 'quiz-done': getScore(q.id) !== null }"
          @click="loadQuiz(q)"
        >
          <span class="quiz-card-icon">{{ q.icon }}</span>
          <span class="quiz-card-title">{{ q.title }}</span>
          <span class="quiz-card-count">{{ q.questions }} questions</span>
          <span v-if="getScore(q.id) !== null" class="quiz-score">
            ✅ {{ getScore(q.id) }} / {{ q.questions }}
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
      <button class="back-btn" @click="screen = 'category'">← Retour aux quiz</button>
      <Quiz :quiz="quizData" :key="quizKey" @finished="onQuizFinished" />
    </div>

    <!-- ============ Erreur ============ -->
    <div v-if="screen === 'error'" class="error-box">
      <p>Impossible de charger les donnees.</p>
      <button class="back-btn" @click="screen = 'home'">Retour au menu</button>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, computed } from 'vue';
import Quiz from './components/quiz.vue';
import CoursePage from './components/CoursePage.vue';

// --- State ---
const screen = ref('home');          // home | category | course | quiz | error
const categories = ref([]);
const selectedCat = ref(null);
const quizData = ref(null);
const quizKey = ref(0);
const courseData = ref(null);
const currentQuizMeta = ref(null);

// --- Progression (localStorage) ---
const STORAGE_KEY = 'quiz-app-progress';

const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
};

const saveScore = (quizId, score) => {
  const progress = loadProgress();
  const prev = progress[quizId];
  // Garde le meilleur score
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

// --- Chargement initial ---
onMounted(() => {
  fetch('quizzes.json')
    .then(r => r.json())
    .then(data => {
      categories.value = data.categories;
    })
    .catch(() => {
      screen.value = 'error';
    });
});

// --- Actions ---
const selectCategory = (cat) => {
  selectedCat.value = cat;
  screen.value = 'category';
};

const loadQuiz = (quizMeta) => {
  currentQuizMeta.value = quizMeta;
  fetch(quizMeta.file)
    .then(r => {
      if (r.ok) return r.json();
      throw new Error('Erreur');
    })
    .then(data => {
      quizData.value = data;
      quizKey.value++;
      screen.value = 'quiz';
    })
    .catch(() => { screen.value = 'error'; });
};

const loadCourse = () => {
  fetch(selectedCat.value.courseFile)
    .then(r => {
      if (r.ok) return r.json();
      throw new Error('Erreur');
    })
    .then(data => {
      courseData.value = data;
      screen.value = 'course';
    })
    .catch(() => { screen.value = 'error'; });
};

const onQuizFinished = (score) => {
  if (currentQuizMeta.value) {
    saveScore(currentQuizMeta.value.id, score);
  }
};
</script>


<style scoped>
.app-wrapper {
  font-family: 'Montserrat', sans-serif;
  max-width: 850px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.app-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.3rem;
}

.app-subtitle {
  text-align: center;
  color: #777;
  font-size: 1rem;
  margin-bottom: 2rem;
}

/* --- Grille categories --- */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  border: 3px solid transparent;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.cat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}

.cat-icon {
  font-size: 3.5rem;
  margin-bottom: 0.6rem;
}

.cat-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #222;
}

.cat-count {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
}

/* --- Grille quiz --- */
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.quiz-card-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.3rem 0.8rem;
  border: 2px solid #e8e8e8;
  border-radius: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  position: relative;
}

.quiz-card-btn:hover {
  transform: translateY(-3px);
  border-color: #8e80ff;
  box-shadow: 0 6px 20px rgba(142, 128, 255, 0.15);
}

.quiz-card-btn.quiz-done {
  border-color: #4caf50;
  background: #f1f8f1;
}

.quiz-card-icon {
  font-size: 1.8rem;
  margin-bottom: 0.4rem;
}

.quiz-card-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 0.2rem;
}

.quiz-card-count {
  font-size: 0.75rem;
  color: #999;
}

.quiz-score {
  font-size: 0.8rem;
  font-weight: 700;
  color: #2e7d32;
  margin-top: 0.4rem;
}

/* --- Bouton cours --- */
.course-btn-wrap {
  text-align: center;
  margin: 1.2rem 0;
}

.course-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  padding: 0.7rem 1.8rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.course-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);
}

/* --- Progression --- */
.progress-summary {
  margin: 1rem 0 0.5rem;
  text-align: center;
}

.progress-bar-bg {
  height: 10px;
  background: #e8e8e8;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.4rem;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  border-radius: 5px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
}

/* --- Bouton retour --- */
.back-btn {
  background: #eee;
  border: 1px solid #ddd;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.back-btn:hover {
  background: #ddd;
  color: #222;
}

.error-box {
  text-align: center;
  margin-top: 3rem;
}

.select-screen {
  margin-top: 1rem;
}
</style>
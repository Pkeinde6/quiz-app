<template>
  <div class="app-wrapper">
    <!-- Ecran de selection du quiz -->
    <div v-if="!quiz && state !== 'error'" class="select-screen">
      <h1 class="app-title">Quiz Linux</h1>
      <p class="app-subtitle">Choisis un quiz pour commencer</p>
      <div class="quiz-grid">
        <button
          v-for="q in quizList"
          :key="q.id"
          class="quiz-card-btn"
          @click="loadQuiz(q.file)"
        >
          <span class="quiz-card-icon">{{ q.icon }}</span>
          <span class="quiz-card-title">{{ q.title }}</span>
          <span class="quiz-card-count">{{ q.questions }} questions</span>
        </button>
      </div>
    </div>

    <!-- Erreur -->
    <div v-if="state === 'error'" class="error-box">
      <p>Impossible de charger le quiz.</p>
      <button class="back-btn" @click="backToMenu">Retour au menu</button>
    </div>

    <!-- Quiz en cours -->
    <div v-if="quiz">
      <button class="back-btn back-top" @click="backToMenu">← Retour aux quiz</button>
      <Quiz :quiz="quiz" :key="quizKey" />
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import Quiz from './components/quiz.vue';

const quizList = ref([]);
const quiz = ref(null);
const quizKey = ref(0);
const state = ref('idle');

onMounted(() => {
  fetch('quizzes.json')
    .then(r => r.json())
    .then(data => {
      quizList.value = data;
    })
    .catch(() => {
      state.value = 'error';
    });
});

const loadQuiz = (file) => {
  state.value = 'loading';
  quiz.value = null;
  fetch(file)
    .then(r => {
      if (r.ok) return r.json();
      throw new Error('Erreur');
    })
    .then(data => {
      quiz.value = data;
      quizKey.value++;
      state.value = 'idle';
    })
    .catch(() => {
      state.value = 'error';
    });
};

const backToMenu = () => {
  quiz.value = null;
  state.value = 'idle';
};
</script>


<style scoped>
.app-wrapper {
  font-family: 'Montserrat', sans-serif;
  max-width: 800px;
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

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
}

.quiz-card-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  border: 2px solid #e8e8e8;
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.quiz-card-btn:hover {
  transform: translateY(-4px);
  border-color: #8e80ff;
  box-shadow: 0 8px 24px rgba(142, 128, 255, 0.15);
}

.quiz-card-icon {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.quiz-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 0.3rem;
}

.quiz-card-count {
  font-size: 0.8rem;
  color: #999;
}

.back-btn {
  background: #eee;
  border: 1px solid #ddd;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #ddd;
  color: #222;
}

.back-top {
  margin-bottom: 1rem;
}

.error-box {
  text-align: center;
  margin-top: 3rem;
}

.select-screen {
  margin-top: 2rem;
}
</style>
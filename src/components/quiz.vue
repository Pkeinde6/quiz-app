<template>
  
  <div class="container mt-5">
    <!-- Ecran de choix de mode -->
    <div v-if="etape === 'choose'" class="mode-screen">
      <h1 class="text-center mb-4">{{ quiz.title }}</h1>
      <p class="mode-subtitle">Choisis ton mode d'examen :</p>
      <div class="mode-buttons">
        <button class="mode-btn mode-qcm" @click="startQuiz('qcm')">
          <span class="mode-icon">📝</span>
          <span class="mode-label">QCM</span>
          <span class="mode-desc">Choix multiples</span>
        </button>
        <button class="mode-btn mode-written" @click="startQuiz('written')">
          <span class="mode-icon">⌨️</span>
          <span class="mode-label">Ecrit</span>
          <span class="mode-desc">Tape tes commandes</span>
        </button>
      </div>
    </div>

    <!-- Quiz en cours -->
    <div v-if="etape === 'question' && quiz">
      <h1 class="text-center mb-4">{{ quiz.title }}</h1>
      <div class="mode-badge">{{ mode === 'qcm' ? 'Mode QCM' : 'Mode Ecrit' }}</div>

      <div v-if="quiz.questions" class="mb-4">
        <Progress :max="quiz.questions.length" :current="current + 1" />
      </div>

      <!-- Mode QCM -->
      <div class="ombre" v-if="mode === 'qcm' && task">
        <Question :task="task" :key="current" @answer="addAnswer" />
      </div>

      <!-- Mode Ecrit -->
      <div class="ombre" v-if="mode === 'written' && task">
        <WrittenQuestion :task="task" :key="current" @answer="addWrittenAnswer" />
      </div>
    </div>

    <!-- Resultats -->
    <div v-if="etape === 'result'" class="mt-5">
      <h2 class="text-success text-center">Resultats</h2>
      <div class="mode-badge result-badge">{{ mode === 'qcm' ? 'Mode QCM' : 'Mode Ecrit' }}</div>
      <p class="fs-4 text-center">Note : <strong>{{ note }}</strong> / {{ quiz.questions.length }}</p>

      <div v-if="note >= quiz.minimum_score" class="alert alert-success">
        {{ quiz.success_message }}
      </div>
      <div v-else class="alert alert-danger">
        {{ quiz.failure_message }}
      </div>

      <!-- Corrections des questions fausses -->
      <div v-if="wrongAnswers.length > 0" class="corrections">
        <h3 class="corrections-title">Questions fausses ({{ wrongAnswers.length }})</h3>
        <div v-for="(item, idx) in wrongAnswers" :key="idx" class="correction-card">
          <div class="correction-number">Question {{ item.index + 1 }}</div>
          <div class="correction-question">{{ item.question }}</div>
          <div class="correction-answer wrong">
            <span class="label">Ta reponse :</span> {{ item.yourAnswer || '(aucune)' }}
          </div>
          <div class="correction-answer correct">
            <span class="label">Bonne reponse :</span> {{ item.correctAnswer }}
          </div>
        </div>
      </div>

      <div v-else class="all-correct">
        Bravo ! Tu as tout juste !
      </div>

      <!-- Bouton recommencer -->
      <div class="text-center" style="margin-top: 2rem;">
        <button class="restart-btn" @click="restart">Recommencer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Progress from './progress.vue';
import Question from './question.vue';
import WrittenQuestion from './WrittenQuestion.vue';

const props = defineProps({
  quiz: Object
});

const etape = ref('choose');
const mode = ref('qcm');
const answers = ref([]);

if (props.quiz && props.quiz.questions) {
  answers.value = props.quiz.questions.map(() => null);
}

const current = ref(0);

const startQuiz = (selectedMode) => {
  mode.value = selectedMode;
  etape.value = 'question';
  current.value = 0;
  answers.value = props.quiz.questions.map(() => null);
};

const restart = () => {
  etape.value = 'choose';
  current.value = 0;
  answers.value = props.quiz.questions.map(() => null);
};

const task = computed(() =>
  props.quiz && props.quiz.questions
    ? props.quiz.questions[current.value]
    : null
);

const note = computed(() => {
  let total = 0;
  for (let i = 0; i < answers.value.length; i++) {
    if (mode.value === 'qcm') {
      if (answers.value[i] === props.quiz.questions[i].correct_answer) {
        total++;
      }
    } else {
      // Mode ecrit : comparer avec la liste accept (insensible a la casse)
      const userAnswer = (answers.value[i] || '').trim().toUpperCase().replace(/\s+/g, ' ');
      const acceptList = props.quiz.questions[i].accept || [props.quiz.questions[i].correct_answer];
      const isCorrect = acceptList.some(a => 
        a.trim().toUpperCase().replace(/\s+/g, ' ') === userAnswer
      );
      if (isCorrect) total++;
    }
  }
  return total;
});

const wrongAnswers = computed(() => {
  const wrongs = [];
  for (let i = 0; i < answers.value.length; i++) {
    let isCorrect = false;
    if (mode.value === 'qcm') {
      isCorrect = answers.value[i] === props.quiz.questions[i].correct_answer;
    } else {
      const userAnswer = (answers.value[i] || '').trim().toUpperCase().replace(/\s+/g, ' ');
      const acceptList = props.quiz.questions[i].accept || [props.quiz.questions[i].correct_answer];
      isCorrect = acceptList.some(a => 
        a.trim().toUpperCase().replace(/\s+/g, ' ') === userAnswer
      );
    }
    if (!isCorrect) {
      wrongs.push({
        index: i,
        question: props.quiz.questions[i].question,
        yourAnswer: answers.value[i],
        correctAnswer: props.quiz.questions[i].correct_answer
      });
    }
  }
  return wrongs;
});

const addAnswer = (answer) => {
  answers.value[current.value] = answer;
  if (current.value === props.quiz.questions.length - 1) {
    etape.value = 'result';
  } else {
    current.value++;
  }
};

const addWrittenAnswer = (answer) => {
  answers.value[current.value] = answer;
  if (current.value === props.quiz.questions.length - 1) {
    etape.value = 'result';
  } else {
    current.value++;
  }
};
</script>
<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}



.container {
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 16px;
  background: #ffffff;
  border: soloid 1px #000000;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.434), 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease-in-out;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #111;
}

h2 {
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1rem;
  text-align: center;
  color: #444;
}

.card {
  background: #fdfdfd;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 6px 16px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.08);
}

.question-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #222;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.choice {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s ease, border 0.2s ease;
}

.choice:hover {
  background: #f1eefc;
  border-color: #b9aef9;
}

input[type="radio"] {
  margin-right: 0.75rem;
  accent-color: #8e80ff; /* Mauve clair */
}

.btn {
  display: inline-block;
  background: #8e80ff; /* Mauve */
  color: #ffffff;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #7b6ee0;
}

.progress-container {
  width: 100%;
  background: #e3e3e3;
  border-radius: 8px;
  overflow: hidden;
  height: 10px;
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 10px;
  background: #8e80ff;
  transition: width 0.3s ease;
}

.alert-success {
  background: #f0fdf9;
  color: #14866d;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #b6e8d8;
  margin-top: 1rem;
}

.alert-danger {
  background: #fff2f2;
  color: #c0392b;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #f5bcbc;
  margin-top: 1rem;
}

.corrections {
  margin-top: 2rem;
  text-align: left;
}

.corrections-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #c0392b;
  margin-bottom: 1rem;
  text-align: center;
}

.correction-card {
  background: #fefefe;
  border: 1px solid #e8e8e8;
  border-left: 4px solid #e74c3c;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
}

.correction-number {
  font-weight: 700;
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 0.3rem;
}

.correction-question {
  font-weight: 600;
  font-size: 1rem;
  color: #222;
  margin-bottom: 0.6rem;
}

.correction-answer {
  font-size: 0.95rem;
  padding: 0.4rem 0;
  text-align: left;
}

.correction-answer .label {
  font-weight: 600;
}

.correction-answer.wrong {
  color: #e74c3c;
}

.correction-answer.correct {
  color: #27ae60;
}

.all-correct {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f0fdf9;
  color: #14866d;
  border: 1px solid #b6e8d8;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}

/* Mode selection screen */
.mode-screen {
  text-align: center;
}

.mode-subtitle {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
}

.mode-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.mode-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 180px;
  border-radius: 16px;
  border: 2px solid #e0e0e0;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.mode-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.mode-qcm:hover {
  border-color: #8e80ff;
  background: #f8f6ff;
}

.mode-written:hover {
  border-color: #2c3e50;
  background: #f0f4f8;
}

.mode-icon {
  font-size: 2.5rem;
  margin-bottom: 0.6rem;
}

.mode-label {
  font-size: 1.3rem;
  font-weight: 700;
  color: #222;
}

.mode-desc {
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.3rem;
}

.mode-badge {
  text-align: center;
  margin-bottom: 1rem;
}

.mode-badge {
  display: inline-block;
  background: #8e80ff;
  color: #fff;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0 auto 1rem;
  display: block;
  width: fit-content;
}

.result-badge {
  margin: 0.5rem auto 1rem;
}

.restart-btn {
  background: #8e80ff;
  color: #fff;
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.restart-btn:hover {
  background: #7b6ee0;
  transform: scale(1.05);
}

</style>

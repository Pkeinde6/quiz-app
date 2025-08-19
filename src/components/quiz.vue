<template>
  
  <div class="container mt-5">
    <div v-if="quiz">
      <h1 class="text-center mb-4">{{ quiz.title }}</h1>

      <div v-if="quiz.questions" class="mb-4">
        <Progress :max="quiz.questions.length" :current="current + 1" />
      </div>

      <div class="ombre" v-if="etape === 'question' && task">
        <Question :task="task" @answer="addAnswer" />
      </div>
    </div>

    <div v-if="etape === 'result'" class="text-center mt-5">
      <h2 class="text-success">Résultats</h2>
      <p class="fs-4">Note : <strong>{{ note }}</strong> / {{ quiz.questions.length }}</p>

      <div v-if="note >= quiz.minimum_score" class="alert alert-success">
        {{ quiz.success_message }}
      </div>
      <div v-else class="alert alert-danger">
        {{ quiz.failure_message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Progress from './progress.vue';
import Question from './question.vue';

const props = defineProps({
  quiz: Object
});

const etape = ref('question');
const answers = ref([]);

if (props.quiz && props.quiz.questions) {
  answers.value = props.quiz.questions.map(() => null);
}

const current = ref(0);

const task = computed(() =>
  props.quiz && props.quiz.questions
    ? props.quiz.questions[current.value]
    : null
);

const note = computed(() => {
  let total = 0;
  for (let i = 0; i < answers.value.length; i++) {
    if (
      answers.value[i] === props.quiz.questions[i].correct_answer
    ) {
      total++;
    }
  }
  return total;
});

const addAnswer = (answer) => {
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

</style>

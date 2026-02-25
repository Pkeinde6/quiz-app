<template>
  <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg ring-1 ring-gray-900/5 p-4 sm:p-6 md:p-8 transition-all">

    <!-- Ecran de choix de mode -->
    <div v-if="etape === 'choose'" class="text-center">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{{ quiz.title }}</h1>
      <p class="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">Choisis ton mode d'examen :</p>
      <div class="flex gap-4 sm:gap-5 justify-center flex-col sm:flex-row">
        <button @click="startQuiz('qcm')" class="group flex flex-col items-center justify-center sm:w-48 sm:h-44 py-5 sm:py-0 rounded-2xl border-2 border-gray-200 bg-white cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-indigo-400 hover:bg-indigo-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-indigo-500 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          <span class="text-lg font-bold text-gray-800">QCM</span>
          <span class="text-xs text-gray-400 mt-1">Choix multiples</span>
        </button>
        <button @click="startQuiz('written')" class="group flex flex-col items-center justify-center sm:w-48 sm:h-44 py-5 sm:py-0 rounded-2xl border-2 border-gray-200 bg-white cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-slate-600 hover:bg-slate-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-600 mb-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
          <span class="text-lg font-bold text-gray-800">Ecrit</span>
          <span class="text-xs text-gray-400 mt-1">Tape tes commandes</span>
        </button>
      </div>
    </div>

    <!-- Quiz en cours -->
    <div v-if="etape === 'question' && quiz">
      <h1 class="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-2">{{ quiz.title }}</h1>
      <div class="flex justify-center mb-4">
        <span class="inline-block bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
          {{ mode === 'qcm' ? 'Mode QCM' : 'Mode Ecrit' }}
        </span>
      </div>

      <div v-if="quiz.questions" class="mb-5">
        <Progress :max="quiz.questions.length" :current="current + 1" />
      </div>

      <div v-if="mode === 'qcm' && task">
        <Question :task="task" :key="current" @answer="addAnswer" />
      </div>
      <div v-if="mode === 'written' && task">
        <WrittenQuestion :task="task" :key="current" @answer="addWrittenAnswer" />
      </div>
    </div>

    <!-- Resultats -->
    <div v-if="etape === 'result'">
      <div class="text-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 mx-auto mb-3" :class="note >= quiz.minimum_score ? 'text-green-500' : 'text-red-400'" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
        <h2 class="text-xl font-semibold text-gray-800">Resultats</h2>
        <span class="inline-block bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full mt-2">
          {{ mode === 'qcm' ? 'Mode QCM' : 'Mode Ecrit' }}
        </span>
        <p class="text-xl sm:text-2xl font-bold mt-3">{{ note }} <span class="text-gray-400 font-normal">/ {{ quiz.questions.length }}</span></p>
      </div>

      <div v-if="note >= quiz.minimum_score" class="bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 text-center mb-4">
        {{ quiz.success_message }}
      </div>
      <div v-else class="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-center mb-4">
        {{ quiz.failure_message }}
      </div>

      <!-- Corrections -->
      <div v-if="wrongAnswers.length > 0" class="mt-6">
        <h3 class="text-lg font-bold text-red-500 text-center mb-4 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
          Questions fausses ({{ wrongAnswers.length }})
        </h3>
        <div v-for="(item, idx) in wrongAnswers" :key="idx" class="bg-white border border-gray-200 border-l-4 border-l-red-400 rounded-xl p-3 sm:p-4 mb-3">
          <div class="text-xs font-bold text-gray-400 mb-1">Question {{ item.index + 1 }}</div>
          <div class="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{{ item.question }}</div>
          <div class="text-xs sm:text-sm text-red-500 py-0.5 break-all"><span class="font-semibold">Ta reponse :</span> {{ item.yourAnswer || '(aucune)' }}</div>
          <div class="text-xs sm:text-sm text-green-600 py-0.5 break-all"><span class="font-semibold">Bonne reponse :</span> {{ item.correctAnswer }}</div>
        </div>
      </div>

      <div v-else class="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 text-center text-green-700 text-lg font-semibold flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        Bravo ! Tu as tout juste !
      </div>

      <!-- Bouton recommencer -->
      <div class="text-center mt-8">
        <button @click="restart" class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" /></svg>
          Recommencer
        </button>
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

const emit = defineEmits(['finished']);

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
  props.quiz && props.quiz.questions ? props.quiz.questions[current.value] : null
);

const note = computed(() => {
  let total = 0;
  for (let i = 0; i < answers.value.length; i++) {
    if (mode.value === 'qcm') {
      if (answers.value[i] === props.quiz.questions[i].correct_answer) total++;
    } else {
      const userAnswer = (answers.value[i] || '').trim().toUpperCase().replace(/\s+/g, ' ');
      const acceptList = props.quiz.questions[i].accept || [props.quiz.questions[i].correct_answer];
      if (acceptList.some(a => a.trim().toUpperCase().replace(/\s+/g, ' ') === userAnswer)) total++;
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
      isCorrect = acceptList.some(a => a.trim().toUpperCase().replace(/\s+/g, ' ') === userAnswer);
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

const finishQuiz = () => {
  etape.value = 'result';
  emit('finished', note.value);
};

const addAnswer = (answer) => {
  answers.value[current.value] = answer;
  if (current.value === props.quiz.questions.length - 1) finishQuiz();
  else current.value++;
};

const addWrittenAnswer = (answer) => {
  answers.value[current.value] = answer;
  if (current.value === props.quiz.questions.length - 1) finishQuiz();
  else current.value++;
};
</script>

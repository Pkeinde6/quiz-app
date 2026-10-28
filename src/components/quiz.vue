<template>
  <div class="max-w-2xl mx-auto bg-white border border-line rounded-3xl p-5 sm:p-8">

    <!-- Choix du mode -->
    <div v-if="etape === 'choose'" class="rise text-center">
      <div class="text-[11px] font-bold tracking-[.2em] uppercase text-brand mb-2">{{ quiz.questions.length }} questions</div>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">{{ quiz.title }}</h1>
      <p class="text-muted text-sm mb-8">Choisis ton mode :</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button @click="startQuiz('qcm')" class="text-left p-5 rounded-2xl border-2 border-line hover:border-brand bg-white cursor-pointer transition-all hover:-translate-y-1">
          <span class="w-11 h-11 rounded-xl bg-brand text-white grid place-items-center text-sm font-bold mb-3">A·B</span>
          <span class="block text-lg font-bold">QCM</span>
          <span class="block text-xs text-muted mt-1">Choix multiples, correction après chaque question</span>
        </button>
        <button @click="startQuiz('written')" class="text-left p-5 rounded-2xl border-2 border-line hover:border-ink bg-white cursor-pointer transition-all hover:-translate-y-1">
          <span class="w-11 h-11 rounded-xl bg-ink text-sun grid place-items-center text-sm font-bold mb-3 font-mono">&gt;_</span>
          <span class="block text-lg font-bold">Écrit</span>
          <span class="block text-xs text-muted mt-1">Tu tapes la réponse exacte, avec indice</span>
        </button>
      </div>
    </div>

    <!-- Quiz en cours -->
    <div v-if="etape === 'question' && quiz">
      <div class="flex items-center justify-between gap-3 mb-4">
        <h1 class="text-sm font-bold text-muted truncate">{{ quiz.title }}</h1>
        <span class="shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          :class="mode === 'qcm' ? 'bg-brand/10 text-brand' : 'bg-ink text-sun'">
          {{ mode === 'qcm' ? 'QCM' : 'Écrit' }}
        </span>
      </div>

      <div v-if="quiz.questions" class="mb-6">
        <Progress :max="quiz.questions.length" :current="current + 1" />
      </div>

      <div v-if="mode === 'qcm' && task">
        <Question :task="task" :key="current" :last="current === quiz.questions.length - 1" @answer="addAnswer" />
      </div>
      <div v-if="mode === 'written' && task">
        <WrittenQuestion :task="task" :key="current" @answer="addWrittenAnswer" />
      </div>
    </div>

    <!-- Resultats -->
    <div v-if="etape === 'result'" class="rise">
      <div class="text-center mb-6">
        <div class="relative w-36 h-36 mx-auto mb-4">
          <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#DCE5DE" stroke-width="10" />
            <circle cx="60" cy="60" r="52" fill="none" stroke-linecap="round" stroke-width="10"
              :stroke="passed ? '#00853F' : '#ef4444'"
              stroke-dasharray="327" :stroke-dashoffset="327 - 327 * note / quiz.questions.length"
              style="transition: stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)" />
          </svg>
          <div class="absolute inset-0 grid place-items-center">
            <div>
              <div class="text-4xl font-extrabold leading-none">{{ note }}</div>
              <div class="text-xs text-muted">sur {{ quiz.questions.length }}</div>
            </div>
          </div>
        </div>
        <div class="text-2xl font-extrabold">{{ passed ? 'Réussi ! 🎉' : 'Pas encore…' }}</div>
        <p class="text-sm mt-2 max-w-md mx-auto" :class="passed ? 'text-brand' : 'text-red-600'">
          {{ passed ? quiz.success_message : quiz.failure_message }}
        </p>
        <p class="text-xs text-muted mt-1">Seuil de réussite : {{ quiz.minimum_score }} / {{ quiz.questions.length }}</p>
      </div>

      <!-- Corrections -->
      <div v-if="wrongAnswers.length > 0" class="mt-6">
        <h3 class="text-sm font-bold uppercase tracking-wider text-muted mb-3">À revoir ({{ wrongAnswers.length }})</h3>
        <div v-for="(item, idx) in wrongAnswers" :key="idx" class="bg-paper rounded-2xl p-4 mb-3">
          <div class="text-[11px] font-bold text-muted mb-1">Question {{ item.index + 1 }}</div>
          <div class="font-semibold mb-2 text-sm sm:text-base">{{ item.question }}</div>
          <div class="text-xs sm:text-sm text-red-600 break-words">✗ {{ item.yourAnswer || '(aucune)' }}</div>
          <div class="text-xs sm:text-sm text-brand font-semibold break-words">✓ {{ item.correctAnswer }}</div>
        </div>
      </div>
      <div v-else class="mt-6 bg-brand/10 rounded-2xl p-5 text-center text-brand font-bold">
        Sans faute, tout est juste !
      </div>

      <div class="text-center mt-8">
        <button @click="restart" class="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-full transition cursor-pointer">
          ↻ Recommencer
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
const passed = computed(() => note.value >= props.quiz.minimum_score);

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

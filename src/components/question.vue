<template>
  <div class="rise">
    <div class="text-lg sm:text-xl font-bold text-ink leading-snug mb-5">
      {{ task.question }}
    </div>

    <ul class="flex flex-col gap-2.5 mb-5 list-none p-0">
      <li v-for="(choice, i) in shuffledChoices" :key="choice">
        <button
          type="button"
          @click="!checked && (selected = choice)"
          :class="choiceClass(choice)"
          class="w-full flex items-center gap-3 text-left text-sm sm:text-base px-3 sm:px-4 py-3 rounded-xl border-2 transition cursor-pointer disabled:cursor-default"
          :disabled="checked"
        >
          <span :class="letterClass(choice)" class="shrink-0 w-8 h-8 rounded-lg grid place-items-center text-sm font-bold transition">
            {{ checked && choice === task.correct_answer ? '✓' : checked && choice === selected ? '✗' : letters[i] }}
          </span>
          <span class="flex-1">{{ choice }}</span>
        </button>
      </li>
    </ul>

    <!-- Correction immediate -->
    <div v-if="checked" class="rise rounded-xl px-4 py-3 mb-5 text-sm"
      :class="isCorrect ? 'bg-brand/10 text-night' : 'bg-red-50 text-red-700'">
      <div class="font-bold mb-0.5">{{ isCorrect ? 'Bonne réponse !' : 'Pas tout à fait…' }}</div>
      <div v-if="!isCorrect">La bonne réponse : <strong>{{ task.correct_answer }}</strong></div>
      <div v-if="task.hint" class="mt-1 opacity-80">💡 {{ task.hint }}</div>
    </div>

    <div class="flex justify-end">
      <button v-if="!checked" @click="checked = true" :disabled="!selected" :class="primaryBtn">
        Valider
      </button>
      <button v-else @click="emit('answer', selected)" :class="primaryBtn">
        {{ last ? 'Voir le résultat' : 'Suivant' }} →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ task: Object, last: Boolean });
const emit = defineEmits(['answer']);
const selected = ref('');
const checked = ref(false);
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

const primaryBtn = 'inline-flex items-center gap-2 bg-brand hover:bg-brand-dark disabled:bg-line disabled:text-muted disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full transition cursor-pointer';

// Melange Fisher-Yates (une seule fois par question grace au computed)
const shuffledChoices = computed(() => {
  const arr = [...props.task.choices];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
});

const isCorrect = computed(() => selected.value === props.task.correct_answer);

const choiceClass = (choice) => {
  if (checked.value) {
    if (choice === props.task.correct_answer) return 'border-brand bg-brand/10';
    if (choice === selected.value) return 'border-red-400 bg-red-50';
    return 'border-line bg-white opacity-60';
  }
  return choice === selected.value
    ? 'border-brand bg-brand/5'
    : 'border-line bg-white hover:border-brand/60';
};

const letterClass = (choice) => {
  if (checked.value) {
    if (choice === props.task.correct_answer) return 'bg-brand text-white';
    if (choice === selected.value) return 'bg-red-500 text-white';
    return 'bg-paper text-muted';
  }
  return choice === selected.value ? 'bg-brand text-white' : 'bg-paper text-muted';
};
</script>

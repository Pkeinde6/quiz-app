<template>
  <div class="rise">
    <div class="text-lg sm:text-xl font-bold text-ink leading-snug mb-4">
      {{ task.question }}
    </div>

    <!-- Indice -->
    <div v-if="showHint && task.hint" class="bg-sun/40 rounded-xl px-4 py-3 mb-4 text-sm text-ink">
      💡 Indice : <strong>{{ task.hint }}</strong>
    </div>
    <button
      v-if="!showHint && task.hint"
      @click="showHint = true"
      class="text-xs font-medium text-muted hover:text-brand border border-dashed border-line hover:border-brand px-3 py-1.5 rounded-full mb-4 transition cursor-pointer"
    >
      Voir l'indice
    </button>

    <input
      type="text"
      v-model="typed"
      placeholder="Tape ta réponse ici…"
      @keyup.enter="validate"
      ref="inputRef"
      class="w-full px-4 py-3.5 font-mono text-sm border-2 border-line rounded-xl bg-white text-ink focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/15 transition mb-5"
    />

    <div class="flex justify-end">
      <button
        @click="validate"
        :disabled="!typed.trim()"
        class="inline-flex items-center gap-2 bg-ink hover:bg-night disabled:bg-line disabled:text-muted disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full transition cursor-pointer"
      >
        Valider →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['answer']);
const typed = ref('');
const showHint = ref(false);
const inputRef = ref(null);

onMounted(() => { if (inputRef.value) inputRef.value.focus(); });

const validate = () => {
  if (typed.value.trim()) emit('answer', typed.value.trim());
};
</script>

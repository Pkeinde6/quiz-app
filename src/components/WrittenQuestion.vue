<template>
  <div class="bg-slate-50 border border-gray-200 rounded-xl p-6 max-w-xl mx-auto">
    <div class="text-lg font-bold text-gray-800 mb-4">
      {{ task.question }}
    </div>

    <!-- Hint -->
    <div v-if="showHint && task.hint" class="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 text-sm text-amber-800 flex items-start gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
      <span>Indice : <strong>{{ task.hint }}</strong></span>
    </div>

    <button
      v-if="!showHint && task.hint"
      @click="showHint = true"
      class="text-xs text-gray-400 hover:text-indigo-500 border border-dashed border-gray-300 hover:border-indigo-400 px-3 py-1.5 rounded-md mb-4 transition cursor-pointer"
    >
      Voir l'indice
    </button>

    <!-- Input -->
    <div class="mb-5">
      <input
        type="text"
        v-model="typed"
        placeholder="Tape ta commande ici..."
        @keyup.enter="validate"
        ref="inputRef"
        class="w-full px-4 py-3 font-mono text-sm border-2 border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
      />
    </div>

    <button
      @click="validate"
      :disabled="!typed.trim()"
      class="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
      Valider
    </button>
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

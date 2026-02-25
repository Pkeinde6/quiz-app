<template>
  <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 max-w-xl mx-auto">
    <div class="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-5">
      {{ task.question }}
    </div>

    <ul class="flex flex-col gap-2 sm:gap-2.5 mb-5 sm:mb-6 list-none p-0">
      <li v-for="choice in task.choices" :key="choice">
        <label class="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm cursor-pointer px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition">
          <input
            type="radio"
            name="answer"
            :value="choice"
            v-model="selected"
            class="accent-indigo-500 w-4 h-4"
          />
          <span>{{ choice }}</span>
        </label>
      </li>
    </ul>

    <button
      @click="validate"
      :disabled="!selected"
      class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
      Valider
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['answer']);
const selected = ref('');

const validate = () => {
  emit('answer', selected.value);
};
</script>

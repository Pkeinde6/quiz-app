<template>
  <div>
    <button @click="$emit('back')" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 py-2 rounded-lg transition mb-6 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
      Retour
    </button>

    <h1 class="text-center text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 sm:mb-8">{{ course.icon }} {{ course.title }}</h1>

    <div class="flex flex-col gap-3 sm:gap-4">
      <div v-for="(section, idx) in course.sections" :key="idx" class="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-5 transition hover:border-indigo-400 hover:shadow-md">
        <h3 class="text-sm sm:text-base font-bold text-gray-700 mb-2 sm:mb-3 pb-2 border-b-2 border-indigo-400">{{ idx + 1 }}. {{ section.title }}</h3>
        <pre class="font-mono text-xs sm:text-sm leading-6 sm:leading-7 text-gray-700 bg-white p-3 sm:p-4 rounded-lg border border-gray-100 whitespace-pre-wrap break-words m-0 overflow-x-auto">{{ section.content }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ course: Object });
defineEmits(['back']);
</script>

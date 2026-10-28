<template>
  <div>
    <div class="flex items-center justify-between gap-2 mb-4 sm:mb-6">
      <button @click="$emit('back')" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 py-2 rounded-lg transition cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Retour
      </button>
      <!-- Bouton menu (mobile) -->
      <button @click="sidebarOpen = !sidebarOpen" class="md:hidden inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-lg cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        Sommaire
      </button>
    </div>

    <h1 class="text-center text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-6">{{ course.icon }} {{ course.title }}</h1>

    <div class="flex gap-4 items-start">
      <!-- Overlay mobile -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false" class="md:hidden fixed inset-0 bg-black/30 z-30"></div>

      <!-- Sidebar -->
      <aside
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        class="fixed md:sticky top-0 md:top-4 left-0 z-40 md:z-auto h-full md:h-auto md:max-h-[calc(100vh-2rem)] w-72 md:w-60 shrink-0 overflow-y-auto bg-white md:bg-gray-50 border-r md:border border-gray-200 md:rounded-xl p-3 transition-transform md:translate-x-0"
      >
        <div class="flex items-center justify-between mb-2 px-1">
          <span class="text-xs font-bold uppercase tracking-wide text-gray-400">Sommaire</span>
          <span class="text-xs text-gray-400">{{ current + 1 }}/{{ course.sections.length }}</span>
        </div>
        <nav class="flex flex-col gap-0.5">
          <button
            v-for="(section, idx) in course.sections" :key="idx"
            @click="go(idx)"
            :class="idx === current ? 'bg-indigo-500 text-white font-semibold' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'"
            class="text-left text-xs sm:text-sm px-3 py-2 rounded-lg transition cursor-pointer flex gap-2"
          >
            <span :class="idx === current ? 'text-indigo-100' : 'text-gray-400'" class="shrink-0 w-5 text-right">{{ idx + 1 }}</span>
            <span>{{ cleanTitle(section.title) }}</span>
          </button>
        </nav>
      </aside>

      <!-- Section courante -->
      <section class="flex-1 min-w-0">
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-5">
          <h3 class="text-sm sm:text-base font-bold text-gray-700 mb-2 sm:mb-3 pb-2 border-b-2 border-indigo-400">{{ current + 1 }}. {{ cleanTitle(section.title) }}</h3>
          <pre class="font-mono text-xs sm:text-sm leading-6 sm:leading-7 text-gray-700 bg-white p-3 sm:p-4 rounded-lg border border-gray-100 whitespace-pre-wrap break-words m-0 overflow-x-auto">{{ section.content }}</pre>
        </div>

        <div class="flex justify-between gap-2 mt-4">
          <button @click="go(current - 1)" :disabled="current === 0" class="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
            ← Précédent
          </button>
          <button @click="go(current + 1)" :disabled="current === course.sections.length - 1" class="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
            Suivant →
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ course: Object });
defineEmits(['back']);

const current = ref(0);
const sidebarOpen = ref(false);
const section = computed(() => props.course.sections[current.value]);

// Retire la numerotation deja presente dans certains titres ("3. ", "9b. ")
const cleanTitle = (t) => t.replace(/^\d+[a-z]?\.\s*/, '');

const go = (idx) => {
  if (idx < 0 || idx >= props.course.sections.length) return;
  current.value = idx;
  sidebarOpen.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

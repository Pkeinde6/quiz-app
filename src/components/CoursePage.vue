<template>
  <div>
    <div class="flex items-center justify-between gap-2 mb-4 sm:mb-6">
      <button @click="$emit('back')" class="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink bg-white border border-line hover:border-brand px-4 py-2 rounded-full transition cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Retour
      </button>
      <!-- Bouton menu (mobile) -->
      <button @click="sidebarOpen = !sidebarOpen" class="md:hidden inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-brand px-4 py-2 rounded-full cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        Sommaire
      </button>
    </div>

    <h1 class="text-center text-xl sm:text-2xl font-extrabold tracking-tight text-ink mb-4 sm:mb-6">{{ course.icon }} {{ course.title }}</h1>

    <div class="flex gap-4 items-start">
      <!-- Overlay mobile -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false" class="md:hidden fixed inset-0 bg-black/30 z-30"></div>

      <!-- Sidebar -->
      <aside
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        class="fixed md:sticky top-0 md:top-4 left-0 z-40 md:z-auto h-full md:h-auto md:max-h-[calc(100vh-2rem)] w-72 md:w-60 shrink-0 overflow-y-auto bg-white border-r md:border border-line md:rounded-2xl p-3 transition-transform md:translate-x-0"
      >
        <div class="flex items-center justify-between mb-2 px-1">
          <span class="text-xs font-bold uppercase tracking-wide text-muted">Sommaire</span>
          <span class="text-xs text-muted">{{ current + 1 }}/{{ course.sections.length }}</span>
        </div>
        <nav class="flex flex-col gap-0.5">
          <button
            v-for="(section, idx) in course.sections" :key="idx"
            @click="go(idx)"
            :class="idx === current ? 'bg-brand text-white font-semibold' : 'text-ink/80 hover:bg-paper hover:text-brand'"
            class="text-left text-xs sm:text-sm px-3 py-2 rounded-lg transition cursor-pointer flex gap-2"
          >
            <span :class="idx === current ? 'text-sun' : 'text-muted'" class="shrink-0 w-5 text-right">{{ idx + 1 }}</span>
            <span>{{ cleanTitle(section.title) }}</span>
          </button>
        </nav>
      </aside>

      <!-- Section courante -->
      <section class="flex-1 min-w-0">
        <div class="bg-white border border-line rounded-2xl p-4 sm:p-6">
          <h3 class="text-sm sm:text-base font-extrabold text-ink mb-3 pb-3 border-b-4 border-sun inline-block">{{ current + 1 }}. {{ cleanTitle(section.title) }}</h3>
          <pre class="font-mono text-xs sm:text-sm leading-6 sm:leading-7 text-ink bg-paper p-3 sm:p-4 rounded-xl whitespace-pre-wrap break-words m-0 overflow-x-auto">{{ section.content }}</pre>
        </div>

        <div class="flex justify-between gap-2 mt-4">
          <button @click="go(current - 1)" :disabled="current === 0" class="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-lg border border-line bg-white text-ink hover:border-brand rounded-full disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
            ← Précédent
          </button>
          <button @click="go(current + 1)" :disabled="current === course.sections.length - 1" class="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
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

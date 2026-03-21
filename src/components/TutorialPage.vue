<template>
  <div class="tutorial-page min-h-screen bg-gray-50">

    <!-- ===== HEADER FIXE ===== -->
    <header class="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center gap-3 px-4 py-3">
        <button @click="$emit('back')" class="shrink-0 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Accueil
        </button>
        <div class="h-5 w-px bg-gray-300"></div>
        <span class="text-lg font-bold text-gray-800 truncate">{{ course.icon }} {{ course.title }}</span>

        <!-- Bouton Config (Windows uniquement) -->
        <button v-if="isWindowsTutorial" @click="configOpen = !configOpen" class="ml-auto inline-flex items-center gap-1.5 text-sm transition cursor-pointer px-3 py-1.5 rounded-lg"
          :class="hasCustomConfig ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-indigo-600'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          <span class="hidden sm:inline">{{ hasCustomConfig ? 'Config perso' : 'Personnaliser' }}</span>
        </button>

        <!-- Burger mobile -->
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          Sommaire
        </button>
      </div>

      <!-- Panneau de configuration personnalisee -->
      <div v-if="configOpen" class="border-t border-gray-200 bg-gradient-to-r from-slate-50 to-indigo-50">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              <span class="text-sm font-bold text-gray-700">Adapter a votre environnement</span>
            </div>
            <div class="flex items-center gap-2">
              <button v-if="hasCustomConfig" @click="resetConfig" class="text-xs text-red-400 hover:text-red-600 transition cursor-pointer px-2 py-1 rounded hover:bg-red-50">Reinitialiser</button>
              <button @click="configOpen = false" class="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <p class="text-xs text-gray-500 mb-3">Renseignez vos infos ci-dessous. Les scripts copies seront automatiquement adaptes a votre config.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Nom du serveur</label>
              <input v-model="userConfig.serverName" @input="saveConfig" :placeholder="defaults.serverName" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">IP du serveur</label>
              <input v-model="userConfig.serverIP" @input="saveConfig" :placeholder="defaults.serverIP" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Nom du domaine</label>
              <input v-model="userConfig.domain" @input="saveConfig" :placeholder="defaults.domain" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Mot de passe</label>
              <input v-model="userConfig.password" @input="saveConfig" :placeholder="defaults.password" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Nom du client</label>
              <input v-model="userConfig.clientName" @input="saveConfig" :placeholder="defaults.clientName" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">IP du client</label>
              <input v-model="userConfig.clientIP" @input="saveConfig" :placeholder="defaults.clientIP" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Prefixe NetBIOS</label>
              <input v-model="userConfig.netbios" @input="saveConfig" :placeholder="defaults.netbios" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Nom de l'entreprise</label>
              <input v-model="userConfig.company" @input="saveConfig" :placeholder="defaults.company" class="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white" />
            </div>
          </div>
          <div v-if="hasCustomConfig" class="mt-3 flex items-center gap-2 text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            Les scripts copies seront adaptes a votre configuration.
          </div>
        </div>
      </div>

      <!-- Barre de progression -->
      <div class="h-1 bg-gray-100">
        <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" :style="{ width: progressPct + '%' }"></div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto flex">

      <!-- ===== SIDEBAR ===== -->
      <!-- Overlay mobile -->
      <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/30 z-40 lg:hidden"></div>

      <aside
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
        class="fixed lg:sticky top-[57px] left-0 z-50 lg:z-10 w-72 lg:w-64 xl:w-72 h-[calc(100vh-57px)] bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 lg:transition-none shrink-0"
      >
        <nav class="py-4 px-3">
          <div class="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">Sommaire</div>
          <ul class="flex flex-col gap-0.5">
            <li v-for="(section, idx) in course.sections" :key="idx">
              <button
                @click="goToSection(idx)"
                class="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-start gap-2.5"
                :class="currentSection === idx
                  ? 'bg-indigo-50 text-indigo-700 font-bold border-l-3 border-indigo-500'
                  : readSections.has(idx)
                    ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'"
              >
                <!-- Numéro / check -->
                <span class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  :class="currentSection === idx
                    ? 'bg-indigo-500 text-white'
                    : readSections.has(idx)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'"
                >
                  <svg v-if="readSections.has(idx) && currentSection !== idx" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  <span v-else>{{ idx + 1 }}</span>
                </span>
                <span class="leading-snug">{{ cleanTitle(section.title) }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- ===== CONTENU PRINCIPAL ===== -->
      <main class="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 sm:py-10">

        <!-- Fil d'ariane -->
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>{{ course.icon }} {{ course.title }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          <span class="text-gray-600 font-semibold">{{ stepLabel }} {{ currentSection + 1 }}</span>
        </div>

        <!-- Titre de la section -->
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{{ currentSectionData.title }}</h1>
        <div class="flex items-center gap-3 text-sm text-gray-400 mb-4">
          <span>{{ stepLabel }} {{ currentSection + 1 }} / {{ course.sections.length }}</span>
          <span class="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>~{{ estimateTime(activeContent) }} min de lecture</span>
        </div>

        <!-- Toggle GUI / PowerShell -->
        <div v-if="currentSectionData.contentGUI !== currentSectionData.contentPS" class="flex items-center gap-1 p-1 bg-gray-100 rounded-xl mb-8 w-fit">
          <button
            @click="mode = 'gui'"
            class="px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2"
            :class="mode === 'gui' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 12V5.25" /></svg>
            <span class="hidden sm:inline">Interface graphique</span>
            <span class="sm:hidden">Manuel</span>
          </button>
          <button
            @click="mode = 'ps'"
            class="px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2"
            :class="mode === 'ps' ? 'bg-gray-800 text-green-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
            PowerShell
          </button>
        </div>

        <!-- Contenu formaté -->
        <article class="doc-content transition-opacity duration-200" :key="mode + currentSection">
          <div v-for="(block, bIdx) in parseContent(activeContent)" :key="bIdx">
            <!-- Bloc de commande / code -->
            <div v-if="block.type === 'code'" class="my-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div class="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono flex items-center justify-between">
                <span>{{ isWindowsTutorial ? 'Terminal / PowerShell' : 'Note' }}</span>
                <button @click="copyCode(block.text)" class="text-gray-400 hover:text-white transition cursor-pointer text-xs flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>
                  {{ copied === block.text ? 'Copie !' : 'Copier' }}
                </button>
              </div>
              <pre class="bg-gray-900 text-green-400 px-4 py-3 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-words m-0">{{ block.text }}</pre>
            </div>

            <!-- Titre de sous-section (━━━) -->
            <h3 v-else-if="block.type === 'heading'" class="text-lg font-bold text-indigo-700 mt-8 mb-3 flex items-center gap-2">
              <span class="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              {{ block.text }}
            </h3>

            <!-- Avertissement (⚠️) -->
            <div v-else-if="block.type === 'warning'" class="my-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3 text-sm text-amber-800">
              <span class="font-bold">Attention :</span> {{ block.text }}
            </div>

            <!-- Info (✅) -->
            <div v-else-if="block.type === 'tip'" class="my-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg px-4 py-3 text-sm text-green-800">
              <span class="font-bold">{{ isWindowsTutorial ? 'Resultat :' : 'A retenir :' }}</span> {{ block.text }}
            </div>

            <!-- Étape numérotée -->
            <div v-else-if="block.type === 'step'" class="flex items-start gap-3 my-2">
              <span class="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold mt-0.5">{{ block.num }}</span>
              <p class="text-gray-700 text-sm sm:text-base leading-relaxed">{{ block.text }}</p>
            </div>

            <!-- Texte normal -->
            <p v-else class="text-gray-700 text-sm sm:text-base leading-relaxed my-2 whitespace-pre-wrap">{{ block.text }}</p>
          </div>
        </article>

        <!-- Navigation Precedent / Suivant -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-12 pt-6 border-t border-gray-200 gap-3">
          <button
            v-if="currentSection > 0"
            @click="goToSection(currentSection - 1)"
            class="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md transition cursor-pointer group text-left sm:flex-1 sm:max-w-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 group-hover:text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
            <div class="min-w-0">
              <div class="text-xs text-gray-400">Precedent</div>
              <div class="text-sm font-bold text-gray-700 truncate">{{ cleanTitle(course.sections[currentSection - 1].title) }}</div>
            </div>
          </button>
          <div v-else></div>

          <button
            v-if="currentSection < course.sections.length - 1"
            @click="goToSection(currentSection + 1)"
            class="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:shadow-md transition cursor-pointer group text-right sm:flex-1 sm:max-w-xs sm:ml-auto"
          >
            <div class="min-w-0 flex-1">
              <div class="text-xs text-indigo-400">Suivant</div>
              <div class="text-sm font-bold text-indigo-700 truncate">{{ cleanTitle(course.sections[currentSection + 1].title) }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </button>

          <!-- Bouton terminé si dernière section -->
          <button
            v-if="currentSection === course.sections.length - 1"
            @click="$emit('back')"
            class="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:shadow-lg transition cursor-pointer ml-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            Termine !
          </button>
        </div>
      </main>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const props = defineProps({ course: Object });
defineEmits(['back']);

const currentSection = ref(0);
const sidebarOpen = ref(false);
const readSections = ref(new Set([0]));
const copied = ref('');
const mode = ref('gui'); // 'gui' ou 'ps'
const configOpen = ref(false);
const configPromptShown = ref(false);

// Valeurs par defaut du tutoriel (celles de l'auteur)
const defaults = {
  serverName: 'CHEIKH',
  serverIP: '192.168.10.1',
  clientName: 'PC-BB37',
  clientIP: '192.168.10.10',
  domain: 'keinde.com',
  netbios: 'KEINDE',
  password: 'passer@1',
  company: 'Keinde SA'
};

// Config personnalisee de l'utilisateur
const userConfig = reactive({
  serverName: '',
  serverIP: '',
  clientName: '',
  clientIP: '',
  domain: '',
  netbios: '',
  password: '',
  company: ''
});

const STORAGE_CONFIG_KEY = 'tutorial-user-config';

const loadConfig = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_CONFIG_KEY));
    if (saved) Object.assign(userConfig, saved);
  } catch {}
};

const saveConfig = () => {
  localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify({ ...userConfig }));
};

const resetConfig = () => {
  Object.keys(userConfig).forEach(k => { userConfig[k] = ''; });
  localStorage.removeItem(STORAGE_CONFIG_KEY);
};

const hasCustomConfig = computed(() => {
  return Object.values(userConfig).some(v => v.trim() !== '');
});

// Remplace les valeurs par defaut par les valeurs personnalisees
const adaptText = (text) => {
  if (!hasCustomConfig.value) return text;
  let result = text;
  const map = [
    // Ordre important : FQDN avant le domaine court, noms longs avant courts
    [defaults.serverName + '.' + defaults.domain, (userConfig.serverName || defaults.serverName) + '.' + (userConfig.domain || defaults.domain)],
    [defaults.domain, userConfig.domain || defaults.domain],
    // DC=keinde,DC=com → recalculer
    ['DC=keinde,DC=com', (userConfig.domain || defaults.domain).split('.').map(p => 'DC=' + p).join(',')],
    [defaults.serverName, userConfig.serverName || defaults.serverName],
    [defaults.serverName.toLowerCase(), (userConfig.serverName || defaults.serverName).toLowerCase()],
    [defaults.clientName, userConfig.clientName || defaults.clientName],
    [defaults.serverIP, userConfig.serverIP || defaults.serverIP],
    [defaults.clientIP, userConfig.clientIP || defaults.clientIP],
    [defaults.netbios + '\\\\', (userConfig.netbios || defaults.netbios) + '\\\\'],
    [defaults.netbios + '\\', (userConfig.netbios || defaults.netbios) + '\\'],
    [defaults.password, userConfig.password || defaults.password],
    [defaults.company, userConfig.company || defaults.company],
  ];
  for (const [from, to] of map) {
    if (from !== to) {
      result = result.split(from).join(to);
    }
  }
  return result;
};

onMounted(loadConfig);

const currentSectionData = computed(() => props.course.sections[currentSection.value]);
const activeContent = computed(() => {
  const s = currentSectionData.value;
  if (mode.value === 'ps' && s.contentPS) return s.contentPS;
  if (s.contentGUI) return s.contentGUI;
  return s.content || '';
});
const progressPct = computed(() => Math.round(((currentSection.value + 1) / props.course.sections.length) * 100));

const goToSection = (idx) => {
  currentSection.value = idx;
  readSections.value.add(idx);
  sidebarOpen.value = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cleanTitle = (title) => {
  return title.replace(/^(PHASE|ETAPE)\s+\d+\s*[—–-]\s*/i, '');
};

const isWindowsTutorial = computed(() => {
  return props.course.title && props.course.title.toLowerCase().includes('windows');
});

const stepLabel = computed(() => {
  if (!props.course.sections || !props.course.sections.length) return 'Phase';
  const first = props.course.sections[0].title || '';
  return /^ETAPE/i.test(first) ? 'Etape' : 'Phase';
});

const estimateTime = (content) => {
  const words = content.split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 150));
};

const copyCode = (text) => {
  // Si pas de config perso et jamais montre le prompt → ouvrir le panneau
  if (!hasCustomConfig.value && !configPromptShown.value) {
    configPromptShown.value = true;
    configOpen.value = true;
    // Copier quand meme avec les valeurs par defaut
  }
  const adapted = adaptText(text);
  navigator.clipboard.writeText(adapted);
  copied.value = text;
  setTimeout(() => { copied.value = ''; }, 2000);
};

const parseContent = (content) => {
  const lines = content.split('\n');
  const blocks = [];
  let codeBuffer = [];
  let inCode = false;

  const flushCode = () => {
    if (codeBuffer.length > 0) {
      blocks.push({ type: 'code', text: codeBuffer.join('\n') });
      codeBuffer = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Ligne vide
    if (trimmed === '') {
      if (inCode) { flushCode(); inCode = false; }
      continue;
    }

    // Sous-titre ━━━
    if (trimmed.startsWith('━━━')) {
      if (inCode) { flushCode(); inCode = false; }
      const heading = trimmed.replace(/━/g, '').trim();
      blocks.push({ type: 'heading', text: heading });
      continue;
    }

    // Avertissement ⚠️
    if (trimmed.startsWith('⚠️') || trimmed.startsWith('⚠')) {
      if (inCode) { flushCode(); inCode = false; }
      blocks.push({ type: 'warning', text: trimmed.replace(/^⚠️?\s*/, '') });
      continue;
    }

    // Tip ✅
    if (trimmed.startsWith('✅')) {
      if (inCode) { flushCode(); inCode = false; }
      blocks.push({ type: 'tip', text: trimmed.replace(/^✅\s*/, '') });
      continue;
    }

    // Ligne de commande (commence par > ou $ ou des cmdlets PS reconnaissables)
    if (/^\s*(>|PS>|\$)\s+/.test(line) || /^\s*(Get-|Set-|New-|Add-|Remove-|Test-|Restart-|Stop-|Start-|Enable-|Disable-|Install-|Unlock-|Search-|Clear-|Export-|Import-|Invoke-|Out-|Select-|Where-|ForEach|Format-|Write-|Measure-|Sort-)/.test(trimmed)
        || /^\s*(ipconfig|nslookup|gpupdate|gpresult|dcdiag|repadmin|wbadmin|nltest|systeminfo|query|logoff|net use|ping|tracert)\b/.test(trimmed)) {
      if (!inCode) { inCode = true; }
      codeBuffer.push(trimmed.replace(/^\s*>\s+/, ''));
      continue;
    }

    // Étape numérotée : "1. " ou "2. "
    const stepMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (stepMatch) {
      if (inCode) { flushCode(); inCode = false; }
      blocks.push({ type: 'step', num: stepMatch[1], text: stepMatch[2] });
      continue;
    }

    // Ligne indentée qui ressemble à du code / chemin (pas du texte avec → « » ❌ ☐)
    if (/^\s{3,}/.test(line) && !(/[→←«»❌☐☑\u2014\u2013]/.test(trimmed)) && (/[\\{}|>$=]/.test(trimmed) || /^\w+\s*:.*\|/.test(trimmed) || /^[A-Z]:\\/.test(trimmed) || /^\d+\.\d+\.\d+/.test(trimmed))) {
      if (!inCode) { inCode = true; }
      codeBuffer.push(trimmed);
      continue;
    }

    // Continuation de code si on est déjà en mode code et que la ligne est indentée
    if (inCode && /^\s{3,}/.test(line)) {
      codeBuffer.push(trimmed);
      continue;
    }

    // Texte normal
    if (inCode) { flushCode(); inCode = false; }
    blocks.push({ type: 'text', text: trimmed });
  }
  if (inCode) { flushCode(); }

  return blocks;
};
</script>

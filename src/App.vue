<template>
  <div class="container">
    <div v-if="state === 'error'">
      <p>
      Impossible de charger le quiz.
      </p>
    </div>
    <div :aria-busy="state === 'loading'">
      <Quiz :quiz="quiz" v-if="quiz" />
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import Quiz from './components/quiz.vue';

const quiz = ref(null);
const state = ref('loading');

onMounted(()=>{
  fetch('quiz.json')
    .then(reponse => {
      if(reponse.ok) {
        return reponse.json();
      }
      throw new Error('Erreur de chargement du quiz');
    })
    .then(data => {
      quiz.value = data;
      state.value = 'idle';
    })
    .catch(error => {
      console.error(error);
    })
})



</script>


<style scoped></style>
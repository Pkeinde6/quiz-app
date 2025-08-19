<template>
  <div class="quiz-card">
    <div class="quiz-question-title">
      {{ task.question }}
    </div>

    <ul class="quiz-choices">
      <li
        v-for="choice in task.choices"
        :key="choice"
        class="quiz-choice-item"
      >
        <label class="quiz-choice">
          <input
            type="radio"
            name="answer"
            :value="choice"
            v-model="selected"
          />
          {{ choice }}
        </label>
      </li>
    </ul>

    <button
      class="quiz-btn"
      @click="validate"
      :disabled="!selected"
    >
      Valider
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  task: Object,
});
const emit = defineEmits(['answer']);
const selected = ref('');

const validate = () => {
  emit('answer', selected.value);
};

</script>

<style scoped>
.quiz-card {
  border: 1px solid #868585;
  background-color: #f1e6e6;
  color: #000000;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 2rem auto;
}

.quiz-question-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.quiz-choices {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.quiz-choice-item {
  margin-bottom: 0.75rem;
}

.quiz-choice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  cursor: pointer;
}

.quiz-btn {
  background-color: #7f7191;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.quiz-btn:hover:enabled {
  background-color: #000000;
}

.quiz-btn:hover:enabled {
  background-color: #000000;
  transform: scale(1.05);
  color: #ffffff;
}

.quiz-btn:disabled {
  background-color: #a09999;
  cursor: not-allowed;
}
</style>

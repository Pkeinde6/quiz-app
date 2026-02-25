<template>
  <div class="written-card">
    <div class="written-question-title">
      {{ task.question }}
    </div>

    <div class="written-hint" v-if="showHint && task.hint">
      <span class="hint-icon">💡</span> Indice : <strong>{{ task.hint }}</strong>
    </div>

    <button
      v-if="!showHint && task.hint"
      class="hint-btn"
      @click="showHint = true"
    >
      Voir l'indice
    </button>

    <div class="written-input-group">
      <input
        type="text"
        class="written-input"
        v-model="typed"
        placeholder="Tape ta commande ici..."
        @keyup.enter="validate"
        ref="inputRef"
      />
    </div>

    <button
      class="written-btn"
      @click="validate"
      :disabled="!typed.trim()"
    >
      Valider
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  task: Object,
});
const emit = defineEmits(['answer']);
const typed = ref('');
const showHint = ref(false);
const inputRef = ref(null);

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

const validate = () => {
  if (typed.value.trim()) {
    emit('answer', typed.value.trim());
  }
};
</script>

<style scoped>
.written-card {
  border: 1px solid #868585;
  background-color: #e6eef1;
  color: #000000;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 2rem auto;
}

.written-question-title {
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  font-weight: bold;
  color: #1a1a2e;
}

.written-hint {
  background: #fff8e1;
  border: 1px solid #ffe082;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
  color: #6d4c00;
}

.hint-icon {
  margin-right: 0.3rem;
}

.hint-btn {
  background: transparent;
  border: 1px dashed #bbb;
  color: #888;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-bottom: 1.2rem;
  transition: all 0.2s ease;
}

.hint-btn:hover {
  border-color: #8e80ff;
  color: #8e80ff;
}

.written-input-group {
  margin-bottom: 1.5rem;
}

.written-input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-family: 'Courier New', Courier, monospace;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: #fff;
  color: #222;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.written-input:focus {
  outline: none;
  border-color: #8e80ff;
  box-shadow: 0 0 0 3px rgba(142, 128, 255, 0.15);
}

.written-btn {
  background-color: #2c3e50;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;
}

.written-btn:hover:enabled {
  background-color: #1a252f;
  transform: scale(1.05);
}

.written-btn:disabled {
  background-color: #a09999;
  cursor: not-allowed;
}
</style>

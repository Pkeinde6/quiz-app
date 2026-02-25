<template>
  <div class="course-wrapper">
    <button class="back-btn" @click="$emit('back')">← Retour</button>
    <h1 class="course-title">{{ course.icon }} {{ course.title }}</h1>
    <div class="sections">
      <div v-for="(section, idx) in course.sections" :key="idx" class="section-card">
        <h3 class="section-title">{{ idx + 1 }}. {{ section.title }}</h3>
        <pre class="section-content">{{ section.content }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  course: Object
});
defineEmits(['back']);
</script>

<style scoped>
.course-wrapper {
  font-family: 'Montserrat', sans-serif;
}

.back-btn {
  background: #eee;
  border: 1px solid #ddd;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
}

.back-btn:hover {
  background: #ddd;
  color: #222;
}

.course-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 2rem;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.section-card {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  transition: all 0.2s ease;
}

.section-card:hover {
  border-color: #8e80ff;
  box-shadow: 0 4px 16px rgba(142, 128, 255, 0.1);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.8rem;
  border-bottom: 2px solid #8e80ff;
  padding-bottom: 0.4rem;
}

.section-content {
  font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  font-size: 0.88rem;
  line-height: 1.7;
  color: #2d2d2d;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  white-space: pre-wrap;
  word-break: break-word;
  border: 1px solid #eee;
  margin: 0;
}
</style>

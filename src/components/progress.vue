<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-bold uppercase tracking-wider text-muted">Question {{ current }} / {{ max }}</span>
      <span class="text-xs font-bold text-brand">{{ Math.round((current / max) * 100) }}%</span>
    </div>
    <div class="flex gap-1">
      <div v-for="i in max" :key="i" class="h-1.5 flex-1 rounded-full transition-colors duration-300"
        :class="i < current ? 'bg-brand' : i === current ? 'bg-sun' : 'bg-line'"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  max: Number,
  current: Number
});
</script>

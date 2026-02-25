<template>
  <div class="mb-5">
    <div class="flex items-center justify-between mb-1.5">
      <span class="text-xs font-semibold text-gray-500">Question {{ current }} / {{ max }}</span>
      <span class="text-xs font-semibold text-indigo-500">{{ Math.round((current / max) * 100) }}%</span>
    </div>
    <div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
        :style="{ width: (current / max * 100) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  max: Number,
  current: Number
});
</script>
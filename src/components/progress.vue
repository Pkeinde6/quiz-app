<template>
    <div>
        etape {{ current }} / {{ max }}
        <progress :max="max" :value="current"></progress>
    </div>
</template>
<script setup>

defineProps({
    max:Number,
    current:Number
})

</script>
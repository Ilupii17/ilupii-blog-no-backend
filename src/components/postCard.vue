<template>
  <div class="p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md hover:bg-gray-750 transition">
    <h3 class="text-xl font-bold text-white">{{ title }}</h3>
    <!-- Ganti excerpt jadi description -->
    <p class="text-gray-300 mt-2 text-sm">{{ description }}</p>
    <router-link :to="`/post/${slug}`" class="text-blue-400 hover:underline mt-3 inline-block">
      Read more →
    </router-link>
  </div>
</template>

<script setup>
// Ganti excerpt jadi description
defineProps(['title', 'description', 'slug']);
</script>
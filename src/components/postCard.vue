<template>
  <div class="p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md hover:bg-gray-750 transition">
    <h3 class="text-xl font-bold text-white">{{ title }}</h3>
    <!-- Tambahin div buat date & description -->
    <div class="mt-2">
      <p class="text-gray-400 text-xs">{{ formatDate(date) }}</p>
      <p class="text-gray-300 mt-1 text-sm">{{ description }}</p>

      <div v-if="tags && tags.length" class="mt-2 flex flex-wrap gap-1">
        <span
          v-for="tag in tags"
          :key="tag"
          class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
    <router-link :to="`/post/${slug}`" class="text-blue-400 hover:underline mt-3 inline-block">
      Read more →
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['title', 'description', 'slug', 'date','tags']);

// Fungsi format tanggal
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
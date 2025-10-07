<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-6">WriteUp</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Kirim description ke PostCard -->
      <PostCard
        v-for="post in posts"
        :key="post.slug"
        :title="post.title"
        :description="post.description"
        :slug="post.slug"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePosts } from '@/composables/usePosts';
import PostCard from '@/components/postCard.vue'; // Jangan lupa import

const { posts, loadPosts } = usePosts();

onMounted(() => {
  loadPosts();
});
</script>
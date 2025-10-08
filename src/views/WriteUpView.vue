<template>
  <div class="container mx-auto px-7 py-8">
    <!-- <h1 class="text-3xl font-bold text-white mb-7">WriteUp</h1> -->

    <!-- Atur grid biar card rata tengah -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <PostCard
        v-for="post in posts"
        :key="post.slug"
        :title="post.title"
        :description="post.description"
        :slug="post.slug"
        :date="post.date"
        :tags="post.tags"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePosts } from '@/composables/usePosts';
import PostCard from '@/components/postCard.vue';

const { posts, loadPosts } = usePosts();

onMounted(() => {
  loadPosts();
});
</script>
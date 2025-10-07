<template>
  <div class="container mx-auto px-4 py-8">
    <section class="max-w-2xl mx-auto text-center mb-8">
      <p class="text-lg leading-relaxed">
        Hi! I'm Ilupii. This is my blog where I post stuff I want to write about (mostly cybersecurity).
        I'm a CTF player that currently plays with LastSeenIn2026, and my main category is pwn.
      </p>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PostCard
        v-for="post in posts"
        :key="post.slug"
        :title="post.title"
        :excerpt="post.excerpt"
        :slug="post.slug"
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
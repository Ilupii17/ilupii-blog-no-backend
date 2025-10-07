<template>
  <div class="container mx-4 px-4 py-8">
    <PostDetail :slug="$route.params.slug" />
  </div>
</template>

<script setup>
import PostDetail from '@/components/postDetail.vue';
</script>
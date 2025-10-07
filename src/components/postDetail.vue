<template>
  <div v-if="loading" class="text-center py-8">
    <p>Loading...</p>
  </div>

  <div v-else-if="!post" class="text-center py-8">
    <p>Post not found.</p>
    <router-link to="/" class="text-blue-400 hover:underline">← Back to Home</router-link>
  </div>

  <article v-else class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-4">{{ post.title }}</h1>

    <!-- Container utama -->
    <div class="bg-gray-900 p-6 rounded-lg shadow-md">
      <!-- Prose + override style -->
      <div class="prose prose-invert max-w-none markdown-content">
        <div v-html="renderedContent"></div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// Hapus 'marked', ganti dengan 'markdown-it'
import MarkdownIt from 'markdown-it'; 
import { usePosts } from '@/composables/usePosts';

// Buat instance dari markdown-it
const md = new MarkdownIt();

const props = defineProps(['slug']);
const post = ref(null);
const renderedContent = ref('');
const loading = ref(true);

onMounted(async () => {
  try {
    const { findPostBySlug } = usePosts();
    const postData = await findPostBySlug(props.slug);

    if (postData && postData.content) {
      post.value = postData;
      // Gunakan md.render() untuk mengonversi Markdown
      renderedContent.value = md.render(postData.content);
    }
  } catch (error) {
    console.error('Gagal memuat atau merender post:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
/* Override style buat semua tag di dalam .markdown-content */
.markdown-content :deep(h1) {
  @apply text-3xl font-bold mt-8 mb-4 text-white border-b border-gray-700 pb-2;
}

.markdown-content :deep(h2) {
  @apply text-2xl font-bold mt-6 mb-3 text-white border-b border-gray-600 pb-1;
}

.markdown-content :deep(h3) {
  @apply text-xl font-semibold mt-5 mb-2 text-gray-200;
}

.markdown-content :deep(p) {
  @apply mb-4 leading-relaxed text-gray-300;
}

.markdown-content :deep(a) {
  @apply text-blue-400 hover:text-blue-300 underline transition;
}

.markdown-content :deep(ul), .markdown-content :deep(ol) {
  @apply ml-6 mb-4 list-disc text-gray-300;
}

.markdown-content :deep(li) {
  @apply mb-2;
}

.markdown-content :deep(pre) {
  @apply bg-gray-800 p-4 rounded-md overflow-x-auto my-4;
}

.markdown-content :deep(code) {
  @apply bg-gray-800 px-2 py-1 rounded text-sm font-mono;
}

.markdown-content :deep(blockquote) {
  @apply border-l-4 border-gray-500 pl-4 italic text-gray-300 my-4;
}

.markdown-content :deep(table) {
  @apply w-full border-collapse my-4;
}

.markdown-content :deep(th), .markdown-content :deep(td) {
  @apply border border-gray-700 p-2 text-gray-300;
}

.markdown-content :deep(img) {
  @apply max-w-full h-auto rounded-lg my-4;
}
</style>
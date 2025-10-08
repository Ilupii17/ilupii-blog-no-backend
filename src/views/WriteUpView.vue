<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-6">WriteUps</h1>

    <!-- Tampilin post -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <PostCard
        v-for="post in paginatedData.posts"
        :key="post.slug"
        :title="post.title"
        :description="post.description"
        :slug="post.slug"
        :date="post.date"
        :tags="post.tags"
      />
    </div>

    <!-- Pagination Controls -->
    <div v-if="paginatedData.totalPages > 1" class="flex justify-center items-center gap-2 mt-12">
      <!-- Tombol Previous -->
      <button
        @click="goToPage(paginatedData.currentPage - 1)"
        :disabled="!paginatedData.hasPrev"
        class="
          px-4 py-2 rounded-lg
          bg-gray-800 text-gray-300
          hover:bg-gray-700 hover:text-white
          disabled:opacity-50 disabled:cursor-not-allowed
          transition
        "
      >
        Previous
      </button>

      <!-- Nomor Halaman -->
      <div class="flex gap-1">
        <!-- Tombol halaman 1 -->
        <button
          v-if="paginatedData.totalPages > 1 && paginatedData.currentPage > 2"
          @click="goToPage(1)"
          class="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          1
        </button>

        <!-- Placeholder jika ada jarak -->
        <span v-if="paginatedData.currentPage > 3" class="px-3 py-2 text-gray-500">...</span>

        <!-- Tombol halaman sebelumnya -->
        <button
          v-if="paginatedData.hasPrev"
          @click="goToPage(paginatedData.currentPage - 1)"
          class="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          {{ paginatedData.currentPage - 1 }}
        </button>

        <!-- Halaman saat ini -->
        <button
          class="px-3 py-2 rounded-lg bg-blue-600 text-white"
          disabled
        >
          {{ paginatedData.currentPage }}
        </button>

        <!-- Tombol halaman setelahnya -->
        <button
          v-if="paginatedData.hasNext"
          @click="goToPage(paginatedData.currentPage + 1)"
          class="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          {{ paginatedData.currentPage + 1 }}
        </button>

        <!-- Placeholder jika ada jarak -->
        <span v-if="paginatedData.currentPage < paginatedData.totalPages - 2" class="px-3 py-2 text-gray-500">...</span>

        <!-- Tombol halaman terakhir -->
        <button
          v-if="paginatedData.totalPages > 1 && paginatedData.currentPage < paginatedData.totalPages - 1"
          @click="goToPage(paginatedData.totalPages)"
          class="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          {{ paginatedData.totalPages }}
        </button>
      </div>

      <!-- Tombol Next -->
      <button
        @click="goToPage(paginatedData.currentPage + 1)"
        :disabled="!paginatedData.hasNext"
        class="
          px-4 py-2 rounded-lg
          bg-gray-800 text-gray-300
          hover:bg-gray-700 hover:text-white
          disabled:opacity-50 disabled:cursor-not-allowed
          transition
        "
      >
        Next
      </button>
    </div>

    <!-- Info kalo gak ada post -->
    <div v-else-if="paginatedData.posts.length === 0" class="text-center py-8">
      <p class="text-gray-400">No posts found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '@/composables/usePosts';
import PostCard from '@/components/postCard.vue';

const route = useRoute();
const router = useRouter();
const { getPaginatedPosts } = usePosts();

const paginatedData = ref({
  posts: [],
  totalPages: 1,
  currentPage: 1,
  hasNext: false,
  hasPrev: false,
  totalPosts: 0,
});

const goToPage = (page) => {
  // Ganti query ?page= di URL
  router.push({ query: { ...route.query, page: page.toString() } });
};

// Fungsi buat load data sesuai halaman
const loadPage = async () => {
  const currentPage = parseInt(route.query.page) || 1;
  const data = await getPaginatedPosts(currentPage, 8); // 8 post per halaman
  paginatedData.value = data;
};

// Load data pertama kali
onMounted(async () => {
  await loadPage();
});

// Load ulang kalo query ?page= berubah
watch(() => route.query.page, async () => {
  await loadPage();
});
</script>
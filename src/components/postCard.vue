<template>
  <Transition name="fade-card" appear>
    <!-- Hapus @click dari sini -->
    <article
      class="
        group
        relative
        p-6
        border border-gray-700/50
        rounded-xl
        bg-gradient-to-br from-gray-800 to-gray-800/80
        shadow-lg
        hover:shadow-2xl
        hover:shadow-blue-500/10
        hover:border-gray-600
        hover:-translate-y-1
        transition-all
        duration-300
        ease-out
        cursor-pointer <!-- Gak masalah kalo tetep cursor-pointer, cuma buat UI -->
        overflow-hidden
        backdrop-blur-sm
      "
    >
      <!-- Subtle gradient overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-xl pointer-events-none"></div>
      
      <!-- Content wrapper -->
      <div class="relative z-10">
        <!-- Header with date -->
        <div class="flex items-start justify-between gap-3 mb-3">
          <h3 class="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-2 flex-1">
            {{ title }}
          </h3>
          <div class="flex-shrink-0">
            <time 
              v-if="date"
              :datetime="date" 
              class="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 whitespace-nowrap"
            >
              {{ formatDateShort(date) }}
            </time>
          </div>
        </div>

        <!-- Description -->
        <p class="text-gray-400 group-hover:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4 transition-colors duration-300">
          {{ description || 'No description available' }}
        </p>

        <!-- Tags -->
        <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in tags.slice(0, 3)"
            :key="tag"
            class="
              text-xs
              font-medium
              bg-gray-700/70
              text-gray-300
              px-2.5
              py-1
              rounded-md
              transition-all
              duration-300
              hover:bg-blue-600/80
              hover:text-white
              hover:scale-105
              backdrop-blur-sm
            "
          >
            #{{ tag }}
          </span>
          <span
            v-if="tags.length > 3"
            class="text-xs text-gray-500 px-2 py-1"
          >
            +{{ tags.length - 3 }}
          </span>
        </div>

        <!-- Read more link with icon -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-700/50 group-hover:border-gray-600 transition-colors duration-300">
          <!-- Tambahin @click.prevent di sini -->
          <span 
            class="text-sm text-blue-400 group-hover:text-blue-300 font-medium transition-colors duration-300 cursor-pointer"
            @click.prevent="navigateToPost"
          >
            Read article
          </span>
          <svg 
            class="w-5 h-5 text-blue-400 group-hover:text-blue-300 transform group-hover:translate-x-1 transition-all duration-300 cursor-pointer" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            @click.prevent="navigateToPost"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </article>
  </Transition>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: () => []
  }
});

const formatDateShort = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};

const navigateToPost = () => {
  router.push(`/post/${props.slug}`);
};
</script>


<style scoped>
/* Fade-in card with improved animation */
.fade-card-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-card-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-card-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.fade-card-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.95);
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
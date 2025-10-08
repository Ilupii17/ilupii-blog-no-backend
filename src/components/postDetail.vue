<template>
  <!-- Loading State with Shimmer -->
  <div v-if="loading" class="max-w-6xl mx-auto px-4 py-8">
    <div class="animate-pulse space-y-6">
      <!-- Back button skeleton -->
      <div class="h-6 bg-gray-700/50 rounded w-32 mb-8"></div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Content skeleton -->
        <div class="lg:col-span-3 space-y-4">
          <div class="h-10 bg-gray-700/50 rounded-lg w-3/4"></div>
          <div class="bg-gray-800/50 rounded-xl p-6 space-y-3">
            <div class="h-4 bg-gray-700/50 rounded w-full"></div>
            <div class="h-4 bg-gray-700/50 rounded w-5/6"></div>
            <div class="h-4 bg-gray-700/50 rounded w-4/6"></div>
            <div class="h-64 bg-gray-700/50 rounded-lg mt-6"></div>
          </div>
        </div>
        
        <!-- Sidebar skeleton -->
        <div class="lg:col-span-1 space-y-3">
          <div class="h-6 bg-gray-700/50 rounded w-32 mb-4"></div>
          <div class="h-4 bg-gray-700/50 rounded w-full"></div>
          <div class="h-4 bg-gray-700/50 rounded w-5/6 ml-4"></div>
          <div class="h-4 bg-gray-700/50 rounded w-4/6 ml-8"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="!post" class="max-w-2xl mx-auto px-4 py-16 text-center">
    <div class="bg-gray-800/50 rounded-2xl p-12 backdrop-blur-sm border border-gray-700/50">
      <svg class="w-20 h-20 mx-auto mb-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 class="text-2xl font-bold text-white mb-3">Post Not Found</h2>
      <p class="text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
      <router-link
        to="/writeup"
        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to WriteUps
      </router-link>
    </div>
  </div>

  <!-- Content with Fade-in -->
  <Transition name="fade" appear v-else>
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-sm">
          <li>
            <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
              Home
            </router-link>
          </li>
          <li class="text-gray-600">/</li>
          <li>
            <router-link to="/writeup" class="text-gray-400 hover:text-white transition-colors">
              WriteUps
            </router-link>
          </li>
          <li class="text-gray-600">/</li>
          <li class="text-gray-300 truncate">{{ post.title }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <article class="lg:col-span-3" ref="contentRef">
          <!-- Post Header -->
          <header class="mb-8">
            <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {{ post.title }}
            </h1>
            
            <!-- Post Meta -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <time v-if="post.date" :datetime="post.date" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(post.date) }}
              </time>
              
              <span v-if="readTime" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ readTime }} min read
              </span>
            </div>
          </header>

          <!-- Content Body -->
          <div class="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
            <div class="p-8 lg:p-10">
              <div class="prose prose-invert max-w-none markdown-content" v-html="renderedContent"></div>
            </div>
          </div>

          <!-- Navigation Footer -->
          <footer class="mt-8 pt-8 border-t border-gray-700/50">
            <router-link
              to="/writeup"
              class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 group"
            >
              <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all WriteUps
            </router-link>
          </footer>
        </article>

        <!-- Sidebar TOC -->
        <aside class="lg:col-span-1">
          <!-- Mobile TOC Toggle -->
          <div class="lg:hidden mb-4">
            <button
              @click="showToc = !showToc"
              class="w-full flex items-center justify-between py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 shadow-lg border border-gray-700/50"
            >
              <span class="flex items-center gap-2 font-medium">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Table of Contents
              </span>
              <svg 
                class="w-5 h-5 transition-transform duration-300" 
                :class="{ 'rotate-180': showToc }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- TOC Content -->
          <Transition name="slide-fade">
            <nav 
              v-show="showToc || isDesktop"
              class="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
              aria-label="Table of contents"
            >
              <div class="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 shadow-xl border border-gray-700/50 backdrop-blur-sm">
                <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  On This Page
                </h2>
                
                <ul class="space-y-1" v-if="toc.length > 0">
                  <li
                    v-for="heading in toc"
                    :key="heading.id"
                    :class="getIndentClass(heading.level)"
                    :ref="el => setHeadingRef(el, heading.id)"
                  >
                    <a
                      :href="`#${heading.id}`"
                      :class="{
                        'text-blue-400 font-semibold bg-blue-500/10 border-l-2 border-blue-400': activeId === heading.id,
                        'text-gray-400 hover:text-white hover:bg-gray-700/30 border-l-2 border-transparent': activeId !== heading.id
                      }"
                      class="block py-2 px-3 rounded-r transition-all duration-300 text-sm"
                      @click="handleTocClick"
                    >
                      {{ heading.text }}
                    </a>
                  </li>
                </ul>
                
                <p v-else class="text-gray-500 text-sm">No headings found</p>
              </div>
              
              <!-- Scroll to top button -->
              <button
                v-if="showScrollTop"
                @click="scrollToTop"
                class="hidden lg:block w-full mt-4 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 shadow-lg border border-gray-700/50 hover:shadow-blue-500/10 group"
              >
                <span class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Back to Top
                </span>
              </button>
            </nav>
          </Transition>
        </aside>
      </div>
    </div>
  </Transition>

  <!-- Image Lightbox -->
  <Transition name="lightbox">
    <div 
      v-if="showLightbox" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      @click="closeLightbox"
    >
      <!-- Close button -->
      <button
        @click="closeLightbox"
        class="absolute top-4 right-4 z-10 p-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Close lightbox"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Image container -->
      <div class="relative max-w-7xl max-h-full" @click.stop>
        <img 
          :src="lightboxImage?.src" 
          :alt="lightboxImage?.alt" 
          class="max-w-full max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl object-contain"
          @click.stop
        />
        <p v-if="lightboxImage?.alt" class="text-center text-gray-400 mt-4 text-sm">
          {{ lightboxImage.alt }}
        </p>
      </div>

      <!-- Hint text -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
        Click anywhere to close
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import MarkdownIt from 'markdown-it';
import { usePosts } from '@/composables/usePosts';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch {
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const props = defineProps(['slug']);
const post = ref(null);
const renderedContent = ref('');
const loading = ref(true);
const contentRef = ref(null);
const toc = ref([]);
const activeId = ref('');
const showToc = ref(false);
const showScrollTop = ref(false);
const headingElements = ref({});
const lightboxImage = ref(null);
const showLightbox = ref(false);

const isDesktop = computed(() => {
  return window.innerWidth >= 1024;
});

const readTime = computed(() => {
  if (!post.value?.contentWithoutFrontmatter) return null;
  const words = post.value.contentWithoutFrontmatter.split(/\s+/).length;
  return Math.ceil(words / 200); // Average reading speed
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const generateId = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const generateToc = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const headings = tempDiv.querySelectorAll('h1, h2, h3');
  const tocItems = [];

  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent.trim();
    const id = generateId(text);

    heading.id = id;
    heading.classList.add('scroll-mt-24');

    tocItems.push({ id, text, level });
  });

  renderedContent.value = tempDiv.innerHTML;
  return tocItems;
};

const getIndentClass = (level) => {
  if (level === 2) return 'ml-2';
  if (level === 3) return 'ml-4';
  return '';
};

const setHeadingRef = (el, id) => {
  if (el) {
    headingElements.value[id] = el;
  }
};

const onScroll = () => {
  const scrollPosition = window.scrollY + 150;
  showScrollTop.value = window.scrollY > 400;

  const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
  let current = '';

  for (const heading of headings) {
    const elementTop = heading.offsetTop;
    if (elementTop <= scrollPosition) {
      current = heading.id;
    }
  }

  if (current !== activeId.value) {
    activeId.value = current;
  }
};

const handleTocClick = (event) => {
  event.preventDefault();
  const targetId = event.target.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  // Close mobile TOC after click
  if (window.innerWidth < 1024) {
    showToc.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const openLightbox = (src, alt) => {
  lightboxImage.value = { src, alt };
  showLightbox.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  showLightbox.value = false;
  lightboxImage.value = null;
  document.body.style.overflow = 'auto';
};

const setupImageClickHandlers = () => {
  setTimeout(() => {
    const images = document.querySelectorAll('.markdown-content img');
    // console.log('Found images:', images.length); // Debug
    images?.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log('Image clicked:', img.src); // Debug
        openLightbox(img.src, img.alt);
      });
    });
  }, 300);
};

onMounted(async () => {
  try {
    const { findPostBySlug } = usePosts();
    const postData = await findPostBySlug(props.slug);

    if (postData && postData.contentWithoutFrontmatter) {
      post.value = postData;
      const rawHtml = md.render(postData.contentWithoutFrontmatter);
      toc.value = generateToc(rawHtml);
      
      // Wait for next tick to ensure DOM is updated
      await nextTick();
      setupImageClickHandlers();
      
      window.addEventListener('scroll', onScroll);
    }
  } catch (error) {
    console.error('Failed to load post:', error);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  document.body.style.overflow = 'auto';
});
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Fade for TOC */
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Lightbox Transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active img,
.lightbox-leave-active img {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.lightbox-enter-from img {
  transform: scale(0.8);
}

.lightbox-leave-to img {
  transform: scale(0.9);
}

/* Custom scrollbar for TOC */
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
  border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.7);
}
</style>

<style>
/* Markdown Content Styling */
.markdown-content :deep(h1) {
  @apply text-3xl font-bold mt-8 mb-4 text-white border-b-2 border-gray-700 pb-3;
}

.markdown-content :deep(h2) {
  @apply text-2xl font-bold mt-8 mb-3 text-white border-b border-gray-700 pb-2;
}

.markdown-content :deep(h3) {
  @apply text-xl font-semibold mt-6 mb-2 text-gray-100;
}

.markdown-content :deep(p) {
  @apply mb-5 leading-relaxed text-gray-300;
}

.markdown-content :deep(a) {
  @apply text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300 transition-all underline-offset-2;
}

.markdown-content :deep(ul), 
.markdown-content :deep(ol) {
  @apply ml-6 mb-5 space-y-2 text-gray-300;
}

.markdown-content :deep(ul) {
  @apply list-disc;
}

.markdown-content :deep(ol) {
  @apply list-decimal;
}

.markdown-content :deep(li) {
  @apply leading-relaxed;
}

.markdown-content :deep(li)::marker {
  @apply text-blue-400;
}

.markdown-content :deep(.hljs) {
  @apply bg-gray-900 p-5 rounded-xl overflow-x-auto my-6 border border-gray-700/50 shadow-lg !important;
}

.markdown-content :deep(.hljs code) {
  @apply p-0 bg-transparent !important;
}

.markdown-content :deep(code) {
  @apply bg-gray-800 px-2 py-0.5 rounded text-sm font-mono text-blue-300;
}

.markdown-content :deep(pre code) {
  @apply bg-transparent px-0 py-0 text-gray-300;
}

.markdown-content :deep(blockquote) {
  @apply border-l-4 border-blue-500 pl-5 py-2 italic text-gray-300 my-6 bg-blue-500/5 rounded-r-lg;
}

.markdown-content :deep(table) {
  @apply w-full border-collapse my-6 rounded-lg overflow-hidden;
}

.markdown-content :deep(th) {
  @apply border border-gray-700 bg-gray-800 p-3 text-gray-200 font-semibold text-left;
}

.markdown-content :deep(td) {
  @apply border border-gray-700 p-3 text-gray-300;
}

.markdown-content :deep(tr:hover) {
  @apply bg-gray-800/30;
}

.markdown-content :deep(img) {
  @apply max-w-full h-auto rounded-xl my-6 shadow-lg border border-gray-700/50 cursor-zoom-in hover:opacity-90 transition-opacity duration-300;
}

.markdown-content :deep(hr) {
  @apply my-8 border-gray-700;
}

.markdown-content :deep(strong) {
  @apply text-white font-bold;
}

.markdown-content :deep(em) {
  @apply text-gray-300 italic;
}
</style>
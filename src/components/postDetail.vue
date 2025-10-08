<template>
  <div v-if="loading" class="text-center py-8">
    <!-- Shimmer Loading -->
    <div class="animate-pulse">
      <div class="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-6"></div>
      <div class="h-4 bg-gray-700 rounded w-5/6 mx-auto mb-2"></div>
      <div class="h-4 bg-gray-700 rounded w-4/6 mx-auto mb-2"></div>
      <div class="h-4 bg-gray-700 rounded w-3/6 mx-auto mb-4"></div>
      <div class="h-64 bg-gray-700 rounded w-full mx-auto"></div>
    </div>
  </div>

  <div v-else-if="!post" class="text-center py-8">
    <p>Post not found.</p>
    <router-link to="/writeup" class="text-blue-400 hover:underline">← Back to WriteUp</router-link>
  </div>

  <!-- Fade-in konten -->
  <Transition name="fade" appear v-else>
    <div class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Back Button -->
      <div class="lg:col-span-4 mb-6">
        <router-link
          to="/writeup"
          class="text-blue-400 hover:text-blue-300 hover:underline flex items-center transition duration-300"
        >
          ← Back to WriteUp
        </router-link>
      </div>

      <!-- Content -->
      <article class="lg:col-span-3" ref="contentRef">
        <h1 class="text-3xl font-bold text-white mb-4">{{ post.title }}</h1>
        <div class="bg-gray-900 p-6 rounded-lg shadow-md">
          <div class="prose prose-invert max-w-none" v-html="renderedContent"></div>
        </div>
      </article>

      <!-- Sidebar TOC (Collapsible di mobile) -->
      <aside class="lg:col-span-1">
        <!-- Tombol buka/tutup TOC (muncul di mobile) -->
        <div class="lg:hidden mb-4">
          <button
            @click="showToc = !showToc"
            class="w-full text-left py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {{ showToc ? 'Hide' : 'Show' }} Table of Contents
          </button>
        </div>

        <!-- TOC (hidden di mobile kalo showToc false) -->
        <div :class="{ 'hidden': !showToc, 'block': showToc }" class="lg:block sticky top-4 self-start">
          <h2 class="text-xl font-bold text-white mb-4">Table of Contents</h2>
          <ul class="space-y-2">
            <li
              v-for="heading in toc"
              :key="heading.id"
              :class="getIndentClass(heading.level)"
              :ref="el => setHeadingRef(el, heading.id)"
            >
              <a
                :href="`#${heading.id}`"
                :class="{
                  'text-blue-400 font-medium bg-blue-900/20 px-2 py-1 rounded': activeId === heading.id,
                  'text-gray-300 hover:text-white': activeId !== heading.id
                }"
                class="block transition duration-300 hover:bg-gray-800/50 rounded px-2 py-1"
                @click="handleTocClick"
              >
                {{ heading.text }}
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
const showToc = ref(false); // State buat toggle TOC di mobile
const headingElements = ref({});

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
    // Tambahin offset buat scroll behavior
    heading.classList.add('scroll-mt-20');

    tocItems.push({ id, text, level });
  });

  renderedContent.value = tempDiv.innerHTML;

  return tocItems;
};

const getIndentClass = (level) => {
  if (level === 2) return 'ml-4';
  if (level === 3) return 'ml-8';
  return '';
};

const setHeadingRef = (el, id) => {
  if (el) {
    headingElements.value[id] = el;
  }
};

const onScroll = () => {
  const scrollPosition = window.scrollY + 200;

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
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

onMounted(async () => {
  try {
    const { findPostBySlug } = usePosts();
    const postData = await findPostBySlug(props.slug);

    if (postData && postData.contentWithoutFrontmatter) {
      post.value = postData;
      // Pastikan pake query: '?raw' di usePosts.js
      const rawHtml = md.render(postData.contentWithoutFrontmatter);

      toc.value = generateToc(rawHtml);

      window.addEventListener('scroll', onScroll);
    }
  } catch (error) {
    console.error('Gagal memuat atau merender post:', error);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
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

/* Ganti style pre & code buat highlight.js */
.markdown-content :deep(.hljs) {
  @apply bg-gray-800 p-4 rounded-md overflow-x-auto my-4 !important;
}

.markdown-content :deep(.hljs code) {
  @apply p-0 !important;
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
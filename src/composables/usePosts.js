// src/composables/usePosts.js
import { ref } from 'vue';

const posts = ref([]);

export function usePosts() {
  const loadPosts = async () => {
    if (posts.value.length) return posts.value;

    const modules = import.meta.glob('/src/posts/*.md', { as: 'raw' });
    const postList = [];

    for (const path in modules) {
      const content = await modules[path]();
      const slug = path.replace('/src/posts/', '').replace('.md', '');
      const lines = content.split('\n');
      const title = lines.find(line => line.startsWith('# '))?.replace('# ', '') || 'Untitled';
      const excerpt = content.substring(0, 100) + '...';

      postList.push({ slug, title, excerpt, content });
    }

    posts.value = postList;
    return posts.value;
  };

  const findPostBySlug = async (slug) => {
    const allPosts = await loadPosts();
    return allPosts.find(post => post.slug === slug);
  };

  return { posts, loadPosts, findPostBySlug };
}
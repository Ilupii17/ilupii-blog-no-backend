import { ref } from 'vue';

const posts = ref([]);

export function usePosts() {
  const loadPosts = async () => {
    if (posts.value.length) return posts.value;

    const modules = import.meta.glob('/src/posts/*.md', { as: 'raw' });
    const postList = [];

    for (const path in modules) {
      const rawContent = await modules[path]();
      const slug = path.replace('/src/posts/', '').replace('.md', '');

      let title = 'Untitled';
      let description = '';
      let date = null;
      let tags = [];
      let contentWithoutFrontmatter = rawContent;

      // Cek apakah ada frontmatter
      if (rawContent.startsWith('---')) {
        const frontmatterEnd = rawContent.indexOf('---', 3);
        if (frontmatterEnd > -1) {
          const frontmatter = rawContent.slice(3, frontmatterEnd);
          const lines = frontmatter.split('\n');
          for (const line of lines) {
            if (line.trim().startsWith('title:')) {
              title = line.replace('title:', '').trim().replace(/^["']|["']$/g, '');
            }
            if (line.trim().startsWith('description:')) {
              description = line.replace('description:', '').trim().replace(/^["']|["']$/g, '');
            }
            if (line.trim().startsWith('date:')) {
              date = line.replace('date:', '').trim();
            }
            if (line.trim().startsWith('tags:')) {
                try {
                    tags = JSON.parse(line.replace('tags:','').trim())
                } catch {
                    tags = line.replace('tags:', '').trim().replace(/\[|\]/g, '').split(',').map(t => t.trim());
                }
            }
          }
          contentWithoutFrontmatter = rawContent.slice(frontmatterEnd + 3).trim();
        }
      }

      if (!description) {
        description = contentWithoutFrontmatter.substring(0, 100) + '...';
      }

      postList.push({
        slug,
        title,
        description,
        date,
        tags,
        content: rawContent,
        contentWithoutFrontmatter,
      });
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
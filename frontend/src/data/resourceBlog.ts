export type ResourceBlogPostSection = {
  heading: string;
  paragraphs: string[];
};

export type ResourceBlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  h1?: string;
  intro: string[];
  sections: ResourceBlogPostSection[];
};

export const resourceBlogPosts: ResourceBlogPost[] = [];

export function getResourceBlogPost(slug: string) {
  return resourceBlogPosts.find((post) => post.slug === slug);
}

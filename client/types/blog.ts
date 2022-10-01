export interface Post {
  _id: string;
  likes: string;
  likedBy: string[];
  createdAt: Date;
  userId: string;
  title: string;
  description: string;
  markdown: string;
  slug: string;
  sanitizedHTML: string;
}

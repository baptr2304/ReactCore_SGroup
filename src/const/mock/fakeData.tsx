import type { IAuthor, ICategories, IPost } from "@/const/type/postType";

export const mockPosts: IPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 15",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categories: { name: "Development" },
    content:
      "Learn about the latest features and improvements in Next.js 15, including enhanced performance and new developer tools.",
    author: {
      id: "4",
      name: "Dannn",
      value: "Dannn",
    },
    createdAt: "2023-07-01T10:00:00Z",
    lastReadAt: "6 min read",
  },
  {
    id: "2",
    title: "The Future of Web Development",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categories: { name: "Technology" },
    content:
      "Exploring emerging trends and technologies that will shape the future of web development in the coming years.",
    author: {
      id: "3",
      name: "Sarah Drasner",
      value: "Sarah Drasner",
    },
    createdAt: "2023-06-20T14:00:00Z",
    lastReadAt: "6 min read",
  },
  {
    id: "3",
    title: "TBuilding Responsive Layouts with CSS Grid",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categories: { name: "Design" },
    content:
      "Learn about the latest features and improvements in Next.js 15, including enhanced performance and new developer tools.",
    author: {
      id: "3",
      name: "Sarah Drasner",
      value: "Sarah Drasner",
    },
    createdAt: "2023-07-01T10:00:00Z",
    lastReadAt: "6 min read",
  },
  {
    id: "4",
    title: "JavaScript Performance Optimization Tips",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categories: { name: "Technology" },
    content:
      "Exploring emerging trends and technologies that will shape the future of web development in the coming years.",
    author: {
      id: "3",
      name: "Sarah Drasner",
      value: "Sarah Drasner",
    },
    createdAt: "2023-06-20T14:00:00Z",
    lastReadAt: "6 min read",
  },
  {
    id: "5",
    title: "UX Design Principles for Developers",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categories: { name: "Development" },
    content:
      "Exploring emerging trends and technologies that will shape the future of web development in the coming years.",
    author: {
      id: "2",
      name: "Dan Abramov",
      value: "Dan Abramov",
    },
    createdAt: "2023-07-01T10:00:00Z",
    lastReadAt: "6 min read",
  },
  {
    id: "6",
    title: "Introduction to TypeScript",
    thumbnailURL:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F15t6fr44mdl8vd73pdpm.png",
    categories: { name: "Technology" },
    content:
      "Learn about the latest features and improvements in Next.js 15, including enhanced performance and new developer tools.",
    author: {
      id: "1",
      value: "Bap Truong",
      name: "Bap Truong",
    },
    createdAt: "2023-06-20T14:00:00Z",
    lastReadAt: "6 min read",
  },
];
export const onlyAuthor: IAuthor[] = [
  {
    id: "1",
    name: "Bap Truong",
    value: "Bap Truong",
  },
  {
    id: "2",
    name: "Dan Abramov",
    value: "Dan Abramov",
  },
  {
    id: "3",
    name: "Sarah Drasner",
    value: "Sarah Drasner",
  },
  {
    id: "4",
    name: "Dannn",
    value: "Dannn",
  },
];

export const onlyCategories: ICategories[] = [
  {
    name: "Technology",
  },
  {
    name: "Development",
  },
  {
    name: "Design",
  },
];

export interface IAuthor {
  name: string;
  value: string;
  id: string;
}
export interface IPost {
  id: string;
  title: string;
  thumbnailURL: string;
  categories: ICategories;
  content: string;
  author: IAuthor;
  createdAt: string;
  lastReadAt: string;
}
export interface ICategories {
  name: string;
}

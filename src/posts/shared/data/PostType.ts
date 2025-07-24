export interface Author {
    name: string;
    value: string;
    id: string;
}
export interface Post {
    id: string;
    title: string;
    thumbnailURL: string;
    categories: Categories;
    content: string;
    author: Author;
    createdAt: string;
    lastReadAt: string;
}
export interface Categories {
    name: string;
}

import { mockPosts, onlyAuthor, onlyCategories } from "@/const/mock/fakeData";
import type { IAuthor, ICategories, IPost } from "@/const/type/postType";

export const fetchPostList = (): Promise<IPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPosts);
        }, 1200);
    });
};

export const fetchAuthorList = (): Promise<IAuthor[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(onlyAuthor);
        }, 1200);
    });
};

export const fetchCategoriesList = (): Promise<ICategories[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(onlyCategories);
        }, 1200);
    });
};

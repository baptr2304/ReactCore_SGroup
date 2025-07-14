import type { IAuthor, ICategories, IPost } from "@/const/type/postType";


export const sortPosts = (
    posts: IPost[],
    sortType: "newest" | "oldest" | "az" | "za"
): IPost[] => {
    return [...posts].sort((a, b) => {
        switch (sortType) {
            case "newest":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case "oldest":
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case "az":
                return a.title.localeCompare(b.title);
            case "za":
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });
};
export const filterPosts = (
    posts: IPost[],
    filters: {
        author?: IAuthor;
        category?: ICategories;
    }
): IPost[] => {
    return posts.filter((post) => {
        const matchAuthor =
            !filters.author || filters.author.name === "all" || post.author.name === filters.author.name;

        const matchCategory =
            !filters.category || filters.category.name === "all" || post.categories.name === filters.category.name;

        return matchAuthor && matchCategory;
    });
}; 


export const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

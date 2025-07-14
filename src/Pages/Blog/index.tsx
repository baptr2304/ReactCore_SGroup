import PostList from "@/components/PostList/PostList";
import SearchBar from "@/components/SearchBar/SearchBar";
import type { IAuthor, ICategories, IPost } from "@/const/type/postType";
import {
  fetchAuthorList,
  fetchCategoriesList,
  fetchPostList,
} from "@/services/postService";
import { useEffect, useState } from "react";

const Blog = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [authorList, setAuthorList] = useState<IAuthor[]>([]);
  const [categoriesList, setCategoriesList] = useState<ICategories[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, authors, categories] = await Promise.all([
          fetchPostList(),
          fetchAuthorList(),
          fetchCategoriesList(),
        ]);
        setPosts(postsData);
        setFilteredPosts(postsData);
        setAuthorList(authors);
        setCategoriesList(categories);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar
        dataSearch={posts}
        setDataSearch={setFilteredPosts}
        author={authorList}
        categories={categoriesList}
      />
      <p className="text-sm text-muted-foreground mb-6">
        Show {filteredPosts.length} of {posts.length} posts
      </p>
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Blog;

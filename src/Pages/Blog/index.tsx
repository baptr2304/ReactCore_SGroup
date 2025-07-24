import PostList from "@/posts/PostList/PostList";
import SearchBar from "@/posts/SearchBar/SearchBar";
import {
  fetchAuthorList,
  fetchCategoriesList,
  fetchPostList,
} from "@/posts/shared/data/PostData";
import type { Author, Categories, Post } from "@/posts/shared/data/PostType";
import { useEffect, useState } from "react";

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const [categoriesList, setCategoriesList] = useState<Categories[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

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
        authors={authorList}
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

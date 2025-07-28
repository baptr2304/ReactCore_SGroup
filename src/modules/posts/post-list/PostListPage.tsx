import PostList from "@/modules/posts/post-list/PostList.tsx";
import SearchBar from "@/modules/posts/post-list/SearchBar/SearchBar.tsx";
import {
  fetchAuthorList,
  fetchCategoriesList,
  fetchPostList,
} from "@/modules/posts/shared/data/post-data.ts";
import type { Author, Categories, Post } from "@/modules/posts/shared/data/PostType.ts";
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
        console.error("error loading data:", error);
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

import type { Post } from "@/posts/shared/data/PostType";
import PostCard from "./PostCard";
interface PostList {
  posts: Post[];
}
const PostList: React.FC<PostList> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

import Post from "@/components/Post/Post";
import type { IPost } from "@/const/type/postType";
interface IPostList {
  posts: IPost[];
}
const PostList: React.FC<IPostList> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

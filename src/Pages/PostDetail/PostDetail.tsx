interface PostDetailProps {
  params?: {
    id: string;
  };
}

const PostDetail: React.FC<PostDetailProps> = ({ params }) => {
  const postId = params?.id;

  return (
    <div>
      <h1>PostDetail</h1>
      {postId && <p>Post ID: {postId}</p>}
    </div>
  );
};

export default PostDetail;

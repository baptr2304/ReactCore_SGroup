const PostDetailPage = () => {
  const postId = window.location.pathname.split("/").pop();
  return (
    <div>
      <h1>PostDetail</h1>
      {postId && <p>Post ID: {postId}</p>}
    </div>
  );
};

export default PostDetailPage;

import Blog from "@/pages/Blog";
import ErrorPage from "@/pages/Error/ErrorPage";
import PostDetail from "@/pages/PostDetail/PostDetail";

const routes = [
  {
    path: "/",
    component: <Blog />,
  },
  {
    path: "/post/:id",
    component: <PostDetail />,
  },
  {
    path: "*",
    component: <ErrorPage />,
  },
];

export default routes;

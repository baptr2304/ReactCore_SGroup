import Blog from "@/pages/Blog";
import ErrorPage from "@/pages/Error/404";
import PostDetail from "@/pages/PostDetail/[id]";

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

import Blog from "@/Pages/Blog";
import ErrorPage from "@/Pages/Error/ErrorPage";
import PostDetail from "@/Pages/PostDetail/PostDetail";

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

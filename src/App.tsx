import {type RouteConfig, Router} from "@/modules/shared/router/Router.tsx";
import Blog from "@/modules/posts/post-list/PostListPage.tsx";
import PostDetailPage from "@/modules/posts/post-detail/PostDetailPage.tsx";
import ErrorPage from "@/modules/error/ErrorPage.tsx";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: <Blog />,
  },
  {
    path: "/post/:id",
    component: <PostDetailPage />,
  },
  {
    path: "*",
    component: <ErrorPage />,
  },
];

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Router routes={routes} notFoundPage={ErrorPage} />
    </div>
  );
}

export default App;

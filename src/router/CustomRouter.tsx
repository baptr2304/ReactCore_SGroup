import React, { useEffect, useState } from "react";
import ErrorPage from "../pages/Error/ErrorPage";

function matchRoute(path: string, currentPath: string) {
  if (!path.includes(":")) return path === currentPath;
  const regexPath = path.replace(/:[^/]+/g, "[^/]+");
  const regex = new RegExp(`^${regexPath}$`);
  return regex.test(currentPath);
}

function CustomRouter({
  routes,
}: {
  routes: { path: string; component: React.ReactElement }[];
}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const route =
    routes.find(
      (r) => r.path.includes(":slug") && matchRoute(r.path, currentPath)
    ) || routes.find((r) => matchRoute(r.path, currentPath));

  return route ? route.component : <ErrorPage />;
}

export default CustomRouter;

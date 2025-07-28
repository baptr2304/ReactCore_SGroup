import React, {type FC, useEffect, useState} from "react";

// Pure function
// Logic reusable, no parameters, vars out of function scope
export type RouteConfig = { path: string; component: React.ReactElement };
type RouterProps = {
  routes: RouteConfig[];
  notFoundPage: FC;
}

export function Router({ routes, notFoundPage: NotFoundPage }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Clean code parameters
  function isPathEqualsCurrentPath(path: string) {
    if (!path.includes(":")) {
      return path === currentPath;
    }

    const DYNAMIC_PATH_REGEX = /:[^/]+/g;
    const regexPath = path.replace(DYNAMIC_PATH_REGEX, "[^/]+");
    const regex = new RegExp(`^${regexPath}$`);
    return regex.test(currentPath);
  }

  const route =
      routes.find(
          (route) => route.path.includes(":slug") && isPathEqualsCurrentPath(route.path)
      ) || routes.find((route) => isPathEqualsCurrentPath(route.path));

  useEffect(function syncPathName() {
    function onLocationChange() {
      return setCurrentPath(window.location.pathname);
    }

    window.addEventListener("popstate", onLocationChange);

    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  return route ? route.component : <NotFoundPage />;
}

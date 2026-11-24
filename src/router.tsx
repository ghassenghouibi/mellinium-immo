import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Une position par entrée d’historique : chaque nouvelle navigation s’ouvre en haut de page,
    // seuls Précédent / Suivant rendent la position quittée.
    getScrollRestorationKey: (location) => location.state.__TSR_key ?? location.href,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

import Header from "@/components/layout/Header";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  },
});

import { createRootRoute, Outlet } from '@tanstack/react-router';
import mixpanel from 'mixpanel-browser';
import { useLayoutEffect } from 'react';

const RootComponent = () => {
  useLayoutEffect(() => {
    mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN!, {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage',
    });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});

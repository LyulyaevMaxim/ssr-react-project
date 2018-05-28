import loadable from 'loadable-components';

export const HomePage = loadable(() => import('./Home'));
export const AboutPage = loadable(() => import('./About'));
export const NotFoundPage = loadable(() => import('./NotFound'));
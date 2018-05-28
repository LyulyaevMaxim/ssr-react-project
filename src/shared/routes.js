import { HomePage, AboutPage } from './components/AsyncComponents';

const routes = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/about',
        component: AboutPage
    }
    /*{
        path: '/popular/:id',
        component: Grid,
    }*/
];

export default routes;

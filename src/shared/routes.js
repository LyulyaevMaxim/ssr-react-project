import { HomePage } from './components/AsyncComponents';
import AboutPage from './components/About';

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

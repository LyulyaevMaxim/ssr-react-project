import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import { getLoadableState } from 'loadable-components/server';
import flushChunks from 'webpack-flush-chunks';
import configureStore from '../shared/store';
import App from '../shared/App';

export default ({ clientStats }) => async (req, res) => {
    const context = {};
    const preloadedState = {
        todos: [
            {
                id: 1,
                name: 'Walk the dog'
            },
            {
                id: 2,
                name: 'Buy butter from the store'
            }
        ]
    };
    const store = configureStore(preloadedState);

    const app = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    getLoadableState(app).then(loadableState => {
        const appString = ReactDOMServer.renderToString(app);
        const { title } = Helmet.renderStatic();
        const chunkNames = flushChunkNames();
        const { js, styles, cssHash } = flushChunks(clientStats, {
            chunkNames
        });

        res.render('index', {
            title: title.toString(),
            appString,
            js,
            styles,
            cssHash,
            preloadedState: JSON.stringify(preloadedState)
        });
    });
};

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../shared/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../shared/App';

const store = configureStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

const render = Component => {
    hydrate(
        <Provider store={store}>
            <Router>
                <Component />
            </Router>
        </Provider>,
        document.getElementById('react-root')
    );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../shared/App', () =>
        render(require('../shared/App').default)
    );
}

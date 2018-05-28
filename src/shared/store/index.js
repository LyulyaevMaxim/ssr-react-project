import { createStore, applyMiddleware,  compose  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux'
import createMemoryHistory from 'history/createMemoryHistory';
import rootReducer from './reducers';

const reduxMiddlewares = [routerMiddleware(createMemoryHistory())]


export default (preloadedState) => {
    const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...reduxMiddlewares)));

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers').default);
        });
    }

    return store;
};

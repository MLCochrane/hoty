import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import { loadState, saveState } from './localstorage';


// Middleware
const persistedState = loadState();
const middleware = applyMiddleware(thunk);
const store = createStore(reducers, persistedState, middleware);

store.subscribe(() => {
  saveState({
    token: store.getState().token,
  });
});

export default store;

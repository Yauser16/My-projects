// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk';
import  heroes  from '../components/heroesList/heroesSlice';
import  filters  from '../components/heroesFilters/filtersSlice';

const stringMiddleware = (/* store или {dispath, getState} */) => next => action => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    } return next(action);
};

// const enchancer = createstore => (...args) => {
//     const store = createstore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         } return oldDispatch(action);
//     }
//     return store;
// }

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

// const store = createStore(
//                 combineReducers({heroes: heroes, filters}), 
//                 compose(applyMiddleware(ReduxThunk, stringMiddleware),
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ));
                // compose(
                //     enchancer, 
                //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                //     ));


export default store;
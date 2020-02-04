import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const middleware = applyMiddleware(thunk)

const persistConfig = {
    key: 'rootPersistedStore',
    storage,
    stateReconciler: autoMergeLevel2
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    let store = createStore(
        persistedReducer,
        composeEnhancer(middleware)
    )
    let persistor = persistStore(store)
    return { store, persistor }
}
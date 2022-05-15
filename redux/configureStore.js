import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { sesion } from './sesion';
import {persistStore, persistReducer, PURGE} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// yarn add redux-persist
//yarn add @react-native-async-storage/async-storage

export const ConfigureStore = () => {

    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['favoritos']
    }

    const reducers = combineReducers({
            excursiones,
            comentarios,
            cabeceras,
            actividades,
            favoritos,
            sesion
    });

    const persistReducers = persistReducer(persistConfig, reducers);

    const store = createStore(
    persistReducers,
        applyMiddleware(thunk/*, logger*/)
    );

    let persistor = persistStore(store);


    return {store,persistor};
}
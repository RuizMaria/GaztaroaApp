import * as ActionTypes from './ActionTypes';


export const sesion = (state = {sesion: false,
                                user:''}, action) => {

    switch (action.type) {

        case ActionTypes.INICIAR_SESION:
            return {sesion:true, user:action.payload};
            
        case ActionTypes.CERRAR_SESION:
            
            return {sesion: false, user:''};
            
        default:
        return state;
    }
};
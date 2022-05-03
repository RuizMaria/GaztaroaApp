import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

      case ActionTypes.ADD_COMENTARIO:
        let id=state.comentarios.length+1;
        console.log(id);
        return {...state,errMess: null, comentarios: 
         [...state.comentarios, 
           {id: id, excursionId: action.excursionId, valoracion: action.valoracion, autor: action.autor, comentario: action.comentario,dia: action.dia} 
         ]
       };
   

    default:
      return state;
  }
};
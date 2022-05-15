import * as ActionTypes from './ActionTypes';
import axios from 'axios';



export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: Object.values(action.payload)};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMENTARIO:
      let id=state.comentarios.length+1;
      console.log(id);

      const newComment = {    
              id: id, 
              excursionId: action.excursionId, 
              valoracion: action.valoracion, 
              autor: action.autor, 
              comentario: action.comentario,
              dia: action.dia

      };
    
    axios.post('https://appgaztaroa-93b7e-default-rtdb.firebaseio.com/comentarios.json', newComment)
        .then(response => {
          console.log("uploaded");
          return {...state,errMess: null, comentarios: 
            [...state.comentarios, 
              {id: id, excursionId: action.excursionId, valoracion: action.valoracion, autor: action.autor, comentario: action.comentario,dia: action.dia} 
            ]
          };  

        }).catch(err => {
            console.log("fail");
        });

     
    
    default:
      return state;
  }
};

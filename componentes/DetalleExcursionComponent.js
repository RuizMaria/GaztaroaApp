import React, { Component, useState } from 'react';
import { Text, View, ScrollView, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from './comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';
import { postComentario } from '../redux/ActionCreators';
import { colorGaztaroaClaro, colorGaztaroaOscuro} from './comun/comun';

const mapStateToProps = state => {
  return {
  comentarios: state.comentarios,
  excursiones: state.excursiones,
  favoritos: state.favoritos
  }
}
const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})


function RenderComentario(props) {

  const comentarios = props.comentarios;
  
  const renderCommentarioItem = (item, index) => {
  
      return (
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comentario}</Text>
        <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
      <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia} </Text>
      </View>
      );
  };
 
      return (
        <Card>
          <Card.Title>Comentarios</Card.Title>
          <Card.Divider/>

          {comentarios.map((item, index) => (
            renderCommentarioItem(item, index)
          ))}

        </Card>
      );
}



function RenderExcursion(props) {

   //const [autor, setAutor] = useState(" ");
   //const [valoracion, setValoracion] = useState(3.5);
   //const [comentario, setComentario] = useState(" ");
  const excursion = props.excursion;
    
    const modal = props.modal;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Title>{excursion.nombre}</Card.Title>
              <Card.Divider/>
              <Card.Image source={{uri: baseUrl + excursion.imagen}}></Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <View style={{flex:1,flexDirection:"row",justiftyContent:"center", alignItems:"center",paddingLeft:100}}>
              <Icon
                  raised
                  reverse
                  name={ props.favorita ? 'heart' : 'heart-o'}
                  type='font-awesome'
                  color='#f50'
                  onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
              />
                <Icon
                    raised
                    reverse
                    name = {'pencil'}
                    type='font-awesome'
                    color ='#0000ff'
                    onPress={()=> props.onPress2()}
              />
              </View>
              
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class DetalleExcursion extends Component {

constructor(props) {
    super(props);
    this.state = {
        valoracion: 3,
        autor: '',
        comentario: '',
        showModal: false
    }
} 
    
toggleModal() {
    this.setState({showModal: !this.state.showModal});
}

resetForm() {
    this.setState({
        valoracion: 3,
        autor: '',
        comentario: '',
        dia: '',
        showModal: false
    });
  } 
  

  marcarFavorito(excursionId) {
    
    this.props.postFavorito(excursionId);
  }

  gestionarComentario(excursionId, valoracion, autor, comentario) {
    console.log(JSON.stringify(this.state));
    this.props.postComentario(excursionId, valoracion, autor, comentario);
    this.toggleModal();
  }
  

  render(){
      const {excursionId} = this.props.route.params;
      return(
        <ScrollView>
          <RenderExcursion 
            excursion={this.props.excursiones.excursiones[+excursionId]} 
            favorita={(this.props.favoritos.favoritos).some(el => el === excursionId)}
            onPress={() => this.marcarFavorito(excursionId)}
            onPress2={()=>this.toggleModal()}
          />
          <Modal
                animationType = {"slide"} 
                transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => this.toggleModal}
                onRequestClose = {() =>  this.toggleModal}
              >
                  <View style={{justiftyContent:"center", alignItems:"center"}}>
                      <Rating
                        showRating
                        name="hover-feedback"
                        startingValue={3}
                        onFinishRating={rating => {console.log(rating); this.setState({ valoracion: rating })}}
                      />
                      <Input
                        leftIcon={{ type: 'font-awesome', name: 'user'}}
                        onChangeText={value => this.setState({ autor: value })}
                      />
                      <Input
                        leftIcon={{ type: 'font-awesome', name: 'comment'}}
                        onChangeText={value => this.setState({ comentario: value })}
                      />
                      <View style={{justiftyContent:"space-around",flexDirection:"column"}}>
                      <Button
                        color={colorGaztaroaOscuro}
                        title="ENVIAR" 
                        onPress={()=>  {console.log(this.state.autor);this.gestionarComentario(excursionId,this.state.valoracion,this.state.autor,this.state.comentario); this.resetForm();}}
                      />
                      <>
                      </>
                      <Button
                        color={colorGaztaroaOscuro}
                        title="CANCELAR" 
                        onPress={()=> {this.toggleModal(); this.resetForm()}}
                      />
                      </View>
                  </View>
              </Modal>
          <RenderComentario 
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
          />
        </ScrollView>
        
      );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
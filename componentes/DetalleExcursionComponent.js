import React, { Component, useState } from 'react';
import { Text, View, ScrollView, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from './comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';
import { colorGaztaroaClaro, colorGaztaroaOscuro} from './comun/comun';

const mapStateToProps = state => {
  return {
  comentarios: state.comentarios,
  excursiones: state.excursiones,
  favoritos: state.favoritos
  }
}
const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
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

   const [showModal, setShowModal] = useState(false);
   //const [valoracion, setValoracion] = useState(3.5);
    const excursion = props.excursion;
    
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Title>{excursion.nombre}</Card.Title>
              <Card.Divider/>
              <Card.Image source={{uri: baseUrl + excursion.imagen}}></Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <View style={{justiftyContent:"center", alignItems:"center"}}>
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
                    onPress={()=> setShowModal(!showModal)}

              />
              </View>
              <Modal
                animationType = {"slide"} 
                transparent = {false}
                visible = {showModal}
                onDismiss = {() =>setShowModal(false)}
                onRequestClose = {() => setShowModal(!showModal)}
              >
                  <View style={{justiftyContent:"center", alignItems:"center"}}>
                      <Rating
                        showRating
                        name="hover-feedback"
                        startingValue={3}
                        //onFinishRating={rating => {console.log(rating); this.setState({ valoracion: rating })}}
                        onFinishRating={rating => {console.log(rating)}}
                       //onFinishRating = {this.ratingValoracion}
                      />
                      <Input
                        //placeholder={this.state.autor}
                        leftIcon={{ type: 'font-awesome', name: 'user'}}
                        //onChangeText={value => this.setState({ autor: value })}
                      />
                      <Input
                        //placeholder={this.state.comentario}
                        leftIcon={{ type: 'font-awesome', name: 'comment'}}
                        //onChangeText={value => this.setState({ comentario: value })}
                      />
                      <Button
                        //onPress = {() =>{this.gestionarComentario(excursionId,this.state.valoracion,this.state.autor,this.state.comentario); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="ENVIAR" 
                        onPress={()=> setShowModal(!showModal)}
                      />
                      <>
                      </>
                      <Button
                        //onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="CANCELAR" 
                        onPress={()=> setShowModal(!showModal)}

                      />
                  </View>
              </Modal>
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class DetalleExcursion extends Component {


  marcarFavorito(excursionId) {
    
    this.props.postFavorito(excursionId);
  }
  
  //state = {showModal: false}

 



  render(){
      const {excursionId} = this.props.route.params;
      return(
        <ScrollView>
          <RenderExcursion 
            excursion={this.props.excursiones.excursiones[+excursionId]} 
            favorita={(this.props.favoritos.favoritos).some(el => el === excursionId)}
            onPress={() => this.marcarFavorito(excursionId)}
            //modal = {this.state.showModal}
          />
          <RenderComentario 
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
          />
        </ScrollView>
        
      );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
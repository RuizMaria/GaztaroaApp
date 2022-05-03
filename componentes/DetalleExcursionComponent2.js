import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from './comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
})

function RenderExcursion(props) {
    
    console.log("recibo:");

    const excursion = props.excursion;

    const styles = StyleSheet.create({
      title: {
          fontSize:30,
          textAlign: 'center',
          marginTop:50
      }
  });
        if (excursion != null) {
            return(
            <Card>
              <Card.Divider/>
              <Card.Image source={{uri: baseUrl + excursion.imagen}}>
              <Card.Title style={styles.title} >{excursion.nombre}</Card.Title>
              </Card.Image>
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
                    onPress={()=>props.onClick()}

              />
              </View>
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComentarios(props){

  const comentarios = props.comentarios;

  const renderComentarioItem = ({item, index}) => {

    return(
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}> {item.comentario}</Text>
        <Text style={{fontSize: 12}}> {item.valoracion} Stars</Text>
        <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia}  </Text>
      </View>

    );
  };

  return(
    <Card>
        <Card.Title>Comentarios</Card.Title>
        <Card.Divider/>
         <FlatList 
            data={comentarios}
            renderItem={renderComentarioItem}
            keyExtractor={item => item.id.toString()}
          /> 
{/*           {comentarios.map((item, index) => (
            renderCommentarioItem(item, index)
          ))} */}
      </Card>
  );

}


class DetalleExcursion extends Component {
  
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
}

  render(){

      const {excursionId} = this.props.route.params;
      return(
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          //favorita={(this.props.favoritos.favoritos).some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}

        />
        <RenderComentarios 
        comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
        />

      </ScrollView>
      
      
      );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
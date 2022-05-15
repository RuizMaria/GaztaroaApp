import React, { Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
    excursiones: state.excursiones,
    favoritos: state.favoritos,
    sesion: state.sesion
    }
  }


/*  function RenderListaFavs(props) {

    const sesion = props.sesion;
    const favoritos = props.favoritos;

    if(sesion){
        if(favoritos.length == 0){
            return(
                <View>
                    <Text>
                        No tienes ninguna excursión maracada como favorita 
                    </Text>
                </View>
            )
        }else{
            for (let index = 0; index < favoritos.length; index++) {
                const ListItems = favoritos.map((favorito) =>
                    <li>{favorito.text}</li>
                );  
                return(
                    <ul>{ListItems}</ul>
                );
            }

        }
    }else{
        return(
            <Text>
                Inicia sesión para poder guardar tus favortios
            </Text>
        )
    }

} */
 
class ListaFavoritos extends Component {

    render(){

        const renderListaFavortios = ({item, index}) => {
            return(
            <ListItem
                key={index}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
            </ListItem> 

            );
        };

        return (
            <SafeAreaView>
                <FlatList 
                    data={this.props.favoritos.favoritos}
                    renderItem={renderListaFavortios}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        );


    
/*             const renderCalendarioItem = ({item, index}) => {
                return (
                    <ListItem
                        key={index}
                        //onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        bottomDivider>
                        <Avatar source={{uri: item.imagen}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem> 
                );
            };
        
                return (
                    <SafeAreaView>
                        <FlatList 
                            data={this.props.excursiones.excursiones}
                            renderItem={renderCalendarioItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </SafeAreaView>
                );
            
            
        } */
              
/*     if(this.props.favoritos.length == 0){
        return(<View></View>);
    }else{
    for(var i=0; i<this.props.favoritos.length;i++){
        if(i==0){
        var excurfav= this.props.excursiones.excursiones.filter((excursion) => excursion.id === this.props.favoritos[i]);
        }
        if(this.props.favoritos.length!=1){
          excurfav= excurfav.concat(this.props.excursiones.excursiones.filter((excursion) => excursion.id === this.props.favoritos[i+1]));
        }
      
    }  */  


/*          return(

           <ScrollView>
                <RenderListaFavs
                    sesion = {this.props.sesion.sesion}
                    favoritos = {this.props.favoritos.favoritos}
                />
            </ScrollView> 
        ); */ 
    }

}
export default connect(mapStateToProps)(ListaFavoritos);
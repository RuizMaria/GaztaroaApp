import React, { Component} from 'react';
import { ListItem, Avatar, Icon,Card} from 'react-native-elements';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { borrarFavoritos } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
    excursiones: state.excursiones,
    favoritos: state.favoritos,
    sesion: state.sesion
    }
};
const mapDispatchToProps = dispatch => ({
    borrarFavoritos: () => dispatch(borrarFavoritos())
})


class ListaFavoritos extends Component {

    clearStorage = async () => {
             AsyncStorage.clear();
             console.log('clear');
        }
    borraFav() {
            this.props.borrarFavoritos();
    }
    render(){
        
        const renderListaFavoritos = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                    <Avatar source={{uri: item.imagen}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                    </ListItem.Content>
                </ListItem> 
            );
        };
        if(this.props.sesion.sesion){
        if(this.props.favoritos.favoritos.length == 0){
            return(
                <View>
                    <Card >
                    <Card.Title>FAVORITOS</Card.Title>
                    <Card.Divider/>
                    <Text style={{margin: 100, alignItems:"center",justifyContent:"center"}}>
                       No tienes favoritos
                    </Text> 
                    </Card>
                </View>
            );
        }else{
            for (var index = 0; index < this.props.favoritos.favoritos.length; index++) {
                if(index===0){
                    var listafavs = this.props.excursiones.excursiones.filter((excursion =>excursion.id === this.props.favoritos.favoritos[index]));
                }if(this.props.favoritos.favoritos.length!=1){
                    listafavs = listafavs.concat(this.props.excursiones.excursiones.filter((excursion)=> excursion.id === this.props.favoritos.favoritos[index+1]));
                }   
            }
            
            console.log(JSON.stringify(listafavs));
            return (
                <SafeAreaView >
                    <FlatList 
                        data={listafavs}
                        renderItem={renderListaFavoritos}
                        keyExtractor={item => item.id.toString()}
                    />
                    <View style={{ alignItems:"center"} }>
                    <Icon
                      raised
                      reverse
                      name = {'trash'}
                      type='font-awesome'
                      color ='#0000ff'
                      onPress = {()=>this.borraFav()}
                    />
                    </View>
                </SafeAreaView>
            );
        }   
        } else{
            return(
                <View>
                    <Card >
                        <Card.Title>FAVORITOS</Card.Title>
                        <Card.Divider/>
                        <Text style={{margin: 100}}>
                        Inicia sesión para ver tus favoritos 
                        </Text> 
                    </Card>
                </View>
            );
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaFavoritos);
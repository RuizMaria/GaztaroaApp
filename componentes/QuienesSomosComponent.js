import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { SafeAreaView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent'

const mapStateToProps = state => {
    return {
    actividades: state.actividades
    }
}
   

function Historia() {
        return(
            <Card>
                <Card.Title>Un poquito de historia</Card.Title>
                <Card.Divider/>
                <Text style={{margin: 20}}>
                    El nacimiento del club de montaña Gaztaroa se remonta a la 
                    primavera de 1976 cuando jóvenes aficionados a la montaña y 
                    pertenecientes a un club juvenil decidieron crear la sección 
                    montañera de dicho club. Fueron unos comienzos duros debido sobre 
                    todo a la situación política de entonces. Gracias al esfuerzo 
                    económico de sus socios y socias se logró alquilar una bajera. 
                    Gaztaroa ya tenía su sede social.

                    Desde aquí queremos hacer llegar nuestro agradecimiento a todos 
                    los montañeros y montañeras que alguna vez habéis pasado por el 
                    club aportando vuestro granito de arena.
                    
                    Gracias!
                </Text>
            </Card>
        );
    
}



class QuienesSomos extends Component {

    render() {
        
        const renderActividadesItem = (item, index) => {
            console.log(item.imagen);
            return (
                <ListItem
                    key={index}
                    bottomDivider>
                <Avatar source={{uri:  item.imagen}}/>
                    <ListItem.Content>
                        
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem> 
            );
                    
        };

        if (this.props.actividades.isLoading) {
            return(
                <ScrollView>
                    <Historia />
                        <Card>
                            <Card.Title>"Actividades y recursos"</Card.Title>
                            <Card.Divider/>
                            <IndicadorActividad />
                        </Card>
                    </ScrollView>
            );
        } else if (this.props.actividades.errMess) {
            return(
                <View>
                <Text>{this.props.actividades.errMess}</Text>
                </View>
            );
        } else {
    
            
            return(
                <ScrollView>
                <Historia  />
                        <Card>
                        <Card.Title>"Actividades y recursos"</Card.Title>
                        <Card.Divider/>
                        <SafeAreaView>
                            {this.props.actividades.actividades.map((item, index) => (
                               renderActividadesItem(item, index)
                            ))
                            
                           /* <FlatList 
                            data={this.props.actividades.actividades}
                            renderItem={renderActividadesItem}
                            keyExtractor={item => item.id.toString()}
                            />
                            */
                            }
                        </SafeAreaView>
                        </Card>
                </ScrollView>
                
            );
        }
    }

}

export default connect(mapStateToProps)(QuienesSomos);
import React from 'react';
import { Card } from 'react-native-elements';
import { Text , View, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { HISTORIA } from './comun/historia';
//import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseUrl } from './comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent'

const mapStateToProps = state => {
    return {
      actividades: state.actividades
    }
  }



class QuienesSomos extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            historia: HISTORIA
        };
    } 


render(){

function RenderHistoria(props){

    const historia = props.historia;
    
    if (historia !=null) {
        return(
            <Card>
                <Card.Title>{historia.nombre}</Card.Title>
                <Card.Divider/>
                <Text style={{margin: 20}}>
                    {historia.descripcion}
                </Text>
            </Card>
        );
        
    } else {
        return(<View></View>)
    }
}

const renderQuienesSomosItem = ({item, index}) => {
    return (
        <ListItem
            key={index}
            bottomDivider>
            <Avatar source={{uri: baseUrl + item.imagen}} />
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


    return (
        <ScrollView>
        <Historia  />
                <Card>
                <Card.Title>"Actividades y recursos"</Card.Title>
                <Card.Divider/>
                <SafeAreaView>
                    {this.props.actividades.actividades.map((item, index) => (
                        renderActividadesItem(item, index)
                    ))
                    }
                </SafeAreaView>
                </Card>
        </ScrollView>
    )
    }
}
}

export default connect(mapStateToProps)(QuienesSomos);
import React from 'react';
import { Card } from 'react-native-elements';
import { Text , View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { HISTORIA } from './comun/historia';
//import { ACTIVIDADES } from './comun/actividades';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseUrl } from './comun/comun';
import { actividades as ACTIVIDADES} from './json-server/db.json';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
      actividades: state.actividades
    }
  }



class QuienesSomos extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            //actividades: ACTIVIDADES,
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

return (
    <ScrollView>
        <RenderHistoria historia={this.state.historia[0]}/>

        <Card>
            <Card.Title>Actividades y recursos</Card.Title>
            <Card.Divider/>
            <SafeAreaView>
                <FlatList
                    data = {this.props.actividades.actividades}
                    //data = {this.state.actividades}
                    renderItem = {renderQuienesSomosItem}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </Card>

    </ScrollView>

)

}
}

//export default QuienesSomos; 
export default connect(mapStateToProps)(QuienesSomos);
import React from 'react';
import { Card } from 'react-native-elements';
import { Text , View } from 'react-native';
import { CONTACTO } from './comun/contacto';


function RenderContacto(props) {

    const contacto = props.contacto;

    if (contacto != null) {

        return(
            <Card>
                <Card.Title>{contacto.nombre}</Card.Title>
                <Card.Divider/>
                <Text style={{margin: 20}}>
                    {contacto.descripcion}
                </Text>
            </Card>
        );
        
    } 
    else {
        return(<View></View> );
    }
}

class Contacto extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            contacto: CONTACTO
        };
    }
    render(){
        return(
            <RenderContacto contacto={this.state.contacto[0]}/>
        );
    }
}

export default Contacto;
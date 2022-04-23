import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
//import { connect } from 'react-redux';
//import { EXCURSIONES } from './comun/excursiones';
//import { CABECERAS } from './comun/cabeceras';
//import { ACTIVIDADES } from './comun/actividades';
import { baseUrl } from './comun/comun';
import {excursiones as EXCURSIONES, cabeceras as CABECERAS, actividades as ACTIVIDADES} from './json-server/db.json';
import { connect } from 'react-redux';



const mapStateToProps = state => {
    return {
      actividades: state.actividades,
      excursiones: state.excursiones,
      cabeceras: state.cabeceras
    }
  }


function RenderItem(props) {
    
        const item = props.item;

        const styles = StyleSheet.create({
            title: {
                color:'chocolate',
                fontSize:30,
                textAlign: 'center',
                marginTop:50
            }
        });
        
        if (item != null) {
            return(
                <Card>
                    <Card.Divider/>
                    <Card.Image source={{uri: baseUrl + item.imagen}}>
                    <Card.Title style={styles.title}>{item.nombre}</Card.Title>
                    </Card.Image>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

/*     constructor(props) {
        super(props);
        this.state = {
          excursiones: EXCURSIONES,
          cabeceras: CABECERAS,
          actividades: ACTIVIDADES
        };
    } */

    render() {
        
        return(
            <ScrollView>
                {/* <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} /> */}
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

//export default Home;
export default connect(mapStateToProps)(Home); 
import { baseUrl } from './comon/comon'
import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';
// import { COMENTARIOS as Comments } from './comon/comentarios';
// import { EXCURSIONES as Excursions } from './comon/excursiones';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { excursiones as Excursions, comentarios as Comments } from '../json-server/db.json'

function RenderExcursion(props) {

    const excursion = props.excursion;
        
    if (excursion != null) {
            return(
                <Card>
                    <Card.Title>{excursion.nombre}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Card.Image source={{ uri: baseUrl + excursion.imagen }}></Card.Image>
                    <Text style={{margin: 20}}>
                        {excursion.descripcion}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ props.fav ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.fav ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                </Card>
            );
        }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const RenderCommentItem = ({item, index}) => {
        return (
            <View key={index.toString()} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comentario}</Text>
                <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia}</Text>
            </View>
        );        
    };
    
    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider/>
            {comments.map((item, index) => ( //Para no usar FlatList porque salen Warnings (Ignorables) y errores
                <RenderCommentItem key={index} item={item} index={index}/>
            ))}
        </Card>
    );
}

class ExcursionDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            excursions: Excursions,
            comments: Comments,
            favs: []
        };
    }

    markAsFav(excursionID){
        this.setState({favs: this.state.favs.concat(excursionID)});
        console.log(...this.state.favs)
    }
  
    render(){
        const {excursionID} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion
                    excursion={this.state.excursions[+excursionID]}
                    fav={this.state.favs.some(el => el == excursionID)}
                    onPress={() => this.markAsFav(excursionID)}
                />
                <RenderComments 
                    comments={this.state.comments.filter(
                        (comments) => comments.excursionId === excursionID)}
                />
            </ScrollView>
        );
    } 
}

export default ExcursionDetails;
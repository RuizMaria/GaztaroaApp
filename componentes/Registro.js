import React, { Component } from 'react';
import {  View, Modal, Button, Text } from 'react-native';
import { Card } from 'react-native-elements';
import {Input } from 'react-native-elements';
import { colorGaztaroaClaro, colorGaztaroaOscuro} from '../comun/comun';
import { connect } from 'react-redux';
import { iniciarSesion } from '../redux/ActionCreators';
import { cerrarSesion } from '../redux/ActionCreators';
import axios from 'axios';


const mapStateToProps = state => {
    return {
    sesion: state.sesion,
    }
}


const mapDispatchToProps = dispatch => ({
    iniciarSesion: (user) => dispatch(iniciarSesion(user)),
    cerrarSesion: () => dispatch(cerrarSesion())
})

class Registro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
          }
      } 
     
    
      resetForm() {
          this.setState({
              user: '',
              pass: '',
          });
        } 
    
      gestionarSesion(user, pass, recibo) {
        console.log(JSON.stringify(this.state));//user y pass
        this.textInput1.clear();
        this.textInput2.clear();
        console.log("estado");
        console.log(this.props.sesion.sesion);
        if(this.props.sesion.sesion){
            alert("Cierre sesión para registrarse con un nuevo usuario");
        }else{
            console.log("intento");
            this.textInput1.clear();
            this.textInput2.clear();
            if(!user || !pass){
                alert("Rellene todos los campos");

            }else{
                
                const authData = {
                    email: user,
                    password: pass,
                    returnSecureToken: true
                };
                axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXYqpd2pC8c1oFsH7CKl8oRKifh2PYSq0',authData)
                .then(response => {
                    alert("Registrado con éxito")
                    console.log(response.data);
                        this.props.iniciarSesion(user);//iniciosesion
                       // alert("Sesion iniciada con éxito: "+ response.data.email);//tener en cuenta si se ha iniciado sesión para no volver a iniciar

                }).catch(err => {
                    console.log(err);
                    alert('ERROR DE REGISTRO. Inténtelo de nuevo.');

                    
                });
            }
        }
      }

    render() {
        
        if(this.props.sesion.sesion){
            return(
                <View>
                    <Card >
                        <Card.Title>SESION</Card.Title>
                        <Card.Divider/>
                        <Text style={{margin: 20}}>
                        Sesión actual iniciada:  
                        
                        </Text>
                        <Text style={{margin: 20}}>
                            {this.props.sesion.user}
                        </Text>
                        <Text style={{margin: 20}}>
                            Cierre sesión para registrar un nuevo usuario.  
                            
                        </Text>
                    </Card>
                    <Button
                            color={colorGaztaroaOscuro}
                            title="CERRAR SESION" 
                            onPress={()=>{
                                this.props.cerrarSesion();
                                alert("SESIÓN CERRADA");
                            }}
                        />
                </View>
            );
        }else{
        
            return(

                <View style={{justiftyContent:"center", alignItems:"center"}}>
                    
                    <Input
                    leftIcon={{ type: 'font-awesome', name: 'user'}}
                    onChangeText={value => this.setState({ user: value })}
                    placeholder="Email"
                    ref={input => { this.textInput1 = input }}
                    />
                    <Input
                    leftIcon={{ type: 'font-awesome', name: 'comment'}}
                    onChangeText={value => this.setState({ pass: value })}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    ref={input => { this.textInput2 = input }}
                    />
                    <View style={{justiftyContent:"space-around",flexDirection:"column"}}>
                    <Button
                        color={colorGaztaroaOscuro}
                        title="REGISTRARME" 
                        onPress={()=>{

                            this.gestionarSesion(this.state.user,this.state.pass); 
                            this.resetForm();
                        }}
                    />
                    <>
                    </>

                    </View>
                </View>
    
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
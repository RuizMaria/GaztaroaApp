import React, { Component, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import * as MailComposer from "expo-mail-composer"; 
import call from 'react-native-phone-call';


function Llamar(){

    const [inputValue, setInputValue] = useState('+34 948 277151');

    const llama = () => {
     
        const args = {
          number: inputValue,
          prompt: true,
        };
        call(args).catch(console.error);
      };
    
    return(
        <Icon
        raised
        reverse
        name = {'phone'}
        type='font-awesome'
        color ='#0000ff'
        onPress={()=> llama()}
       />
    )
}

function Mail(){
    
    const [status, setStatus] = useState(null)

    const sendEmail = async(file) => {
        var options = {}

        options = {
            subject: "Info Gaztaroa",
            recipients: ["gaztaroa@gaztaroa.com"],
            body: "Escribe aquí cualquier duda..."
          }

        let promise = new Promise((resolve, reject) => {
          MailComposer.composeAsync(options)
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
        })
    
        promise.then(
          result => setStatus("Status: email " + result.status),
          error => setStatus("Status: email " + error.status)
        )
      }
return(
    <Icon
    raised
    reverse
    name = {'envelope'}
    type='font-awesome'
    color ='#0000ff'
    onPress={()=> sendEmail([])}
   />
)
}


class Contacto extends Component {

    render() {
        
        return(
            <ScrollView>
            <Card>
                <Card.Title>Contacto</Card.Title>
                <Card.Divider/>
                
                <Text style={{margin: 20}}>
                Kaixo Mendizale!
                
                Si quieres participar en las salidas de montaña que organizamos o 
                quieres hacerte soci@ de Gaztaroa, puedes contactar con nosotros a 
                través de diferentes medios. Puedes llamarnos por teléfono los jueves 
                de las semanas que hay salida (de 20:00 a 21:00). También puedes 
                ponerte en contacto con nosotros escribiendo un correo electrónico, o 
                utilizando la aplicación de esta página web. Y además puedes 
                seguirnos en Facebook.

                Para lo que quieras, estamos a tu disposición!

                </Text>
                <Text style={{margin: 20}}>
                    Tel: +34 948 277151
                </Text>
                <Llamar/>
                <Text style={{margin: 20}}>
                    Email: gaztaroa@gaztaroa.com
                </Text>
                <Mail/>
               
           
            </Card>
            </ScrollView>
        );
    }
}

export default Contacto;
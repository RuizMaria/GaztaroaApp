import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import React from 'react'; 
import Campobase from './components/CampobaseComponent';

export default function App() {
  return (
    <View>
      <Campobase/>
      <StatusBar style="auto" />
    </View>
  );
}



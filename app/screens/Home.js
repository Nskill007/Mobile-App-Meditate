import { View, TouchableOpacity , Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import Header  from '../components/Header'
import { useSessionContext } from '../context/home_context';
import React, { useState } from "react";
import Modal from "react-native-modal";
// import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Footer  from '../components/Footer'
import { color } from 'react-native-reanimated';
import externalStyle from '../style/externalStyle';

const Home = ({navigation}) => {

  const [showAlert, setShowAlert] = useState(false)

  const { sessionType, setSessionType, sessionLength, setSessionLength, setIsMeditate } = useSessionContext()

  return (
    <View style={externalStyle.pageContainer}>
      <Header />
      <View style={externalStyle.homeContainer}>
        <Text style={[externalStyle.miniSubtitle, externalStyle.sessionTitle]}>Session Type</Text>
        
        <TouchableOpacity>
          <View style={externalStyle.info}>
            <Text style={externalStyle.infoText} onPress={() => setShowAlert(true)}>?</Text>
          </View>
        </TouchableOpacity >
        
        <View style={externalStyle.buttonContainer}>
        <TouchableHighlight onPress={() => setSessionType('Normal')}>
          <View style={externalStyle.btn}>
            <Text style={sessionType == 'Normal' ? [externalStyle.btnText, externalStyle.startBtnTextSelected] : externalStyle.btnText}>Normal</Text>
          </View>
        </TouchableHighlight>
          <TouchableHighlight onPress={() => setSessionType('Calm')}>
          <View style={externalStyle.btn}>
            <Text style={sessionType == 'Calm' ? [externalStyle.btnText, externalStyle.startBtnTextSelected] : externalStyle.btnText}>Calm</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setSessionType('Silent')}>
          <View style={externalStyle.btn}>
            <Text style={sessionType == 'Silent' ? [externalStyle.btnText, externalStyle.startBtnTextSelected] : externalStyle.btnText}>Silent</Text>
          </View>
        </TouchableHighlight>
        </View>
        <Text style={externalStyle.miniSubtitle}>Session Length</Text>
        <View style={externalStyle.buttonContainer}>
        <TouchableHighlight onPress={() => setSessionLength(5)}>
          <View style={externalStyle.btn}>
            <Text style={sessionLength == 5 ? [externalStyle.btnText, externalStyle.startBtnTextSelected] : externalStyle.btnText}>5</Text>
          </View>
        </TouchableHighlight>
          <TouchableHighlight onPress={() => setSessionLength(10)}>
          <View style={externalStyle.btn}>
            <Text style={sessionLength == 10 ? [externalStyle.btnText, externalStyle.startBtnTextSelected] : externalStyle.btnText}>10</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setSessionLength(15)}>
          <View style={externalStyle.btn}>
            <Text style={sessionLength == 15 ? [externalStyle.btnText, externalStyle.startBtnTextSelected] : externalStyle.btnText}>15</Text>
          </View>
        </TouchableHighlight>
        </View>  
      </View>

      <TouchableHighlight disabled={!sessionType || !sessionLength} underlayColor='rgba(255, 255, 255, 0.0)' onPress={() => {
          navigation.navigate('Meditation')
          setIsMeditate(true)
      }}>
          <View style={(sessionType && sessionLength) ? externalStyle.startBtn : [externalStyle.startBtn, externalStyle.startBtnDisabled]}>
            <Text style={(sessionType && sessionLength) ? externalStyle.startBtnText : [externalStyle.startBtnText, externalStyle.startBtnTextDisabled]}>{(sessionType && sessionLength) ? 'Start Meditation' : 'Pick Session!'}</Text>
          </View>
        </TouchableHighlight>


      <Modal isVisible={showAlert}>
        <View style={{ flex: 1 }}>
          <View style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:50, textAlign:'center',}}>
            <Text style={{fontSize:30, color:'white', marginBottom:50}}>Meditation Types</Text>
            <Text style={{fontSize:20, color:'white',marginBottom:20, textAlign:'center'}}>Normal - Full sounds</Text>
            <Text style={{fontSize:20, color:'white',marginBottom:20, textAlign:'center'}}>Silent - No sounds for full concentration</Text>
            <Text style={{fontSize:20, color:'white', marginBottom:50, textAlign:'center'}}>Calm - Turn light off and enjoy calming sounds</Text>
          <Button title="Meditate!" onPress={() => setShowAlert(false)} style={externalStyle.btn}/>
          </View>
        </View>
      </Modal>
      <Footer navigation={navigation}/>
    </View>
    
  );
};


export default Home;
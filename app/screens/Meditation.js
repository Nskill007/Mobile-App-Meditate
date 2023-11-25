import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import Header  from '../components/Header'
import { useSessionContext } from '../context/home_context';
import React, { useContext, useEffect } from "react";
import CircleAnimation from '../components/Circle.js'
import externalStyle from '../style/externalStyle';
import {Audio} from "expo-av";

const Meditation = ({navigation}) => {

  const { sessionType, sessionLength, isMeditate } = useSessionContext()

  const [isBreatheIn, setIsBreatheIn] = React.useState(true)
  const [isReady, setIsReady] = React.useState(false)
  const [audioStatus, setAudioStatus] = React.useState(true);
  const [calmSound, setCalmSound] = React.useState(new Audio.Sound());
  const [timerCount, setTimer] = React.useState(sessionLength*60)

  useEffect(() =>{
        (async () =>{
            if (sessionType === "Calm" && audioStatus === true){
                try {
                    await calmSound.loadAsync(require('../assets/calm.mp3'),
                        {shouldPlay: true}
                    );
                    await calmSound.setStatusAsync({
                        isLooping: true
                    })
                    await calmSound.playAsync();
                } catch (e){
                    throw e;
                }
            } else {
                console.log("Stop playing!");
                await calmSound.stopAsync();
                await calmSound.unloadAsync();
            }
        })();
        setTimeout(() => {
            setAudioStatus(false);
        }, (sessionLength * 60000))

        const interval = setInterval(() => {
            setTimer(lastTimerCount => {
                if (lastTimerCount === 0) {
                    return "DONE!";
                } else {
                    return lastTimerCount - 1
                }
            })

        }, 1000)
        return ()=>{
            console.log("returning")
            calmSound && calmSound.unloadAsync();
            clearInterval(interval)
        }
    }, [audioStatus]);

  if(!isReady){
    return (
      <View style={externalStyle.pageContainer}>
        <Header />
        <View style={externalStyle.meditateContainer}>
        <TouchableHighlight onPress={() => setIsReady(true)}>
          <View style={externalStyle.btn}>
            <Text style={[externalStyle.btnText, {fontSize:35, paddingVertical:5, paddingHorizontal:10}]}>Ready?</Text>
          </View>
        </TouchableHighlight>
      </View>
      </View>
    )}
  return (
    <View style={externalStyle.pageContainer}>
      <Header />
      <View style={externalStyle.meditateContainer}>
          <CircleAnimation/>
      </View>
      {timerCount !== 0 ?
          <Text style={styles.timer}>{Math.floor(timerCount / 60)}:{ (timerCount % 60) <= 9 ?  "0" + timerCount % 60 : timerCount % 60 }</Text>
          : <Text>DONE!</Text>
        }


    </View>
  );
};

export default Meditation;

const styles = StyleSheet.create({
  pageContainer: {
    margin:10,
    flex:1,
  },
  meditateContainerReady: {
    margin:10,
    marginTop:30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex:1,
  },
  meditateContainer: {
    margin:10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
  },
  subtitle: {
    marginTop:60,
    marginBottom:20,
    fontSize: 35,
    color:'#DDD6D6',
  },
    timer: {
      marginTop:60,
      marginBottom:20,
      fontSize: 35,
      color:'#DDD6D6',
      bottom:0,
      textAlign:'center',
    },
   btn: {
    backgroundColor:'#312F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText : { 
    fontSize: 18,
    color:'#DDD6D6',
  },
});

import {TouchableHighlight, View, Text, StyleSheet, Dimensions} from 'react-native';
import * as React from 'react';
import { useFonts } from 'expo-font';

const color = {
  background: '#A6B1E1',
  mainText:'#424874',
  btnBackground:'#DCD6F7',
};

export default StyleSheet.create({
        
    //Page Containers
        pageContainer: {
          flex:1,
          color:'#DCD6F7',
        },
      header: {
          marginTop:60,
          marginBottom:55,
          fontSize: 60,
          textAlign: 'center',
          color:'#424874',
        },
        mapHeader: {
          marginTop:60,
          marginBottom:55,
          fontSize: 50,
          textAlign: 'center',
          color:'#424874',
        },
        homeContainer: {
            margin:10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'flex-start',
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
        profileContainer:{
          margin:10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent:'flex-start',
          flex:1,
        },
          container: {
            marginTop: 40
          },
          
        subtitle: {
          marginTop:60,
          marginBottom:20,
          fontSize: 35,
          color:color.mainText,
          textAlign:'center'
        },
        miniSubtitle: {
          marginBottom:20,
          fontSize: 35,
          color:color.mainText,
          textAlign:'center',
        },
        pageContainerFooter: {
          height: '10%',
          backgroundColor:color.mainText,
          display: 'flex',
          flexDirection:'row',
          justifyContent:'space-around',
          alignItems:'center',
        },  
        text: {
          color:color.btnBackground,
          fontSize:40,
        },

        //Buttons

        btn: {
            backgroundColor:color.btnBackground,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
        },
        readyBtn: {
            backgroundColor:'#00bd9d',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
        },
        readyBtnText : { 
            fontSize: 45,
            color:color.mainText
          },
        btnText : { 
          fontSize: 18,
          color:color.mainText
        },
        buttonContainer: {
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginBottom:20,
          },
          startBtn : {
            backgroundColor:color.btnBackground,
            paddingVertical: 18,
            paddingHorizontal: 30,
            borderRadius: 10,
            marginBottom:40,
            marginRight: 5,
            marginLeft: 5,
            marginTop:20,
          },
          startBtnText: {
            color:color.mainText,
            textAlign:'center',
            fontSize:30,
          },
          startBtnDisabled: {
            backgroundColor:color.btnBackground,
          },
          startBtnTextDisabled: {
            color:color.mainText,
          },
          startBtnTextSelected: {
            color:'white',
            fontSize:22,
          },

        //Circle Animation
        svgContainer: {
            margin: 0,
            position: 'absolute',
            flex: 1,
        },
    
        breathView: {
            position: "absolute",
            width: 250,
            height: 250,
            top: 106.5,
            left: 45,
    
        },
    
        breathText: {
            top: 85,
            fontSize: 50,
            textAlign: "center",
            color:'white',
        },

        //Home page
          quote: {
            marginTop:20,
            marginBottom:20,
            fontSize: 30,
            textAlign: 'center',
            color:color.mainText,
            fontStyle: 'italic'
          },
          sessionTitle: {
            position:'relative'
          },
          info: {
            position:'absolute',
            left:Dimensions.get('screen').width*0.8,
            bottom:28,
            width:20,
            height:20,
            borderWidth:1,
            borderRadius:10,
            borderColor:color.mainText,
          },
          infoText: {
            fontSize: 12,
            color:'#424874',
            textAlign:'center',
          },
          img: {
            height:75,
            width:75,
          },
          p: {
            fontSize: 30,
            color:color.mainText,
            textAlign:'center'
          },
          pageContainer: {
            flex:1,
          },
          rows: {
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            gap:10
          },
          input: {
            fontSize: 25,
            color:color.mainText,
            textAlign:'center',
            borderColor: color.mainText,
            borderWidth:1,
            borderRadius:10,
            padding:5,
            marginBottom:15,
          },
})

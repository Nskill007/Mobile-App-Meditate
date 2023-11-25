import { TouchableHighlight, Text, View, StyleSheet, Button } from 'react-native';
import React, { useContext, useEffect } from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';

const TempMap = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
        <Header />
        <View style={styles.meditateContainer}>
            <Text style={styles.subtitle}>Map Page</Text>
        </View>
        <Footer navigation={navigation}/>
    </View>
   
  )  
};

export default TempMap;

const styles = StyleSheet.create({
    pageContainer: {
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
    textAlign:'center'
  },
});
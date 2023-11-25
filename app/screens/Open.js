import { TouchableHighlight, Text, View, StyleSheet, Button } from 'react-native';
import Header  from '../components/Header'
import Footer  from '../components/Footer'
import { useSessionContext } from '../context/home_context';
import React, { useContext, useEffect } from "react";
import externalStyle from '../style/externalStyle';

const Open = ({navigation}) => {
    const { loadingQuote, quotes } = useSessionContext()  
  
    if(loadingQuote){
        return(
            <Text>Loading</Text>
        )
    }
    else {
        return (
        <View style={externalStyle.pageContainer}>
        <Header />
        <View style={externalStyle.meditateContainer}>
            <Text style={externalStyle.quote}>{quotes[1].text}..</Text>
            <TouchableHighlight onPress={() => navigation.navigate('Home')}>
                <View style={externalStyle.btn}>
                    <Text style={externalStyle.btnText}>Meditate!</Text>
                </View>
            </TouchableHighlight>
        </View>
        <Footer navigation={navigation}/>
        </View>
    );
    }
    
};

export default Open;
import { TouchableHighlight, Text, View, StyleSheet, Button } from 'react-native';
import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons/faHouseUser'
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import externalStyle from '../style/externalStyle';

const Footer = ({navigation}) => {
    return (
        <View style={externalStyle.pageContainerFooter}>
            <TouchableHighlight onPress={() => navigation.navigate('Home')}>
                    <FontAwesomeIcon icon={ faHouseUser } style={externalStyle.text} size={ 32 } />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('Map')}>
                    <FontAwesomeIcon icon={ faMap } style={externalStyle.text} size={ 32 } />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('Profile')}>
                    <FontAwesomeIcon icon={ faUser } style={externalStyle.text} size={ 32 } />
            </TouchableHighlight>
        </View>
    )
};

export default Footer;
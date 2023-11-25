import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import externalStyle from '../style/externalStyle';

function Header() {

  return (
    <SafeAreaView style={externalStyle.container}>
        <Text style={externalStyle.header}>Meditate</Text>
    </SafeAreaView>
  )
}

export default Header;
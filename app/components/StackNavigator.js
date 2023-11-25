import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Meditation from '../screens/Meditation';
import Open from '../screens/Open';
import MapComp from '../screens/MapComp';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Open' screenOptions = {{ headerShown: false, contentStyle: { backgroundColor: '#A6B1E1' } }}>
            <Stack.Screen name="Open" component ={ Open } />
            <Stack.Screen name="Home" component ={ Home } />
            <Stack.Screen  name="Meditation" component ={ Meditation } />
            <Stack.Screen  name="Profile" component ={ Profile } />
            <Stack.Screen name="Map" component={ MapComp } />
        </Stack.Navigator>
    );
};

export default StackNavigator;
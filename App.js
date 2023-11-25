import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Meditation from './app/screens/Meditation';
import Home from './app/screens/Home';
import MapComp from './app/screens/MapComp';
import Open from './app/screens/Open'
import react from 'react';
import StackNavigator from './app/components/StackNavigator'
import { HomeProvider } from './app/context/home_context';
import { UserProvider } from './app/context/user_context';


export default function App() {
  return (
    <HomeProvider>
      <UserProvider>
        <NavigationContainer >
          <StackNavigator />
        </NavigationContainer>
      </UserProvider>
    </HomeProvider>
  );
}
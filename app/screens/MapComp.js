// import { MapView, PROVIDER_GOOGLE } from "react-native-maps";
import MapView, { Marker } from 'react-native-maps';
import React from "react";
import Header from "../components/Header";
import List from '../components/List';
import Footer from '../components/Footer';
import { View, TouchableHighlight, StyleSheet, Text,Dimensions,TextInput, ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import externalStyle from '../style/externalStyle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const MapComp = ({navigation}) => {
  const [userLocation, setUserLocation] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [region, setRegion] = React.useState(false);

    React.useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let userLocation = await Location.getCurrentPositionAsync({});
          setUserLocation(userLocation);
          console.log(userLocation);
          setRegion({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (userLocation) {
        text = JSON.stringify(userLocation);
      }

    const [locations, setLocations] = React.useState([]);
    const [currentAddress, setCurrentAddress] = React.useState(false);

    const getStuff = React.useEffect(() => {
        async function fetchData() {
            // if(currentAddress){
            //     const search = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=yoga&location=" + currentAddress.lat + "%2C" + currentAddress.lng + "&radius=1500%20&key=AIzaSyB3_p9XYEVXTzrYCxJXtmtU5P2gS6AF2z8";
            // }else{
            //     const search = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=yoga&location=55.861199867982045%2C-4.243507172887839&radius=1500%20&key=AIzaSyB3_p9XYEVXTzrYCxJXtmtU5P2gS6AF2z8";
            // }

            if(userLocation){
                const search = currentAddress ? "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=yoga&location=" + currentAddress.lat + "%2C" + currentAddress.lng + "&radius=1500%20&key=AIzaSyB3_p9XYEVXTzrYCxJXtmtU5P2gS6AF2z8" 
                : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=yoga&location=" + userLocation.coords.latitude + "%2C" + userLocation.coords.longitude + "&radius=5000%20&key=AIzaSyB3_p9XYEVXTzrYCxJXtmtU5P2gS6AF2z8";

                console.log(search);
                const res = await fetch(search);
                const stuff = await res.json();

                // console.log(stuff.results[0].name + ", " + stuff.results[0].geometry.location.lat + ", " + stuff.results[0].geometry.location.lng);
                setLocations(stuff.results.map(place => {
                    return {
                        name: place.name,
                        lat: place.geometry.location.lat,
                        lng: place.geometry.location.lng,
                        address: place.vicinity,
                    }
                }))
                // console.log(locations);
                
            }else{
                const search = currentAddress ? "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=yoga&location=" + currentAddress.lat + "%2C" + currentAddress.lng + "&radius=1500%20&key=AIzaSyB3_p9XYEVXTzrYCxJXtmtU5P2gS6AF2z8" 
                : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=yoga&location=55.861199867982045%2C-4.243507172887839&radius=1500%20&key=AIzaSyB3_p9XYEVXTzrYCxJXtmtU5P2gS6AF2z8";

                if(currentAddress){
                    const res = await fetch(search);
                    const stuff = await res.json();

                    // console.log(stuff.results[0].name + ", " + stuff.results[0].geometry.location.lat + ", " + stuff.results[0].geometry.location.lng);
                    setLocations(stuff.results.map(place => {
                        return {
                            name: place.name,
                            lat: place.geometry.location.lat,
                            lng: place.geometry.location.lng,
                            address: place.vicinity,
                        }
                    }))
                    // console.log(locations);
                }
            }
        }
        fetchData();
    }, [currentAddress, userLocation]);

    const selectAutoComplete = (address) => {
        async function fetchData(){
            const search = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=" + address + "&inputtype=textquery&key=AIzaSyB3_p9XYEVXTzrYCxJXtmtU5P2gS6AF2z8";
            
            const res = await fetch(search);
            const loc = await res.json();
            const latlng = loc.candidates[0].geometry.location;
            console.log(latlng);

            setCurrentAddress(latlng);
            setRegion({
                latitude: latlng.lat,
                longitude: latlng.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              })
        }
        try {
            fetchData();
        }catch (error){
            console.log(error.message);
        }
    }
      
    // const onRegionChange = (region) => {
    //     setRegion(region);
    // }
    
    return (
        <View>
            <ScrollView keyboardShouldPersistTaps='always' listViewDisplayed={false} style={styles.list} scrollEnabled={true}>
            
            <Text style={externalStyle.mapHeader}>Search yoga classes</Text>
            
            {/* <View>
            <TextInput
            style={styles.textInput}
            placeholder="Type the address"
            // onChangeText={newText => setText(newText)}
            defaultValue={""}
            />
        </View> */}
            <GooglePlacesAutocomplete style={styles.textInput}
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data.description);
                    selectAutoComplete(data.description);
                }}
                query={{
                    key: 'AIzaSyCk9gmMfsyEe6abPPOm_k-s4HrN3NmpKO0',
                    language: 'en',
                }}
            />
            <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 55.861199867982045,
                longitude: -4.243507172887839,
                latitudeDelta: 0.02922,
                longitudeDelta: 0.02421,
            }}
            region={region}
            // onRegionChange={onRegionChange}
            showsUserLocation={true}>
                {locations.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude : marker.lat , longitude : marker.lng }}
                        title={marker.name}
                        description={marker.address}
                    />
                ))}
            </MapView>

                {/* <FlatList data={locations} renderItem={({item}) => <Text style={styles.elementText}>{item.name} - {item.address}</Text>}></FlatList> */}
            <List array={locations}></List>

            <TouchableHighlight underlayColor='rgba(255, 255, 255, 0.0)' onPress={() => {
                navigation.navigate('Home')
            }}>
            <View style={externalStyle.startBtn}>
                <Text style={externalStyle.startBtnText}>Home</Text>
            </View>
            </TouchableHighlight>

        </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    startBtn : {
        backgroundColor:'#312F2F',
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical:40,
    },
    startBtnText: {
        color:'#9381FF',
        textAlign:'center',
        fontSize:30
    },
    map: {
        marginLeft:'auto',
        marginRight:'auto',
        marginVertical: 15,
        width: 0.9*windowWidth,
        height: windowHeight/2,
    },
    textInput: {
        height: 40,
        backgroundColor: "#FFF",
        width: 0.95*windowWidth,
        borderRadius: 5,
        marginLeft:'auto',
        marginRight:'auto',
    },
    subtitle: {
        marginBottom:20,
        marginTop:60,
        fontSize: 45,
        color:'#DDD6D6',
        textAlign:'center',
        paddingLeft:20,
        paddingRight:20,

  },
});
export default MapComp;
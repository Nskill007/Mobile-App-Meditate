import { TouchableHighlight, Text, View, StyleSheet, Button, Image, Dimensions, TextInput } from 'react-native';
import React, { useContext, useEffect } from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useUserContext } from '../context/user_context';
import { ContributionGraph } from "react-native-chart-kit"
import externalStyle from '../style/externalStyle';

const setpassword = 'password'
const setemail = 'email'

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

let commitsData = [
  { date: "2023-2-2", count: 3 },
  { date: "2023-2-3", count: 2 },
  { date: "2023-2-4", count: 5 },
  { date: "2023-2-7", count: 1 },
  { date: "2023-2-8", count: 2 },
  { date: "2023-3-1", count: 5 },
  { date: "2023-3-4", count: 3 },
  { date: "2023-3-10", count: 1 }
];

const Profile = ({navigation}) => {

  const { loggedIn, enteredDayData, setEnteredDayData, setLoggedIn, setData } = useUserContext()
  const [loggingIn, setLoggingIn] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  const addNewDate = (count) => {
    setEnteredDayData(true)
    commitsData.push({date:"2023-03-24", count})
  }

  const login = () => {
    if(email === setemail && password === setpassword){
      setLoggingIn(true)
      loggedIn[password] = setpassword
      loggedIn[email] = setemail
      setLoggedIn({...loggedIn, password:setpassword, password:setpassword})
      setData(setemail, setpassword)
    }
  }

  if(Object.keys(loggedIn).length == 0 && !loggingIn){
    return (
      <View style={externalStyle.pageContainer}>
        <Header />
        <View style={externalStyle.meditateContainer}>
          <Text style={externalStyle.subtitle}>
            Login to access profile
          </Text>
          <TouchableHighlight onPress={() => setLoggingIn(true)}>
                <View style={externalStyle.btn}>
                    <Text style={externalStyle.btnText}>Login?</Text>
                </View>
            </TouchableHighlight>
        </View>
        <Footer navigation={navigation}/>
    </View>
    )
  }
  if(Object.keys(loggedIn).length == 0 && loggingIn){
    return (
      <View style={externalStyle.pageContainer}>
      <Header />
      <View style={externalStyle.meditateContainer}>
        <Text style={externalStyle.subtitle}>Login Now</Text>
        <TextInput style={externalStyle.input} onChangeText={newEmail => setEmail(newEmail)} defaultValue={email} placeholder="Enter Email" keyboardType="email-address" autoComplete='email' />
        <TextInput style={externalStyle.input} onChangeText={newText => setPassword(newText)} defaultValue={password} secureTextEntry={true} placeholder="Enter Password" autoComplete='password' />
        <TouchableHighlight onPress={() => login()}>
          <View style={externalStyle.btn}>
            <Text style={externalStyle.btnText}>Login</Text>
          </View>
        </TouchableHighlight>
      </View>
      <Footer navigation={navigation}/>
    </View>
    )
    
  }
  return (
    <View style={externalStyle.pageContainer}>
      <Header />
        <View style={externalStyle.profileContainer}>
          <View style={externalStyle.rows}>
            <Image style={externalStyle.img} source={require('../assets/profile.png')}/>
            <Text style={externalStyle.subtitle}>{loggedIn.name}</Text>
          </View>
          {!enteredDayData && !loggedIn.enteredDayData && 
          <View style={externalStyle.columns}>
            <Text style={externalStyle.p}>How is your day going?</Text>
            <View style={externalStyle.rows}>
              <TouchableHighlight onPress={() => addNewDate(5)}>
                  <Text style={externalStyle.p}>😀</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => addNewDate(4)}>
                  <Text style={externalStyle.p}>🙂</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => addNewDate(3)}>
                  <Text style={externalStyle.p}>😐</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => addNewDate(2)}>
                  <Text style={externalStyle.p}>🙁</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => addNewDate(1)}>
                  <Text style={externalStyle.p}>😟</Text>
              </TouchableHighlight>
            </View>
          </View>
          }   
          {enteredDayData && 
          <View>
            <ContributionGraph
              values={commitsData}
              endDate={new Date("2023-04-01")}
              numDays={105}
              width={Dimensions.get('screen').width - (Dimensions.get('screen').width / 10)}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
          }      
        </View>
        <Footer navigation={navigation}/>
    </View>
  )  
};

export default Profile;

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
  profileContainer: {
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
  p: {
    fontSize: 30,
    color:'#DDD6D6',
    textAlign:'center'
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
  rows: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10
  },
  columns: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    gap:10
  },
  img: {
    height:75,
    width:75,
  }
});

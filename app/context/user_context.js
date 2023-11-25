import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = React.createContext()

const initialState = {
    name:'user',
    age:'21',
    enteredDayData:false,
    password:'password',
    email:'email',
}

export const UserProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = React.useState({})
    const [enteredDayData, setEnteredDayData] = React.useState(false)

    useEffect(()=>{
        getData();
        console.log(loggedIn)
    }, [])

    useEffect(()=>{
        if(enteredDayData){
            setLoggedIn({...loggedIn, enteredDayData:true})
        }
    }, [enteredDayData])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('login')
            if(jsonValue){
                const data = await JSON.parse(jsonValue);
                setLoggedIn(data)
            }
        } catch(e) {
            console.log(e.message)
        }
    }

    const setData = async (password, email) => {
        try {
            const jsonValue = await AsyncStorage.getItem('login')
            if(jsonValue){
                const data = await JSON.parse(jsonValue);
                const newData = {...data, password, email}
                AsyncStorage.setItem('login', newData)
            }
        } catch(e) {
            console.log(e.message)
        }
    }


   return (
    <UserContext.Provider value={{ loggedIn, enteredDayData, setEnteredDayData, setLoggedIn, setData}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
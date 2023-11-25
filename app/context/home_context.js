import React, { useContext, useEffect, useState } from "react";

const SessionContext = React.createContext()

export const HomeProvider = ({ children }) => {

    const API_URL = 'https://type.fit/api/quotes'

    const [sessionType, setSessionType] = React.useState('');
    const [sessionLength, setSessionLength] = React.useState(0);
    const [isMeditate, setIsMeditate] = React.useState(false)
    const [quotes, setQuotes] = React.useState([])
    const [loadingQuote, setLoadingQuote] = useState(true)

    async function getQuotes(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        setQuotes(data)
        setLoadingQuote(false)
      } catch (error) {
        console.log(error)
        setLoadingQuote(false)
      }
      
    }

  useEffect(()=>{
    getQuotes(API_URL)
  }, [])

   return (
    <SessionContext.Provider value={{loadingQuote, quotes, sessionType, setSessionType, sessionLength, setSessionLength, isMeditate,  setIsMeditate}}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSessionContext = () => {
  return useContext(SessionContext)
}
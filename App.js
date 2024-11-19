import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SRouter from './src/Routers/SRouter'
const App = () => {
  return (
    <NavigationContainer>
     <SRouter/>
    </NavigationContainer>
  )
}
export default App
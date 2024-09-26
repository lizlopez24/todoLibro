import React from 'react'
import { PaperProvider } from 'react-native-paper'
import StackNavigator from './src/navigator/StackNavigator'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
    <PaperProvider>
      <StackNavigator></StackNavigator>
    </PaperProvider>
    </NavigationContainer>
  )
}

export default App


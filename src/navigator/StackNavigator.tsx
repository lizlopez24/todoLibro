import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';

interface Routes {
  name: string,
  screen: () => JSX.Element;
}

const Stack = createStackNavigator();

const routesNoAuth: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Registro", screen: RegisterScreen }
]
const routesAuth: Routes[] = [
  { name: "Home", screen: HomeScreen }
]

const StackNavigator = () => {
  const [isAuth, setisAuth] = useState<boolean>(false)
  const [isLoading, setisLoading] = useState<boolean>(false)

  useEffect(() => {
    setisLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisAuth(true);
      }
      setisLoading(false);
    })
  }, [])

  return (
    <>
      {isLoading ? (
        <View style={styles.rootActivity}>
          <ActivityIndicator animating={true} size={45} />
        </View>) : (
        <Stack.Navigator>
          {
            !isAuth ?
              routesNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))
              :
              routesAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))

          }

        </Stack.Navigator>)
      }
    </>
  )
}

export default StackNavigator

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
import DetailsBooksScreen from '../screen/DetailsBooksScreen';

interface Routes {
  name: string,
  screen: () => JSX.Element;
  headerShow?: boolean;
  title?: string;
}

const Stack = createStackNavigator();

const routes: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Registro", screen: RegisterScreen },
  { name: "Home", screen: HomeScreen },
  { name: 'Detail', screen: DetailsBooksScreen, headerShow: true, title: 'Detalle de libro' }
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
        <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
          {
            routes.map((item, index) => (
              <Stack.Screen
                key={index}
                name={item.name}
                options={{ headerShown: item.headerShow ?? false, title: item.title ?? '' }}
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

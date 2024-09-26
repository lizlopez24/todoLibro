import React from 'react'
import { View } from 'react-native'
import { Avatar, IconButton, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'

const HomeScreen = () => {
  return (
    <View style={styles.rootHome}>
      <View style={styles.header}>
      <Avatar.Image size={60} source={require('../../../assets/images/logo_td.jpg')} />
      <View>
        <Text variant='bodySmall'>Bienvenido a TODO LIBRO</Text>
        <Text variant='labelLarge'>N/A</Text>
      </View>
      <View style={styles.iconRight}>
        <IconButton
          icon="account-edit"
          size={25}
          mode='contained'
          iconColor='#55a7d0'
        />
      </View>
      </View>
    </View>
  )
}

export default HomeScreen

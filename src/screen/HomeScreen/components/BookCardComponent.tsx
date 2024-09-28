import React, { useState } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Book } from '../HomeScreen'
import { styles } from '../../../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props {
  book: Book;
}

const BookCardComponent = ({ book }: Props) => {
  const navigation=useNavigation();
  return (
    <View style={styles.rootList}>
        <View>
          <Text>Titulo: {book.titulo}</Text>
          <Text>Autor: {book.autor}</Text>
        
        <Text>Precio:{book.precio}</Text>
        </View>
        <View style={styles.iconRight}>
        <IconButton icon="arrow-right-bold-outline"
                    size={20}
                    mode='contained'
                    iconColor='#55a7d0'
                    onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Detail', params:{book}}))}
                     />
        </View>
    </View>
  )
}

export default BookCardComponent

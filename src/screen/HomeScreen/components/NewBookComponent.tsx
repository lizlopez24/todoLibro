import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { push, ref, set } from "firebase/database";
import { database } from '../../../config/firebaseConfig';


interface Props {
  showModal: boolean,
  setShowModal: Function
}

interface FormBook {
  titulo: string,
  autor: string,
  anio: number,
  paginas: number,
  precio: number,
  resenia: string
}

const NewBookComponent = ({ showModal, setShowModal }: Props) => {
  const [formbook, setFormBook] = useState<FormBook>({
    titulo: "", autor: "", anio: 0, paginas: 0, precio: 0, resenia: ""
  })

  const handleSetBook = (key: string, value: string) => {
    setFormBook({ ...formbook, [key]: value });
  }

  const handleRegisterBook = async () => {
    console.log(formbook)
    const dbBooks = ref(database, 'producto/')
    const saveBook = push(dbBooks)
    try {
      await set(saveBook, formbook);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <View>
      <Portal>
        <Modal visible={showModal} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.text}>Registrar Nuevo Libro</Text>
            <IconButton
              icon="close-circle-outline"
              size={25}
              onPress={() => setShowModal(false)}
              style={styles.iconRight}
            />
          </View>
          <Divider />
          <TextInput
            label='Título'
            mode='outlined'
            onChangeText={(value) => handleSetBook("titulo", value)}
          />
          <TextInput
            label='Autor'
            mode='outlined'
            onChangeText={(value) => handleSetBook("autor", value)}
          />
          <View style={styles.rootsInput}>
            <TextInput
              label='Año'
              mode='outlined'
              style={{ width: '30%' }}
              keyboardType='numeric'
              onChangeText={(value) => handleSetBook("anio", value)}
            />
            <TextInput
              label='Páginas'
              mode='outlined'
              style={{ width: '30%' }}
              keyboardType='numeric'
              onChangeText={(value) => handleSetBook("paginas", value)}
            />
            <TextInput
              label='Precio'
              mode='outlined'
              style={{ width: '32%' }}
              keyboardType='numeric'
              onChangeText={(value) => handleSetBook("precio", value)}
            />
          </View>
          <TextInput
            label='Reseña corta'
            mode='outlined'
            multiline
            numberOfLines={5}
            onChangeText={(value) => handleSetBook("resenia", value)}
          />
          <Button icon="book-open-page-variant-outline" mode='contained' onPress={handleRegisterBook} theme={{ colors: { primary: 'turquoise' } }}>Registrar</Button>
        </Modal>
      </Portal>
    </View>
  )
}

export default NewBookComponent

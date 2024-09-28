import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Divider, Icon, IconButton, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { Book } from './HomeScreen/HomeScreen';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ref, remove, update } from 'firebase/database';
import { auth, database } from '../config/firebaseConfig';

const DetailsBooksScreen = () => {
  const route = useRoute();
  //@ts-ignore
  const { book } = route.params;

  const [formEdit, setformEdit] = useState<Book>({
    id: '',
    titulo: "",
    autor: "",
    anio: 0,
    paginas: 0,
    precio: 0,
    resenia: ""
  })

  const handleSetFormEdit = (key: string, value: string) => {
    setformEdit({ ...formEdit, [key]: value })
  }

  const handleUpdate = async () => {
    const dbFer = ref(database, 'producto/' + auth.currentUser?.uid + '/' + formEdit.id)

    await update(dbFer, {
      titulo: formEdit.titulo,
      autor: formEdit.autor,
      anio: formEdit.anio,
      paginas: formEdit.paginas,
      precio: formEdit.precio,
      resenia: formEdit.resenia,
    })
    navigation.goBack();

  }

  const handleDelete = async () => {
    const dbRef = ref(database, 'producto/' + auth.currentUser?.uid + '/' + formEdit.id);
    try {
      await remove(dbRef);
      navigation.goBack();
    } catch (error) {
      console.log(error)
    }
  }

  const navigation = useNavigation();

  useEffect(() => {
    setformEdit(book);
  }, [])

  return (
    <View style={styles.rootDetails}>
      <View style={styles.iconCenter}>
        <Icon
          source="book-open-page-variant-outline"
          color='#55a7d0'
          size={40}

        />
      </View>
      <Divider />
      <TextInput
        label='Título'
        value={formEdit.titulo}
        mode='outlined'
        onChangeText={(value) => handleSetFormEdit("titulo", value)}
      />
      <TextInput
        label='Autor'
        mode='outlined'
        value={formEdit.autor}
        onChangeText={(value) => handleSetFormEdit("autor", value)}
      />
      <View style={styles.rootsInput}>
        <TextInput
          label='Año'
          mode='outlined'
          value={formEdit.anio.toString()}
          style={{ width: '30%' }}
          keyboardType='numeric'
          onChangeText={(value) => handleSetFormEdit("anio", value)}
        />
        <TextInput
          label='Páginas'
          mode='outlined'
          value={formEdit.paginas.toString()}
          style={{ width: '30%' }}
          keyboardType='numeric'
          onChangeText={(value) => handleSetFormEdit("paginas", value)}
        />
        <TextInput
          label='Precio'
          mode='outlined'
          style={{ width: '32%' }}
          value={formEdit.precio.toString()}
          keyboardType='numeric'
          onChangeText={(value) => handleSetFormEdit("precio", value)}
        />
      </View>
      <TextInput
        label='Reseña corta'
        mode='outlined'
        value={formEdit.resenia}
        multiline
        numberOfLines={5}
        onChangeText={(value) => handleSetFormEdit("resenia", value)}
      />
      <View style={styles.btnDetails}>
        <Button mode='contained'
          theme={{ colors: { primary: 'turquoise' } }}
          onPress={handleUpdate}
        >Actualizar</Button>
        <Button mode='contained'
          theme={{ colors: { primary: 'turquoise' } }}
          onPress={handleDelete}
        >Eliminar</Button>
      </View>
    </View>
  )
}

export default DetailsBooksScreen

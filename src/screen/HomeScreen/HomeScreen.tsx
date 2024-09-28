import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Divider, FAB, IconButton, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { updateProfile } from "firebase/auth";
import UserProfileComponent from './components/UserProfileComponent'
import { auth, database } from '../../config/firebaseConfig';
import firebase from '@firebase/auth';
import NewBookComponent from './components/NewBookComponent';
import BookCardComponent from './components/BookCardComponent';
import { onValue, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

interface FormUser {
  name: string
}

export interface Book {
  id: string,
  titulo: string,
  autor: string,
  anio: number,
  paginas: number,
  precio: number,
  resenia: string
}

const HomeScreen = () => {

  const [formUser, setformUser] = useState<FormUser>({ name: "" })
  const [userData, setuserData] = useState<firebase.User | null>(null)

  const [books, setbooks] = useState<Book[]>([])
  const [showMessageProfile, setshowMessageProfile] = useState<boolean>(false);
  const [showModalNewBook, setshowModalNewBook] = useState<boolean>(false);
  const handleSetFormUser = (key: string, value: string) => {
    setformUser({ ...formUser, [key]: value });
  }

  const handleUpdateUser = async () => {
    try {
      await updateProfile(auth.currentUser!, {
        displayName: formUser.name
      });
      setshowMessageProfile(false);
    } catch (error) {
      console.log(error)
    }

  }

  const handleGetBooks = () => {
    const dbRef = ref(database, 'producto/'+ auth.currentUser?.uid);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if(!data){return}
      const getKeys = Object.keys(data);
      const listBooks: Book[] = [];

      getKeys.forEach((key) => {
        const value = { ...data[key], id: key }
        listBooks.push(value);
      });
      setbooks(listBooks);
    });
  }

  useEffect(() => {
    setuserData(auth.currentUser);
    setformUser({ name: userData?.displayName ?? '' })
    handleGetBooks();
  }, [])

  return (
    <View style={styles.rootHome}>
      <View style={styles.header}>
        <Avatar.Image size={60} source={require('../../../assets/images/logo_td.jpg')} />
        <View>
          <Text variant='bodySmall'>Bienvenido a TODO LIBRO</Text>
          <Text variant='labelLarge'>{userData?.displayName}</Text>
        </View>
        <View style={styles.iconRight}>
          <IconButton
            icon="account-edit"
            size={25}
            mode='contained'
            iconColor='#55a7d0'
            onPress={() => setshowMessageProfile(true)}
          />
        </View>
      </View>
      <View>
        <Divider/>
        <Text style={styles.text}>Lista de libros</Text>
        <Divider/>
        <FlatList
          data={books}
          renderItem={({ item }) => <BookCardComponent book={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setshowModalNewBook(true)}
      />
      <NewBookComponent showModal={showModalNewBook} setShowModal={setshowModalNewBook} />
      <UserProfileComponent showMessage={showMessageProfile} setShowMessage={setshowMessageProfile} formUser={formUser} handleSetFormUser={handleSetFormUser} handleUpdateUser={handleUpdateUser} userData={userData} />
    </View>
  )
}

export default HomeScreen

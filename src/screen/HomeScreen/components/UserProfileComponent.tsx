import React from 'react'
import { Text, View } from 'react-native'
import { Button, IconButton, Modal, Portal, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import firebase from '@firebase/auth';
import { auth } from '../../../config/firebaseConfig';
import { signOut } from "firebase/auth";
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormUser {
    name: string
}

interface Props {
    showMessage: boolean,
    setShowMessage: Function,
    formUser: FormUser,
    handleSetFormUser: Function,
    handleUpdateUser: () => Promise<void>,
    userData: firebase.User | null,
}

const UserProfileComponent = ({ showMessage, setShowMessage, formUser, handleSetFormUser, handleUpdateUser, userData }: Props) => {
    const navigation=useNavigation();

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            navigation.dispatch(CommonActions.reset({
                index:0, 
                routes:[{name:'Login'}]
            }))
            setShowMessage(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Portal>
                <Modal visible={showMessage} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.text}>Mi Perfil</Text>
                        <IconButton
                            icon="close-circle-outline"
                            size={25}
                            onPress={() => setShowMessage(false)}
                            style={styles.iconRight}
                        />
                    </View>
                    <TextInput
                        label="Nombre"
                        mode='outlined'
                        placeholder='Ingrese su nombre'
                        onChangeText={(value) => handleSetFormUser("name", value)}
                        value={formUser.name}
                    />
                    <TextInput
                        label="Correo"
                        mode='outlined'
                        placeholder='Ingrese su correo electronico'
                        disabled
                        value={userData?.email!}
                    />
                    <Button mode='contained' onPress={handleUpdateUser} theme={{ colors: { primary: 'turquoise' } }}>Actualizar</Button>
                    <Button mode='contained' onPress={handleSignOut} theme={{ colors: { primary: 'turquoise' } }}>Cerrar Sesión</Button>
                </Modal>
            </Portal>
        </>
    )
}

export default UserProfileComponent

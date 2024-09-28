import React, { useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Icon, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native';

interface formUsuario {
    email: string,
    password: string
}
interface Message {
    visible: boolean,
    message: string,
    color: string
}

const LoginScreen = () => {

    const [formUsuario, setformUsuario] = useState<formUsuario>({
        email: "",
        password: ""
    })
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const [message, setmessage] = useState<Message>({
        visible: false,
        message: "",
        color: "#fff"
    })
    const navigation=useNavigation();

    const setHandleValues = (key: string, value: string) => {
        setformUsuario({ ...formUsuario, [key]: value })
    }

    const handleLogin = async () => {
        if (!formUsuario.email || !formUsuario.password) {
            setmessage({
                visible: true,
                message: "Debe completar todos los campos",
                color: "#e99439"
            })
            return;
        }
        try {
            const response = await signInWithEmailAndPassword(auth, formUsuario.email, formUsuario.password);
            navigation.dispatch(CommonActions.navigate({name:'Home'}))
        } catch (e) {
            console.log(e)
            setmessage({
                visible: true,
                message: "Erro al ingresar " + e,
                color: "#e99439"
            })
        }
    }

    return (
        <View style={styles.root}>
            <View style={styles.iconCenter}>
            <Avatar.Image size={200} source={require('../../assets/images/logo_td.jpg')} />
            <Text style={styles.text}>Iniciar sesión</Text>            
                <Icon
                    source="account-circle-outline"
                    size={80}
                />
            </View>

            <TextInput
                label="Correo"
                mode='outlined'
                placeholder='Ingrese su correo'
                onChangeText={(value) => setHandleValues("email", value)}
            />
            <TextInput
                label="Contraseña"
                mode='outlined'
                placeholder='Ingrese su contraseña'
                secureTextEntry={hiddenPassword}
                onChangeText={(value)=>setHandleValues("password",value)}
                right={<TextInput.Icon icon="eye" 
                onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            <Button mode="contained" onPress={handleLogin}  theme={{ colors: { primary: 'turquoise' } }}>
                Iniciar Sesión
            </Button>
            <Text style={styles.textRedirect} onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Registro'}))}>
                ¿No tienes cuenta? Regístrate ahora</Text>

            <Snackbar
                visible={message.visible}
                onDismiss={() => setmessage({ ...message, visible: false })}
                style={{ ...styles.messageBar, backgroundColor: message.color }}
            >
                {message.message}
            </Snackbar>
        </View>
    )
}

export default LoginScreen

import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Avatar, Button, Icon, Snackbar, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface FormRegister {
    email: string,
    password: string
}

interface message{
    visible:boolean,
    message:string,
    color:string
}

const RegisterScreen = () => {
    const [formRegister, setformRegister] = useState<FormRegister>({
        email: "", password: ""
    })

    const [message, setmessage] = useState<message>({
        visible:false,
        message:"",
        color:"#fff"
    })

    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const setHandleValues = (key: string, values: string) => {
        setformRegister({ ...formRegister, [key]: values });
    }

    const navigation=useNavigation();

    const handleRegister = () => {
        if (!formRegister.email || !formRegister.password) {
            setmessage({visible:true,message:"Debe ingresar todos los campos", color:"#e99439"})
            return;
        }

        const response=createUserWithEmailAndPassword(auth, formRegister.email, formRegister.password)
        .then((userCredential) => {
          setmessage({visible:true,message:"Usuario registrado exitosamente",color:"#a2d055"})
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setmessage({visible:true,message:"Error al registrar", color:"#e99439"})          
        });

        
        console.log(formRegister);
    }

    return (
        <View style={styles.root}>
            <View style={styles.iconCenter}>
            <Avatar.Image size={200} source={require('../../assets/images/logo_td.jpg')} />
            <Text style={styles.text}>Registro de Usuario</Text>         
            </View>
            <TextInput
                label="Email"
                mode="outlined"
                placeholder="Ingrese su correo electrónico"
                onChangeText={(value) => setHandleValues("email", value)}
            />
            <TextInput
                label="Contraseña"
                mode="outlined"
                placeholder="Ingrese su contraseña"
                onChangeText={(value) => setHandleValues("password", value)}
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
            />
            <Button mode="contained" onPress={handleRegister} theme={{ colors: { primary: 'turquoise' } }}>
                Registrarme
            </Button>
            <Text style={styles.textRedirect} onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}>
            ¿Ya tienes una cuenta? Inicia sesión ahora</Text>
            <Snackbar
                visible={message.visible}
                onDismiss={()=>setmessage({...message,visible:false})}
                style={{...styles.messageBar,backgroundColor:message.color}}
                >
                {message.message}
            </Snackbar>
        </View>
    )
}

export default RegisterScreen

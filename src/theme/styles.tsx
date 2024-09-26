import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 25,
        gap: 15
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    messageBar: {
        flex: 1,
        justifyContent: 'space-between',
    },
    rootActivity:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    iconRight:{
        alignItems:"flex-end",
        flex:1
    },
    rootHome:{
        flex:1,
        marginHorizontal:25,
        marginVertical:60
    },
    header:{
        flexDirection:'row',
        gap:15,
        alignItems:'center'
    },
    iconCenter:{
        alignItems:"center"
    },
    textRedirect:{
        marginTop:20,
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#55a7d0'
    }
})
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
    },
    modal:{
        backgroundColor: 'white', 
        padding: 20,
        gap:20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
    rootsInput:{
        flexDirection:'row',
        gap:15
    },
    rootList:{
        marginTop:10,
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        gap:25
    },
    rootDetails:{
        flex:1,
        marginHorizontal:25,
        marginVertical:40,
        gap:25
    },
    btnDetails:{
        flexDirection:'row',
        gap:25,
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:10
    }
})
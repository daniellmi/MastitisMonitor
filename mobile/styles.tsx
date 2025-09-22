import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    text_data: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 30
    },
    img: {
        width: '40%',
        height: '30%',
        marginTop: 80,
 
    },
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        borderColor: '#C7000B',
        borderTopWidth: 3,
         borderRightWidth: 3,
        borderLeftWidth: 3,
        borderBottomWidth: 3,


    },
    password: {
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 12,
    },
    title: {
        fontSize: 30,
    },
    button: {
        marginTop: 100,
        padding: 10,
        width: 200,
        backgroundColor: '#C7000B',
        borderRadius: 10
    },
    button_text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    huawei: {
        width: '40%',
        height:'20%',
        marginTop: 120

    },
    huawei_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    h_text: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        color: 'rgba(0,0,0,0.4)'
    }

})
export default styles;
import Graph from "./Graph"
import ConductivityGraph from "./MilkConductivityGraph"
import {View, Text, Image, StyleSheet} from "react-native"

const GraphBoard = () => {
    return ( 
        <>
         <Graph/>
           <ConductivityGraph/>

                <View style={styles.huawei_container}>
                <Text style={styles.h_text}>Powered by:</Text>
              <Image
                 source={(require('../assets/images/HUAWEI-logo.png'))}
                  style={styles.huawei}
                  resizeMode='contain'
                  />
                  </View>
                  
                  </>
    )
}
const styles = StyleSheet.create({
      huawei: {
        width: '40%',
        height:'20%',
        marginTop: 90

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
    },
})

export default GraphBoard;
import { Button, Text, TouchableOpacity } from "react-native";
import { useState, useEffect, use } from "react";
import { StyleSheet } from "react-native";
import { View, Modal, Image} from "react-native";
import GraphBoard from "./GraphBoard";
const Dashboard = ({ navigation }: any) => {

    const [data,setData] = useState<any>([]);
    const [heartbeat, setHeartbeat] = useState<number>(60);

        async function requestData(): Promise<void> {
        try {
         const res = await fetch("http://190.92.199.156/api/data", {method: "GET"});
        const json = await res.json();
        setData(json);              

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        requestData();      
        console.log(data);
    }, [])

    return (
        <>                      
         <Modal 
           animationType="slide" 
        statusBarTranslucent={true}
    
        >

        <View style={{
            display: 'flex',
            flex: 1,
                flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10,
        }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                   <Image
              source={require('../assets/images/button_logo.png')}
               style={styles.icon} resizeMode='contain'
                />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {
                navigation.navigate('GraphBoard');
            }}
            >
                <Image source={require('../assets/images/chart.png')}
                style={[styles.icon, {
                    width: 40
                }]}
                resizeMode="contain"
                />
            </TouchableOpacity>

        </View>

      

            {data.map((item:any, index:any) => (
                <View key={index} style={styles.card}>
                    <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('GraphBoard');
                    }}>
                        <Image
                         source={require('../assets/images/coww.png')}
                            style={styles.cow_card}
                            resizeMode='contain'
                        ></Image>
                    </TouchableOpacity>
                    <Text style={styles.label}>Cow: <Text style={styles.value}>00{item.cod_cow}</Text></Text>
                    <Text style={styles.label}>Temperature: <Text style={styles.value}>{item.temperature}°C</Text></Text>
                    <Text style={styles.label}>Accelerometer: <Text style={styles.value}>{item.accelerometer}</Text></Text>
                    <Text style={styles.label}>Heartbeat: <Text style={styles.value}>{heartbeat} bpm</Text></Text>
                    <Text style={styles.label}>Latitude:<Text style={styles.value}> 22° 32' 59.99" N</Text></Text>
                    <Text style={styles.label}>Longitude:<Text style={styles.value}> 114° 05' 60.00" E</Text></Text>
                </View>

            ))}
           
                
                </Modal>  
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
  width: 50,
  height: 50,
  marginTop: 40,
},
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    card: {
        backgroundColor: "#ffffffff",
        padding: 16,
        marginBottom: 24,
        borderRadius: 8,
        shadowColor: "#000",
        borderColor: 'red',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 4,
        borderRadius: 50
    },
    value: {
        fontWeight: "normal",
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        borderWidth: 4,
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
    },
    button_img: {
        width: 50,
        height: 50,
        margin: 10,
        marginLeft: 0,
        marginTop: 40
    },
    cow_card: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 20
    }


});
export default Dashboard;
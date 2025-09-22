import { Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, Button, TouchableOpacity, TextInputChangeEvent } from 'react-native';
import Animated from "react-native-reanimated";
import styles from './styles'

const Image = Animated.Image;
const View = Animated.View;

const LoginScreen = ({ navigation }: any) => {

    const [id, setId] = useState<string>('');

    return (
        <Modal 
        animationType="slide" 
        statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <Image source={require('../assets/images/cow.png')} 
                style={styles.img}
                resizeMode='contain'    
                />
                <Text style={styles.title}>Mastitis Monitor</Text>
                 <TextInput
                    placeholder="FARM ID"
                    style={styles.input}
                    value={id}
                    onChange={(text: any) => {
                        setId(text);
                    }}
                >
                </TextInput>

                <TouchableOpacity
                    style={[
                        styles.button,
                        {backgroundColor: id ? '#C7000B' : 'rgba(199,0,11,0.3)'},
                    ]}
                    disabled={!id}
                    onPress={() => {

                        if (id) {
                            navigation.navigate('Dashboard')
                            setId('');
                        }

                        else 
                            alert("the field is empty");
                    }}
                >
                    <Text style={styles.button_text}>DASHBOARD</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.huawei_container}>
                <Text style={styles.h_text}>Powered by:</Text>
              <Image
                 source={(require('../assets/images/HUAWEI-logo.png'))}
                  style={styles.huawei}
                  resizeMode='contain'
                  />
                  </View>
        </Modal>
    )
}
export default LoginScreen;
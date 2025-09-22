import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import LoginScreen from "./LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GraphBoard from "./GraphBoard";
// import Bootsplash from "./Bootsplash";


const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <>

 <Stack.Navigator initialRouteName="Login" >
  {/* <Stack.Screen name="Login" component={Bootsplash}/> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name = "GraphBoard" component={GraphBoard}/>
      </Stack.Navigator>
        </>
    )

}

export default App;

import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, PreferenceScreen, RegisterScreen, SplashScreen } from "../screens";
import ScreenStackNavigation from "./ScreenStackNavigation";
import Theme from "../theme/Theme";

const Stack = createNativeStackNavigator();

const AuthStackNavigation = ()=>{
    return(
        <>
        <StatusBar backgroundColor={Theme.colors.bgColor1} barStyle={'dark-content'} hidden={false} />
        <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="PreferenceScreen" component={PreferenceScreen} options={{headerShown:false}} />
        <Stack.Screen name="ScreenStackNavigation" component={ScreenStackNavigation} options={{headerShown:false}} />
      </Stack.Navigator>
        </>
    )
}

export default AuthStackNavigation;
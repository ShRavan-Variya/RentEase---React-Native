import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "../screens/rentalSide/homeScreen";
import { StatusBar } from "react-native";
import { DetailsScreen } from "../screens/rentalSide/detailsScreen";
import { PreferenceScreen, ProfilePage } from "../screens";
import { SettingScreen } from "../screens/rentalSide/settingScreen";
const Stack = createNativeStackNavigator();

const ScreenStackNavigation = ()=>{
    return(
        <>
        <StatusBar backgroundColor={Theme.colors.bgColor1} barStyle={'light-content'} hidden={false} />
        <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{headerShown:false}} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{headerShown:false}} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} options={{headerShown:false}} />
        <Stack.Screen name="PreferenceScreen" component={PreferenceScreen} options={{headerShown:false}} />
      </Stack.Navigator>
        </>
    )
}

export default ScreenStackNavigation;
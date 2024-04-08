import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigation from "./src/navigations/AuthStackNavigation";

const App = ()=>{
    return(
        <>
        <NavigationContainer>
          <AuthStackNavigation/>
        </NavigationContainer>
        </>
    )
}

export default App;
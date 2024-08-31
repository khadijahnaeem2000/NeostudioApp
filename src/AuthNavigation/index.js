import Login from '../screens/Login';
import OTP from '../screens/Login/OTP';
import MobileVerification from '../screens/Login/MobileVerification';
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const AuthNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen initialParams={{ data: null }} name="OTP" component={OTP} />
                <Stack.Screen initialParams={{ data: null }} name="MobileVerification" component={MobileVerification} />

            </Stack.Navigator>
        </>
    );
};

export default AuthNavigation;

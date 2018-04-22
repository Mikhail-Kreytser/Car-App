import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import ResultScreen from './Components/ResultScreen.js';
import HomeScreen from './Components/HomeScreen.js';
import CameraScreen from './Components/CameraScreen.js';
import SignInScreen from './Components/SignInScreen.js';
import SignUpScreen from './Components/SignUpScreen.js';
import SplashScreen from './Components/SplashScreen.js';
import AuthLoadingScreen from './Components/AuthLoadingScreen.js'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = StackNavigator({  Camera: CameraScreen, Home: HomeScreen, Result:ResultScreen });
const AuthStack = StackNavigator({Splash: SplashScreen, SignIn: SignInScreen , SignUp: SignUpScreen });

export default SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  StyleSheet, View} from 'react-native';
import { StackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import HomeScreen from './Components/HomeScreen.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = DrawerNavigator({ Home: HomeScreen});
// const AuthStack = StackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });

export default SwitchNavigator({
//        AuthLoading: AuthLoadingScreen,
        App: AppStack,
//        Auth: AuthStack,
    },
    {
        initialRouteName: 'App',
    }
);
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

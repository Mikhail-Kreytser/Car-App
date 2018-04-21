import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, SwitchNavigator, DrawerNavigator } from 'react-navigation';
import ResultScreen from './Components/ResultScreen.js';
import HomeScreen from './Components/HomeScreen.js';
import CameraScreen from './Components/CameraScreen.js';
import SignInScreen from './Components/SignInScreen.js';
import SignUpScreen from './Components/SignUpScreen.js';
import AuthLoadingScreen from './Components/AuthLoadingScreen.js'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = StackNavigator({ Home: HomeScreen, Result: ResultScreen, Camera: CameraScreen });
//const AppStack = DrawerNavigator({ Home: HomeScreen, Result: ResultScreen }); //Map: MapScreen
 const AuthStack = StackNavigator({ SignIn: SignInScreen , SignUp: SignUpScreen });

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

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//           <Text>Shake your phone to open the developer menu.</Text>
//           <Text>Shake your phone to open the developer menu.HELLO</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { Component } from 'react';
import {Alert, ActivityIndicator, AsyncStorage, Button, KeyboardAvoidingView , StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import {StackNavigator, SwitchNavigator } from 'react-navigation';

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            loading: false,
            message:'',
            token:'',
        };
    }
    static navigationOptions = {
        header: null,
        title: 'Please sign in',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={{fontSize: 60, paddingTop:60}}>
                        CarTure AI
                    </Text>
                </View>
                <View  style={{minWidth: '100%',  flex: 1 }}>
                    <ScrollView style={{padding: 60, minWidth: '100%' }}>

                        <View style={{margin:7}} />
                        <Button
                            onPress={this._signInAsync}
                            title="Sign In"
                        />
                        <View style={{margin:7}} />
                        <Button
                            onPress={this._signUp}
                            title="Sign Up"
                        />
                    </ScrollView>
                </View>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator animating ={this.state.loading} size={100} color='white' />
                </View>
            </View>
        );
    }
    _signUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    _signInAsync = async () => {
        console.log("here")
        this.props.navigation.navigate('SignIn');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
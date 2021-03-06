import React, { Component } from 'react';
import {Alert, ActivityIndicator, AsyncStorage,Image,ImageBackground, Button, StatusBar, StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
// import {URL, API, LOGIN, USER, CREATE} from '../Urls/API'
// import axios from 'react-native-axios'

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            URL: URL,
            loading: false,
            message:'',
            token:'',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errors: {
                username:'',
                email: '',
                password:'',
                confirmPassword:''
            },
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            formValid: false
        }
        //this.signInAsync = this.signInAsync.bind(this);
    }
    static navigationOptions = {
        header:null,
        title: 'Please sign up',
    };

    _signUp = () => {
        this.props.navigation.navigate('SignUp');
    }
    _signin= () => {
        this.props.navigation.navigate('App');
        this.props.navigation.navigate('SignIn');
    }

    render() {
        return (
            <View>

                <Image style={{
                    width:'100%',
                    height:'100%',
                    opacity: 0.7,
                }} source={require('AwesomeProject/Media/blurredbackground.png')}/>
            <View style={styles.container}>
                <View  style={{minWidth: '100%'}}>
                    <ScrollView style={{padding: 60}}>

                        <TextInput
                            style={{fontSize: 40, paddingBottom:10}}
                            placeholder='Username'
                            autoCorrect={false}
                            onChangeText={(username) => this.setState({username})}
                        />
                        <TextInput
                            style={{fontSize: 40, paddingBottom:10}}
                            placeholder='Email'
                            keyboardType={'email-address'}
                            autoCorrect={false}
                            onChangeText={(email) => {
                                this.setState({email})}}
                        />
                        <TextInput
                            style={{fontSize: 40, paddingBottom:10}}
                            placeholder='Password'
                            autoCorrect={false}
                            secureTextEntry ={true}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <View style={{margin:7}} />
                        <Button
                            onPress={this._signInAsync}
                            title="Submit"
                        />
                        <View style={{margin:7}} />
                        <View style={{flex: 1, justifyContent : 'flex-end'}}>
                            <TouchableOpacity onPress={this._signin} >
                                <Text style={{paddingLeft:'80%'}}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator animating ={this.state.loading} size={100} color='white' />
                </View>
            </View>
            </View>
        );
    }

    _signInAsync = async () => {
        this.setState({loading:true});
        // axios.post(`${this.state.URL}` + API + USER + CREATE, {
        //     username: `${this.state.username}`,
        //     password: `${this.state.password}`,
        //     email:`${this.state.email}`,
        // }).then((response) => {
        //     this.setState({loading:false})
        //     if(response.data.success){
        //         AsyncStorage.setItem('userToken', `${response.data.token}`);
        //         this.props.navigation.navigate('App');
        //     }else{
        //         Alert.alert('That username/email is taken');
        //     }
        // }).catch((error) => {
        //     this.setState({loading:false})
        //     Alert.alert('That username/email is taken');
        // });
        AsyncStorage.setItem('userToken', `${this.state.username}`);
        this.props.navigation.navigate('App');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
});
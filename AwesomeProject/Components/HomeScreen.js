import React from 'react';
import { Image, Button, StyleSheet, View,  TouchableOpacity,Text, AsyncStorage  } from 'react-native';
import {Camera, FileSystem, Permissions} from 'expo';


export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        }
    }
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    static navigationOptions = {
      title: 'Welcome to the app!',
    };

    // static navigationOptions = {
    //     drawerLabel: 'Home',
    //     drawerIcon: ({ tintColor }) => (
    //         <Image
    //             source={require('AwesomeProject/Media/car.png')}
    //             //'https://png.icons8.com/color/2x/car.png'}
    //             style={[styles.icon, {tintColor: tintColor}]}
    //         />
    //     ),
    // };
//<Button title="Show me options" onPress={this._showMoreApp} />

    render() {
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1 }} >
                    <Button title="Show me options" onPress={this._showCamera} />
                </View>
                <View style={{ flex: 1 }} >
                    <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
                </View>
            </View>
        );

    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    _showCamera = () => {
        this.props.navigation.navigate('Camera');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
import React from 'react';
import { Image, Button, StyleSheet, View,  TouchableOpacity,Text, AsyncStorage  } from 'react-native';
import { Camera, Permissions } from 'expo';


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
                    <Button title="Show me options" onPress={this._showMoreApp} />
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

    _showMoreApp = () => {
        this.props.navigation.navigate('Camera');
        //this.props.navigation.navigate('DrawerToggle');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


{/*<View style={{ flex: 1 }}>*/}
    {/*<Camera style={{ flex: 1 }} type={this.state.type}>*/}
        {/*<View*/}
            {/*style={{*/}
                {/*flex: 1,*/}
                {/*backgroundColor: 'transparent',*/}
                {/*flexDirection: 'row',*/}
            {/*}}>*/}
            {/*<TouchableOpacity*/}
                {/*style={{*/}
                    {/*flex: 0.1,*/}
                    {/*alignSelf: 'flex-end',*/}
                    {/*alignItems: 'center',*/}
                {/*}}*/}
                {/*onPress={() => {*/}
                    {/*this.setState({*/}
                        {/*type: this.state.type === Camera.Constants.Type.back*/}
                            {/*? Camera.Constants.Type.front*/}
                            {/*: Camera.Constants.Type.back,*/}
                    {/*});*/}
                {/*}}>*/}
                {/*<Text*/}
                    {/*style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>*/}
                    {/*{' '}Flip{' '}*/}
                {/*</Text>*/}
            {/*</TouchableOpacity>*/}
        {/*</View>*/}
    {/*</Camera>*/}
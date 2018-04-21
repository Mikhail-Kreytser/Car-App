import React from 'react';
import { Image, Button, StyleSheet, View, AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        };
    }
    static navigationOptions = {
      title: 'Results',
    };

    // static navigationOptions = {
    //     drawerLabel: 'Results',
    //     drawerIcon: ({ tintColor }) => (
    //         <Image
    //             source={require('AwesomeProject/Media/car.png')}
    //             //'https://png.icons8.com/color/2x/car.png'}
    //             style={[styles.icon, {tintColor: tintColor}]}
    //         />
    //     ),
    // };

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }

// <Button title="Show me options" onPress={this._showMoreApp} />
//     _showMoreApp = () => {
//         this.props.navigation.navigate('Home');
//         //this.props.navigation.navigate('DrawerToggle');
//     };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
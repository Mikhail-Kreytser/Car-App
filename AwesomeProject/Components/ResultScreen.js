import React from 'react';
import { Image, Button, StyleSheet, View,  TouchableOpacity,Text, AsyncStorage  } from 'react-native';
import Dealers from 'AwesomeProject/Components/Dealers.js';


export default class ResultScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dealers: [],
        }
    }
    static navigationOptions = {
        title: 'Results',
    };

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Dealers dealers={this.state.dealers}/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
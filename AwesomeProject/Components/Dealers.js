import React from 'react';
import Dealer from './Dealer'
import { Image, Button, StyleSheet, View,  TouchableOpacity,Text, AsyncStorage  } from 'react-native';
class Dealers extends React.Component {
    render() {
        return (
            <View>
                {this.props.dealers
                    // .sort((playerA, playerB) => {
                    //     return parseInt(playerA.score, 10) < parseInt(playerB.score, 10);
                    // })
                    .map((dealer, index) => {
                    return <Dealer key={index} rank={index + 1} dealer={dealer} />;
                })}
            </View>
        );
    }
}

export default Dealers;
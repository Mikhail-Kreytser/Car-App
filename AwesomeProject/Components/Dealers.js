import React from 'react';
import Dealer from './Dealer'
import { Image, Button, StyleSheet, View,ScrollView,  TouchableOpacity,Text, AsyncStorage  } from 'react-native';
class Dealers extends React.Component {
    render() {
        return (
            <View>
                <ScrollView>
                    {console.log("here")}
                    {console.log(this.props.deals)}
                {this.props.dealers
                    // .sort((dealerA, dealerB) => {
                        // return parseInt(dealerA.price,10) < parseInt(dealerB.price, 10)
                        // return dealerA.price > dealerB.price;
                    //})
                    .map((deal, index) => {
                        return  <Dealer key={index} dealer={deal} /> ;
                })}
                </ScrollView>
            </View>
        );
    }
}

export default Dealers;
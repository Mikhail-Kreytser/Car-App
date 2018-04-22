import React from 'react';
import { Image, Button, StyleSheet, View,  TouchableOpacity,Text, AsyncStorage  } from 'react-native';
import Dealers from 'AwesomeProject/Components/Dealers.js';


export default class ResultScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dealers: [{
                name: "Bay Ridge Honda",
                location: "Bay Ridge",
                hours: "9am - 5pm",
                number: "(718) 123 4567",
                price: 175
            },{
                name: "Hill Side Honda",
                location: "Hill Side",
                hours: "9am - 5pm",
                number: "(505) 904 1032",
                price: 195
            },{
                name: "Orange County Honda",
                location: "Orange County",
                hours: "9am - 5pm",
                number: "(921) 004 6780",
                price: 180
            }],
            vehicle:{
                make: "Honda",
                model: "Civic",
                type: "Sedan",
                description: "It is a Car.",
                imgSource: "http://shop.honda.com/images/2018/civic-sedan/shop/jelly-civicsedan.png",
            }
        }
        // this.addToDealers = this.addToDealers.bind(this);
    }
    static navigationOptions = {
        title: 'Results',
    };

    // addToDealers(dealer) {
    //     const dealers = this.state.dealers.concat(dealer);
    //     this.setState({
    //         dealers: dealers
    //     });
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }} >
                    <View style={{ flex: 1}}>
                        <Image
                            style={{width: 300, height: 300, marginTop:-90, resizeMode:'contain'}}
                            source={{uri: this.state.vehicle.imgSource}}
                        />
                    </View>
                    <View style={{ flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',}}>
                        <Text>{this.state.vehicle.make}</Text>
                        <Text>{this.state.vehicle.model}</Text>
                        <Text>{this.state.vehicle.type}</Text>
                        <Text>{this.state.vehicle.description}</Text>
                    </View>
                </View>
                <View style={{ flex: 3 }} >
                    <Dealers dealers={this.state.dealers}/>
                </View>
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
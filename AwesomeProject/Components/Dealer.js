import React from 'react';
import { Text, View } from 'react-native';

class Dealer extends React.Component {
    render() {
        return (
            <View>
                <Text>Name: {this.props.dealer.name}</Text>
                <Text>Location: {this.props.dealer.location}</Text>
                <Text>Number: {this.props.dealer.number}</Text>
            </View>
        );
    }
}

export default Dealer;

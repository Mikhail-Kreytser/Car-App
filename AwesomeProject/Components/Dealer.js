import React from 'react';
import { Text, View,ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import call from 'react-native-phone-call'

class Dealer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '$'+this.props.dealer.price+""
        }
    };
    _makeCall = () => {
        const args = {
            number: "1234567890" ,// String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
        }
        call(args).catch(console.error)
    }
    render() {
        return (
            <ScrollView>
                <Card style={{width:300 }}>
                    <CardTitle subtitle={this.props.dealer.dealerName}/>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <CardContent style={{flex:1, alignItems:'flex-end'}} text={this.state.price}/>
                    </View>
                    <CardAction separator={true} inColumn={false}>
                        <CardButton
                            onPress={this._makeCall}
                            title="1234567890"
                            color="#4286f4"
                        />
                    </CardAction>
                </Card>
            </ScrollView>
        );
    }
}

export default Dealer;

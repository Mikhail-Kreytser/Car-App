import React from 'react';
import { Text, View,ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import call from 'react-native-phone-call'

class Dealer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '$'+this.props.dealer.price+"/Month"
        }
    };
    _makeCall = () => {
        const args = {
            number: this.props.dealer.number, // String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
        }
        call(args).catch(console.error)
    }
    render() {
        return (
            <ScrollView>
                <Card>
                    <CardTitle subtitle={this.props.dealer.name}/>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <CardContent style={{flex:1}} text={this.props.dealer.location} />
                        <CardContent style={{flex:1, alignItems:'flex-end'}} text={this.state.price}/>
                    </View>
                    <CardAction separator={true} inColumn={false}>
                        <CardButton
                            onPress={this._makeCall}
                            title={this.props.dealer.number}
                            color="#4286f4"
                        />
                        <CardContent style={{paddingTop:14, paddingLeft:'35%'}} text={this.props.dealer.hours} />
                    </CardAction>
                </Card>
            </ScrollView>
        );
    }
}

export default Dealer;

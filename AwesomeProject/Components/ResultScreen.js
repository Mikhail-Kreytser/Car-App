import React from 'react';
import { Image, Button, StyleSheet, View,  TouchableOpacity,Text, AsyncStorage  } from 'react-native';
import Dealers from 'AwesomeProject/Components/Dealers.js';


export default class ResultScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
        // this._bootstrapAsync();
        // this.addToDealers = this.addToDealers.bind(this);
    }
    // _bootstrapAsync = async () => {
    //     // const searchResult = await AsyncStorage.getItem('searchResult');
    //     console.log(searchResult)
    // };
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
            <View>
                <Image style={{
                    width:'100%',
                    height:'100%',
                    opacity: 0.5,
                }} source={require('AwesomeProject/Media/blurredbackground.png')}/>
                <View style={styles.container}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                        <View style={{ flex: 1}}>
                            <Image
                                style={{width: 300, height: 300, marginTop:-70, resizeMode:'contain'}}
                                source={{uri: this.props.results.url}}
                            />
                        </View>
                        <View style={{ flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop:-40,}}>
                            {console.log(this.props.results)}
                            <Text>Model: {this.props.results.model}</Text>
                            <Text>MPG: {this.props.results.mpg}</Text>
                            <Text>Engine Type: {this.props.results.engine}</Text>
                            <Text>Number of Doors: {this.props.results.doors}</Text>
                            <Text>{this.props.results.description}</Text>
                        </View>
                        {console.log("HERER")}
                        {console.log(this.props.deals)}
                    </View>
                    <View style={{ flex: 3 }} >
                        <Dealers dealers={this.props.deals}/>
                    </View>
                </View>

            </View>
        );

    }
}
{/*<TouchableOpacity style={{position: 'absolute',*/}
    {/*top: 30,*/}
    {/*left: 5,*/}
    {/*right: 0,*/}
    {/*bottom: 0*/}
{/*}} onPress={this.props._onPressButton}>*/}
    {/*<Image*/}
        {/*style={styles.button}*/}
        {/*source={require('AwesomeProject/Media/backArrow.png')}*/}
    {/*/>*/}
{/*</TouchableOpacity>*/}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: 55

    },
});
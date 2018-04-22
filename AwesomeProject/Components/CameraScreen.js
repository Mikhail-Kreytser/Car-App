import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Image, ActivityIndicator,Vibration ,Button, AsyncStorage} from 'react-native';
import { RNS3 } from 'react-native-aws3';
//import GalleryScreen from 'AwesomeProject/Components/GalleryScreen';
import isIPhoneX from 'react-native-is-iphonex';
import { SECRET_KEY,SIGHTHOUND, ACCESSKEY, BUCKET, API, BACK_END } from 'AwesomeProject/APIkey/API';
import axios from 'react-native-axios';
import ResultScreen from "./ResultScreen";

const landmarkSize = 2;
const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

export default class CameraScreen extends React.Component {
    constructor(props){
        super(props);
        this.takePicture = this.takePicture.bind(this);
        // this.toggleFacing = this.toggleFacing.bind(this)
        this.toggleFlash = this.toggleFlash.bind(this)
        this.setFocusDepth = this.setFocusDepth.bind(this)
        this.renderCamera = this.renderCamera.bind(this)
        this.state = {
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            depth: 0,
            type: 'back',
            whiteBalance: 'auto',
            ratio: '16:9',
            ratios: [],
            photoId: 1,
            showGallery: false,
            photos: [],
            permissionsGranted: true,
            loading : false,
            showResult: false,
            results :{url: "", model : "",doors: 4, mpg : 40, engine: "V8", description: "A Car"},
            deals:[]
        }
        changeState = this.changeState.bind(this);
        // this.componentWillMount();
    }

    static navigationOptions = {
        header: null,
    };
    //componentWillMount = async () => {
    // async componentWillMount() {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //     this.setState({ permissionsGranted: status === 'granted' });
    // }

    componentDidMount() {
        // vision.init({ auth: API.Key})
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            console.log(e, 'Directory exists');
        });
    }

    getRatios = async () => {
        const ratios = await this.camera.getSupportedRatios();
        return ratios;
    };

    // toggleFacing() {
    //     this.setState({
    //         type: this.state.type === 'back' ? 'front' : 'back',
    //     });
    // }
    changeState(result,data_deal) {
        const data_deals = this.state.deals.concat(data_deal);
        this.setState({results: result, deals: data_deals, showResult: true});
        console.log(this.state.data_deals)
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }


    // _nextPage = () {
    //     this.setState({loading :false});
    //     this.props.navigation.navigate('Result');
    // }

    // _nextPage = () => {
    //     this.setState({loading :false});
    //     this.props.navigation.navigate('Result');
    // };

    takePicture = async function() {
        if (this.camera) {
            this.camera.takePictureAsync({base64 :true, quality:0}).then(data => {
                const file = {
                    // `uri` can also be a file system path (i.e. file://)
                    uri: data.uri,
                    name: "Photo_1.jpg",
                    type: "image/jpg"
                }
                const options = {
                    keyPrefix: "uploads/",
                    bucket: BUCKET,
                    region: "us-east-1",
                    accessKey: ACCESSKEY,
                    secretKey: SECRET_KEY,
                    successActionStatus: 201
                }

                RNS3.put(file, options).then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    console.log(response.body.postResponse.location);
                    // axios.post('https://vision.googleapis.com/v1/images:annotate?key='+API, {
                    //         "requests":[
                    //             {
                    //                 "image":{
                    //                     "source":{
                    //                         "imageUri": response.body.postResponse.location
                    //                     }
                    //                 },
                    //
                    //                 "features":[
                    //                     {
                    //                         "type":"WEB_DETECTION",
                    //                         "maxResults":10
                    //                     },
                    //                     {
                    //                         "type":"LABEL_DETECTION",
                    //                         "maxResults":10
                    //                     }
                    //                 ]
                    //             }
                    //         ]

                    var image = {image: "https://1-photos7.motorcar.com/new-2018-honda-civic_coupe-lxmanual-8487-17212275-1-1024.jpg"};//response.body.postResponse.location};
                    var xmlhttp = new XMLHttpRequest();
                    var result;

                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                            result = xmlhttp.responseText;
                            //console.log(result);

                        }
                    }
                    xmlhttp.addEventListener("loadend", loadEnd);

                    function loadEnd(e) {
                        console.log(result);
                        // fetch(BACK_END, {
                        //     method: 'POST',
                        //     headers: {
                        //         Accept: 'application/json',
                        //         'Content-Type': 'application/json',
                        //     },
                        //     body: result,
                        // }).then(function(api_response){
                        //     console.log(api_response)
                        //     // AsyncStorage.setItem('searchResult', `${result}`);
                        // }).catch(function(err){
                        //         console.log(err);
                        //         // AsyncStorage.setItem('searchResult', `${result}`);
                        //     })
                        axios.post(BACK_END,result,{headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            }})
                            .then(function(api_response){
                                console.log(api_response.data.data.deals)
                                this.changeState(api_response.data.data.vehicleData, api_response.data.data.deals)
                                //this.props.navigation.navigate('Result');
                                // this.setState({results: api_response.data.data.vehicleData,showResult: true})
                                //AsyncStorage.setItem('searchResult', `${result}`);
                            })
                            .catch(function(err){
                                console.log(err);
                                // AsyncStorage.setItem('searchResult', `${result}`);
                            })
                    }


                    xmlhttp.open("POST", "https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle");
                    xmlhttp.setRequestHeader("Content-type", "application/json");
                    xmlhttp.setRequestHeader("X-Access-Token", SIGHTHOUND);
                    xmlhttp.send(JSON.stringify(image));
                    // AsyncStorage.clear();
                    // this.setState({loading:true});
                    // _nextPage();
                    // axios.post('https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle', {
                    //     "requestPayload": {
                    //         "image":response.body.postResponse.location
                    //     }
                    // },{
                    //     headers: {
                    //         'Content-Type' : 'application/json',
                    //         'X-Access-Token' : SIGHTHOUND
                    //     }
                    // }).then(function (response) {
                    //     if(result){
                    //         console.log(response.data);
                    //         axios.post('http://10.200.1.39:3001/api/parsecarstats',response.data)
                    //             .then(function(api_response){
                    //                 console.log(api_response)
                    //
                    //             })
                    //             .catch(function(err){
                    //                 console.log(err);
                    //             })
                    //
                    //     }
                        // )
                        //     .catch(function (error) {
                        //         console.log(error);
                        //     });

                    // this.setState({showResult: true})
                });

                    // FileSystem.moveAsync({
                    //     from: data.uri,
                    //     to: `${FileSystem.documentDirectory}photos/Photo_1.jpg`,
                    // }).then(() => {

                // FileSystem.moveAsync({
                //     from: data.uri,
                //     to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
                // }).then(() => {
                //     ImgToBase64.getBase64String(`${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`)
                //         .then(base64String => {console.log(base64String)})
                //         .catch(err => {console.log(err)});
                //     this.setState({
                //         photoId: this.state.photoId + 1,
                //     });
                //     Vibration.vibrate();
                // }).catch(err =>{
                //     console.log(err)
                // });
                // console.log(this.state.photoId)

            });

        }
    };

    // renderGallery() {
    //     return <GalleryScreen onPress={this.toggleView.bind(this)}/>;
    // }

    _back(val){
        this.setState({showResult:val});
    }

    renderResult() {
        return <ResultScreen deals = {this.state.deals} results={this.state.results}/>;
        // return <ResultScreen results={{
        //     dealers: [{
        //         name: "Bay Ridge Honda",
        //         location: "Bay Ridge",
        //         hours: "9am - 5pm",
        //         number: "(718) 123 4567",
        //         price: 175
        //     },{
        //         name: "Hill Side Honda",
        //         location: "Hill Side",
        //         hours: "9am - 5pm",
        //         number: "(505) 904 1032",
        //         price: 195
        //     },{
        //         name: "Orange County Honda",
        //         location: "Orange County",
        //         hours: "9am - 5pm",
        //         number: "(921) 004 6780",
        //         price: 180
        //     }],
        //     vehicle:{
        //         make: "Honda",
        //         model: "Civic",
        //         type: "Sedan",
        //         description: "It is a Car.",
        //         imgSource: "http://shop.honda.com/images/2018/civic-sedan/shop/jelly-civicsedan.png",
        //     }
        // }}/>;

    }

    renderNoPermissions() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text style={{ color: 'white' }}>
                    Camera permissions not granted - cannot open camera preview.
                </Text>
            </View>
        );
    }
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    renderCamera() {
        return (
            <Camera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 6,
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}>
                <View
                    style={{
                        flex: 0.5,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingTop: Constants.statusBarHeight / 2,
                    }}>
                    {/*<TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>*/}
                        {/*<Text style={styles.flipText}> FLIP </Text>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                        <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={this._signOutAsync}>
                        <Text style={styles.flipText}> Sign Out </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 0.4,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        marginBottom: -5,
                    }}>
                    {this.state.autoFocus !== 'on' ? (
                        <Slider
                            style={{ width: 150, marginTop: 15, marginRight: 15, alignSelf: 'flex-end' }}
                            onValueChange={this.setFocusDepth.bind(this)}
                            step={0.1}
                        />
                    ) : null}
                </View>
                <View
                    style={{
                        flex: 0.1,
                        paddingBottom: isIPhoneX ? 20 : 0,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                        style={[ styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                        onPress={this.takePicture}>
                        {/*<Text style={styles.flipText}> SNAP </Text>*/}
                        <Image style={{
                            height: 80,resizeMode:'center'}}
                            source={require('AwesomeProject/Media/Bulb.png')}/>
                    </TouchableOpacity>

                </View>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator animating ={this.state.loading} size="large" color='white' />
                </View>
            </Camera>
        );
    }


    render() {
        // const cameraScreenContent = this.state.permissionsGranted
        //     ? this.renderCamera()
        //     : this.renderNoPermissions();
        const cameraScreenContent = this.renderCamera();
        // const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent;
        //const content = cameraScreenContent
        const content = this.state.showResult ? this.renderResult() : cameraScreenContent;

        return content//<View style={styles.container}>{content}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    navigation: {
        flex: 1,
    },
    gallery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    item: {
        margin: 4,
        backgroundColor: 'indianred',
        height: 35,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picButton: {
        //backgroundColor: 'darkseagreen',
    },
    galleryButton: {
        backgroundColor: 'indianred',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
    },
});
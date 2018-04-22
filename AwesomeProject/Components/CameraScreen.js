import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Image, Vibration ,Button, AsyncStorage} from 'react-native';
import { RNS3 } from 'react-native-aws3';
//import GalleryScreen from 'AwesomeProject/Components/GalleryScreen';
import isIPhoneX from 'react-native-is-iphonex';
import { SECRET_KEY, ACCESSKEY, BUCKET, API } from 'AwesomeProject/APIkey/API';
import axios from 'react-native-axios';

const landmarkSize = 2;
const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

export default class CameraScreen extends React.Component {
    state = {
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
        permissionsGranted: false,
    };

    static navigationOptions = {
        header: null,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
    }

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

    toggleView() {
        this.setState({
            showGallery: !this.state.showGallery,
        });
    }

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    setRatio(ratio) {
        this.setState({
            ratio,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }
    sendPost = async function(base64String){
        console.log(base64String)
        // axios.post('https://vision.googleapis.com/v1/images:annotate?key='+API, {
        //     "requests":[
        //         {
        //             "image":{
        //                 "content":base64String
        //             },
        //             "features":[
        //                 {
        //                     "type":"IMAGE_PROPERTIES",
        //                     "maxResults":5
        //                 }
        //             ]
        //         }
        //     ]
        // }).then(function (response) {
        //     console.log(response);
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

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
                    axios.post('https://vision.googleapis.com/v1/images:annotate?key='+API, {
                            "requests":[
                                {
                                    "image":{
                                        "source":{
                                            "imageUri": response.body.postResponse.location
                                        }
                                    },

                                    "features":[
                                        {
                                            "type":"WEB_DETECTION",
                                            "maxResults":10
                                        },
                                        {
                                            "type":"LABEL_DETECTION",
                                            "maxResults":10
                                        }
                                    ]
                                }
                            ]
                        }).then(function (response) {
                            console.log(response.data);
                            axios.post('http://10.200.1.39:3001/api/parsecarstats',response.data)
                                .then(function(api_response){
                                    console.log(api_response)

                                })
                                .catch(function(err){
                            console.log(err);
                        })

                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                    this.props.navigation.navigate('Result');
                });


//                 axios.post('http://10.200.1.39:3001/api/sign_s3/', {
//                     fileName: `${this.state.photoId}`,
//                     fileType: 'jpg',
//                 }).then(function (response){


                    // FileSystem.moveAsync({
                    //     from: data.uri,
                    //     to: `${FileSystem.documentDirectory}photos/Photo_1.jpg`,
                    // }).then(() => {


                    //     let options = {
                    //         header : {
                    //             'Content-Type': 'jpg'
                    //         }
                    //     };
                    //      console.log(response.data.data.returnData.signedRequest)
                    //     axios.put(response.data.data.returnData.signedRequest,
                    //         data.uri,
                    //         options
                    //     ).then((response) => {
                    //         console.log(response)
                    //     }).catch((err)=>{
                    //         console.log("HERE")
                    //         console.log(err)
                    //     })
                    // }).catch(err=>{
                    //     console.log(err)
                    // })


                //
                //         // console.log();
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
                // fetch('http://10.200.1.39:3001/api/sign_s3/', {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         fileName: `${this.state.photoId}`,
                //         fileType: 'jpg',
                //     }),
                // }).then((response)=>{
                //     console.log(response);
                // }).catch((err)=>{
                //     console.log(err);
                // });

                // headers: {
                //     Accept: 'application/json',
                //         'Content-Type': 'application/json',
                // },

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
                    <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                        <Text style={styles.flipText}> FLIP </Text>
                    </TouchableOpacity>
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
                        onPress={this.takePicture.bind(this)}>
                        {/*<Text style={styles.flipText}> SNAP </Text>*/}
                        <Image style={{
                            height: 80,resizeMode:'center'}}
                            source={require('AwesomeProject/Media/Bulb.png')}/>
                    </TouchableOpacity>
                </View>
            </Camera>
        );
    }


// <View style={{ flex: 1 }} >
// <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
// </View>
    render() {
        const cameraScreenContent = this.state.permissionsGranted
            ? this.renderCamera()
            : this.renderNoPermissions();
        // const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent;
        const content = cameraScreenContent
        return <View style={styles.container}>{content}</View>;
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
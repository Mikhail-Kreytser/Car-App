import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration , AsyncStorage} from 'react-native';
import GalleryScreen from 'AwesomeProject/Components/GalleryScreen';
import isIPhoneX from 'react-native-is-iphonex';
import vision from "react-cloud-vision-api";
import { API } from 'AwesomeProject/APIkey/API'
import ImgToBase64 from 'react-native-image-base64';
import axios from 'react-native-axios';
var ReadImageData = require('NativeModules').ReadImageData;

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

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
    }

    componentDidMount() {
        // vision.init({ auth: API.Key})
        // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
        //     console.log(e, 'Directory exists');
        // });
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

    takePicture = async function() {
        if (this.camera) {
            this.camera.takePictureAsync({base64 :true}).then(data => {
                //console.log(data.base64);
                axios.post('https://vision.googleapis.com/v1/images:annotate?key='+API, {
                    "requests":[
                        {
                            "image":{
                                "content":data.base64
                            },
                            "features":[
                                {
                                    "type":"IMAGE_PROPERTIES",
                                    "maxResults":5
                                }
                            ]
                        }
                    ]
                }).then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //     fetch('https://vision.googleapis.com/v1/images:annotate?key='+API, {
                //     method: 'POST',
                //     body:JSON.stringify({"requests":[
                //             {
                //                 "image":{
                //                     "source":{
                //                         "imageUri":
                //                             "https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/14q4/640315/2015-rolls-royce-ghost-series-ii-photo-643518-s-986x603.jpg"
                //                     }
                //                 },
                //                 "features":[
                //                     {
                //                         "type":"WEB_DETECTION",
                //                         "maxResults":5
                //                     }
                //                 ]
                //             }
                //         ]
                //     }),
                // }).then(results =>{
                //     console.log(results);
                // }).catch(err => {
                //     console.error('ERROR:', err);
                // });
                //JSON.stringify(imageRequest)






                // FileSystem.moveAsync({
                //     from: data.uri,
                //     to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
                // }).then(() => {
                //     this.setState({
                //         photoId: this.state.photoId + 1,
                //     });
                //     Vibration.vibrate();
                // });

            });
        }
    };

    renderGallery() {
        return <GalleryScreen onPress={this.toggleView.bind(this)}/>;
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

    renderCamera() {
        return (
            <Camera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
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
                        style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                        onPress={this.takePicture.bind(this)}>
                        <Text style={styles.flipText}> SNAP </Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity*/}
                        {/*style={[styles.flipButton, styles.galleryButton, { flex: 0.25, alignSelf: 'flex-end' }]}*/}
                        {/*onPress={this.toggleView.bind(this)}>*/}
                        {/*<Text style={styles.flipText}> Gallery </Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </Camera>
        );
    }

    render() {
        const cameraScreenContent = this.state.permissionsGranted
            ? this.renderCamera()
            : this.renderNoPermissions();
        const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent;
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
        backgroundColor: 'darkseagreen',
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
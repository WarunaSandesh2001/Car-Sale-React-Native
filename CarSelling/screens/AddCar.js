import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, Center, VStack, Input, TextArea, NativeBaseProvider } from 'native-base';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

export default function AddCar() {
    const image = require('../assets/coverImage.png')
    const [photo, setPhoto] = useState(null);

    const takePhotoFromCamera = async () => {
        const options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: true,
            presentationStyle: 'popover',
            quality: 1
        }
        launchCamera(options, (res) => {
            if (res.didCancel) {
                console.log('User Cancled');
            } else if (res.errorCode) {
                console.log(res.errorMessage);
            } else {
                // const data = res.assets[0].uri;
                // console.log(data);
                // setPhoto(data);
            }
        });
        // setPhoto(result.assets[0].uri);
    }

    // launchImageLibrary = () => {
    //     let options = {
    //       storageOptions: {
    //         skipBackup: true,
    //         path: 'images',
    //       },
    //     };
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //       console.log('Response = ', response);
    
    //       if (response.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //         alert(response.customButton);
    //       } else {
    //         const source = { uri: response.uri };
    //         console.log('response', JSON.stringify(response));
    //         this.setState({
    //           filePath: response,
    //           fileData: response.data,
    //           fileUri: response.uri
    //         });
    //       }
    //     });
    
    //   }

    Library =async () => {
        let options = {
          saveToPhotos: true,
          mediaType: 'photo'
        };
       const result = await launchImageLibrary(options)
       setPhoto(result.assets[0].uri)
    
      }

    return (
        <NativeBaseProvider style={styles.container}>
            <Text style={styles.title}>Save Your Car Details</Text>

            <Image style={styles.uploadImageContainer} source={{uri:photo}} />

            <HStack space={2} justifyContent={'center'}>
                <IconButton
                    icon="camera"
                    iconColor={MD3Colors.neutral10}
                    size={30}
                    mode={'contained'}
                    style={styles.captureBtn}
                    onPress={() => {
                        takePhotoFromCamera();
                    }}
                />
                <Button icon="upload" mode="contained-tonal" textColor='#050354' buttonColor='#c0edfc' style={styles.uploadImage_btn} onPress={() => Library()}>
                    Upload an Image
                </Button>
            </HStack>

            <VStack space={4} alignItems="center" mt="5%">
                <Input type="text" style={styles.input} w="80%" placeholder='Date' borderColor={'black'} />
                <Input type="text" style={styles.input} require w="80%" placeholder='Location' borderColor={'black'} />
                <TextArea borderColor={'black'} placeholder="Description" w="80%" h="20" maxW="300" fontSize={15} />
            </VStack>

            <HStack space={2} justifyContent={'center'} marginTop={'4%'}>
                <Button icon="car" mode="contained" width={"40%"} buttonColor='#100459'>
                    Save
                </Button>
                <Button icon="delete-sweep" mode="contained" width={"40%"} buttonColor='gray'>
                    Clear
                </Button>
            </HStack>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    title: {
        color: "black",
        fontSize: 25,
        alignSelf: "center",
        marginTop: 10,
        fontWeight: '500'
    },
    uploadImageContainer: {
        width: "80%",
        height: "40%",
        borderColor: "red",
        borderWidth: 1,
        marginTop: 20,
        marginLeft: "10%"
    },
    captureBtn: {
        backgroundColor: "#c0edfc",
        right: 270,
        top: 0,
        position: "absolute"
    },
    upload_btn_label: {
        color: '#04044a',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontFamily: 'arial'
    },
    uploadImage_btn: {
        width: '50%',
        marginLeft: 150,
        marginTop: '2.5%',
        borderRadius: 100
    }
})
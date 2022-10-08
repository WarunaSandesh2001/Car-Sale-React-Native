import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, HStack, Center, VStack, Input, TextArea, NativeBaseProvider } from 'native-base';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';


export default function AddCar({ route , navigation }) {
    // const image = require('../assets/coverImage.png')
    const [photo, setPhoto] = useState("");
    
    const [username, setUsername] = useState(route.params.username);
    console.log(username);
    // const [fullname, setFullName] = useState("waruna");
    // const [username, setUsername] = useState("w2001");

    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

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

    Library = async () => {
        let options = {
            saveToPhotos: true,
            mediaType: 'photo'
        };
        const result = await launchImageLibrary(options)
        setPhoto(result.assets[0])

        console.log(result.assets[0]);
        

    }

    const createFormData = (photo, body) => {
        const data = new FormData();

        data.append('photo',{
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
        });

        console.log(data.uri);

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        console.log(data._parts);

        return data;
    };

    uploadImage = async () => {
        fetch('http://192.168.43.224:4000/cars/save', {
            method: 'POST',
            body: createFormData(photo, {
                username: username,
                date: date,
                location: location,
                description: description
            }),
            headers:{
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
            },
            
        })
            .then((response) => {response.json();})
            .then((json) => {
                // console.log('upload succes', response);
                alert('Upload success!');
                clearTextFields();
            })
            .catch((error) => {
                console.log('upload error', error);
                alert('Upload failed!');
            });
    }

    clearTextFields = () => {
        setPhoto("");
        setDate("");
        setLocation("");
        setDescription("");
    }

    return (
        <NativeBaseProvider style={styles.container}>
            <Text style={styles.title}>Save Your Car Details</Text>

            <Image style={styles.uploadImageContainer} source={{ uri: photo.uri }} />

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
                <Input type="text" style={styles.input} w="80%" placeholder='Date' borderColor={'black'} value={date} onChangeText={(e) => { setDate(e) }}/>
                <Input type="text" style={styles.input} require w="80%" placeholder='Location' borderColor={'black'} value={location} onChangeText={(e) => { setLocation(e) }} />
                <TextArea borderColor={'black'} placeholder="Description" w="80%" h="20" maxW="300" fontSize={15} value={description} onChangeText={(e) => { setDescription(e) }} />
            </VStack>

            <HStack space={2} justifyContent={'center'} marginTop={'4%'}>
                <Button icon="car" mode="contained" width={"40%"} buttonColor='#100459' onPress={() => uploadImage()}>
                    Save
                </Button>
                <Button icon="delete-sweep" mode="contained" width={"40%"} buttonColor='gray' onPress={() => clearTextFields()}>
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
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground,Alert } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Box, Input, Center } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = require('../assets/coverImageLogin.png')

export default function Login({ navigation }) {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    loginUser = () => {
        fetch(`http://192.168.43.224:4000/users/login/${username}/${password}`, {
            method: "GET",
            headers:{
                'content-type':'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            if(json.length === 0){
                Alert.alert("Username or password incorrect.Try again!")
            } else {
                clearTextFields()
                Alert.alert("Login Successful.");
                navigation.navigate("LoadAllCars");
            }
        })
        .catch((err)=>Alert.alert(err.message));
    }

    clearTextFields = () => {
        setUsername("");
        setPassword("");
    }

    return (
        <NativeBaseProvider>
            <Box style={styles.mainContainer}>
                <ImageBackground style={styles.stretch} resizeMode='cover' source={image} >
                    <View style={styles.container1}>
                        <Text style={styles.topic}>MuffleX</Text>
                        <Text style={styles.subTopic}>FIND YOUR DREAM CAR</Text>
                    </View>
                    <View style={styles.container2}>
                        <TextInput style={styles.input1} textAlign={'center'} value={username} placeholder='Username' onChangeText={(e) => { setUsername(e) }} />
                        <TextInput style={styles.input2} textAlign={'center'} value={password} placeholder='Password'  onChangeText={(e) => { setPassword(e) }} />
                        <TouchableOpacity style={styles.btn}>
                            <Text style={{ color: '#ffff', fontSize: 20 }}  onPress={()=>{loginUser()}} >Sign In</Text>
                        </TouchableOpacity>
                        <Text style={styles.footerText}>Don't Have Account?</Text>
                        <TouchableOpacity style={styles.btnRegister}>
                            <Text style={{ color: 'green', fontSize: 13, fontWeight: "600", letterSpacing: 0.5 }}  onPress={()=>{navigation.navigate("SignUp")}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Box>
        </NativeBaseProvider>

    )
};

const styles = StyleSheet.create({
    stretch: {
        width: "100%",
        height: "100%"
    },
    mainContainer: {
        ImageBackground: "image",
        width: windowWidth,
        height: windowHeight
    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    topic: {
        color: "white",
        fontSize: 50,
        fontFamily: "calibri",
        top: 30,
        fontWeight: "bold",
        letterSpacing: 2
    },
    subTopic: {
        color: "#a4a4c1",
        fontSize: 11,
        fontFamily: "monospace",
        top: 30,
        fontWeight: "bold",
        letterSpacing: 10
    },
    input1: {
        marginTop: '50%',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 2
    },
    input2: {
        marginTop: '6%',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 2
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    btn: {
        width: '50%',
        padding: 5,
        backgroundColor: "transparent",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        borderRadius: 40,
        borderColor: 'white',
        borderWidth: 3,
        letterSpacing: 2,
        marginTop : 75
    },
    footerText: {
        position: "relative",
        marginTop: 150,
        
    },
    btnRegister: {
     
    }
});
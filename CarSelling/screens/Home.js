import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, Input } from 'react-native'
import React from 'react'
import { NativeBaseProvider, Box, Switch, VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const image = require('../assets/coverImage.png')

export default function Home({ navigation }) {
    return (
        <NativeBaseProvider>
            {/* <Box style={styles.mainContainer}> */}
                <ImageBackground style={styles.stretch} resizeMode='cover' source={image} >
                    <View style={styles.container1}>
                        <Text style={styles.topic}>MuffleX</Text>
                        <Text style={styles.subTopic}>FIND YOUR DREAM CAR</Text>
                    </View>
                    <View style={styles.container} onPress={()=>{navigation.navigate("Login")}}>
                        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Login")}}>
                            <LinearGradient colors={['#577ff7', '#0712e0', '#080c5e']} style={styles.gradient} >
                                <Text style={styles.text} onPress={()=>{navigation.navigate("Login")}}>Explore Now</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            {/* </Box> */}
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
        // width: windowWidth,
        // height: windowHeight
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
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    btn: {
        width: '60%',
        padding: 5,
        backgroundColor: "#FFFF",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        borderRadius: 40,
        borderColor: 'gray',
        borderWidth: 3,
        letterSpacing: 2,
        marginTop: 545
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        top: 250
    },
    button: {
        width: '70%',
        height: 45
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Georgia',
        letterSpacing: 0.5
    }
});
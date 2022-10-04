import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, Input } from 'react-native'
import React from 'react'
import { NativeBaseProvider, Box, Switch, VStack, IconButton, Icon, Entypo, AntDesign, Stack, SafeAreaView, HStack, Select, CheckIcon } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const image = require('../assets/registerForm.png')

export default function SignUp() {

    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [service, setService] = React.useState("");

    return (
        <NativeBaseProvider>
            <Box style={styles.mainContainer1}>
                <ImageBackground style={styles.stretch} resizeMode='cover' source={image} >
                    <View style={styles.container1}>
                        <Text style={styles.subTopic}>FIND YOUR DREAM CAR</Text>
                        <Text style={styles.topic}>Sign Up Here..</Text>
                    </View>
                </ImageBackground>
            </Box>
            <View style={styles.mainContainer2}>
                <HStack space={5} mt="8%">
                    <TextInput style={styles.input} placeholderTextColor="gray" underlineColorAndroid={"#07124f"} placeholder='First Name' />
                    <TextInput style={styles.input} placeholderTextColor="gray" underlineColorAndroid={"#07124f"} placeholder='Last Name' />
                </HStack>

                <TextInput style={styles.input1} placeholderTextColor="gray" width="90%" underlineColorAndroid={"#07124f"} placeholder='Address' />
                <TextInput style={styles.input1} placeholderTextColor="gray" width="90%" underlineColorAndroid={"#07124f"} placeholder='NIC' />
                <TextInput style={styles.input1} placeholderTextColor="gray" width="90%" underlineColorAndroid={"#07124f"} placeholder='Contact' />

                <Box maxW="350">
                    <Select selectedValue={service} minWidth="200" borderColor={"#07124f"} marginLeft={6} marginTop={5} accessibilityLabel="Select Gender" placeholder="Select Gender" _selectedItem={{
                        bg: "primary.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="Male" value="Male" />
                        <Select.Item label="Female" value="Female" />
                    </Select>
                </Box>

                <HStack space={5} mt="8%">
                    <TextInput style={styles.input2} placeholderTextColor="gray" underlineColorAndroid={"green"} placeholder='Username' />
                    <TextInput style={styles.input2} placeholderTextColor="gray" underlineColorAndroid={"green"} placeholder='Password' />
                </HStack>

                <TouchableOpacity style={styles.btn}>
                    <Text style={{ color: '#07124f', fontSize: 20, fontWeight: "600" }}>Register</Text>
                </TouchableOpacity>
            </View>
        </NativeBaseProvider>

    )
};

const styles = StyleSheet.create({
    stretch: {
        width: "100%",
        height: "100%"
    },
    mainContainer1: {
        backgroundColor: "white",
        height: "25%"
    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    topic: {
        color: "white",
        fontSize: 30,
        fontFamily: "calibri",
        marginTop: 20,
        fontWeight: "bold",
        letterSpacing: 2
    },
    subTopic: {
        color: "white",
        fontSize: 12,
        fontFamily: "monospace",
        marginTop: -15,
        fontWeight: "bold",
        letterSpacing: 10,
        borderColor: "white",
        borderWidth: 1
    },
    mainContainer2: {
        backgroundColor: "white",
        height: "75%"
    },
    input: {
        height: 40,
        padding: 10,
        marginLeft: 10,
        color: "#07124f",
        width: "41%",
        marginTop: 10
    },
    input1: {
        position: "relative",
        marginLeft: 10,
        padding: 10,
        marginTop: 10,
        color: "#07124f"
    },
    input2: {
        height: 40,
        padding: 10,
        marginLeft: 10,
        color: "#07124f",
        width: "41%",
        marginTop: 10
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
        borderColor: '#1a02a3',
        borderWidth: 3,
        letterSpacing: 2,
        marginTop: 80,
        alignSelf: "center"
    }
});
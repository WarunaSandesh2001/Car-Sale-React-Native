import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground, Input, Alert } from 'react-native'
import React,{useState} from 'react'
import { NativeBaseProvider, Box, Switch, VStack, IconButton, Icon, Entypo, AntDesign, Stack, SafeAreaView, HStack, Select, CheckIcon } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const image = require('../assets/registerForm.png')

export default function SignUp() {

    // const [text, onChangeText] = React.useState("Useless Text");
    // const [number, onChangeNumber] = React.useState(null);
    // const [service, setService] = React.useState("");

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    saveUser = async () => {

        if (fullName != "" && username != "" && password != "") {
          fetch('http://192.168.43.224:4000/users', {
            method: 'POST',
            body: JSON.stringify({
              fullName: fullName,
              username: username,
              password: password
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => {
              if (json.status === "500") {
                Alert.alert(json.message);
              } else {
                Alert.alert(json.message);
                clearTextFields();
              }
            })
            
            .catch((err) => Alert.alert(err.message));
        } else {
          Alert.alert("Please fill all the fields and try again.")
        }
      }

      const clearTextFields = () => {
        setFullName("");
        setUsername("");
        setPassword("");
        setRePassword("");
      }

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

                <TextInput style={styles.input1} value={fullName} onChangeText={(e) => { setFullName(e) }}  placeholderTextColor="gray" width="90%" underlineColorAndroid={"#07124f"} placeholder='Full Name' />

                <Text style={styles.Credentials}>Requiered Credentials-----------------------------------</Text>

                <TextInput style={styles.input2} value={username} onChangeText={(e) => { setUsername(e) }}  placeholderTextColor="gray" width="90%" underlineColorAndroid={"#041a8a"} placeholder='UserName' />
                <TextInput style={styles.input2} value={password} onChangeText={(e) => { setPassword(e) }} placeholderTextColor="gray" width="90%" underlineColorAndroid={"#041a8a"} placeholder='Password' />
                <TextInput style={styles.input2} value={repassword} onChangeText={(e) => { setRePassword(e) }} placeholderTextColor="gray" width="90%" underlineColorAndroid={"#041a8a"} placeholder='Re-Enter Password' />
                <TouchableOpacity style={styles.btn}>
                    <Text style={{ color: '#07124f', fontSize: 20, fontWeight: "600" }}  onPress={() => { saveUser() }}>Register</Text>
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
    // input: {
    //     height: 40,
    //     padding: 10,
    //     marginLeft: 10,
    //     color: "#07124f",
    //     width: "41%",
    //     marginTop: 10
    // },
    input1: {
        position: "relative",
        marginLeft: 10,
        padding: 10,
        marginTop: 35,
        color: "#07124f"
    },
    input2: {
        marginLeft: 10,
        padding: 10,
        marginTop: 25,
        color: "#07124f"
    },
    // input2: {
    //     height: 40,
    //     padding: 10,
    //     marginLeft: 10,
    //     color: "#07124f",
    //     width: "41%",
    //     marginTop: 10
    // },
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
    },
    Credentials: {
        color: "black",
        marginLeft: 15,
        marginTop: 30,
        fontSize: 15,
        fontWeight: '600',
    }
});
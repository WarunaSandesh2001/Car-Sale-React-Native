import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { HStack, VStack, NativeBaseProvider, Input } from 'native-base';

export default function LoadAllCars({ route, navigation }) {
    const [DATA, setDATA] = useState(['Kamal']);

    const [fullname, setFullName] = useState(route.params.fullname);
    const [username, setUsername] = useState(route.params.username);

    const [posts, setPosts] = useState([]);
    const [carlist, setCarList] = useState([]);


    const [show, setShow] = React.useState(false);

    const searchCars = () => {

    };

    // loadAll = () => {
    //     fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: "GET",
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((json) => setPosts(json));
    // }

    // useEffect(() => {

    // });

    loadCars = () => {
        fetch(`http://192.168.43.224:4000/cars/${username}`, {
            method: "GET",
            headers: {

                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => setCarList(json));
    }

    // console.log(carlist);

    const deleteCar = (car) => {
        fetch(`http://192.168.43.224:4000/cars/deleteCar/${car.carId}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === "200") {
                    Alert.alert(json.message);
                } else {
                    Alert.alert(json.message);
                }
            })
            .catch((err) => {
                Alert.alert("Error occured,Please try again later.")
            })
    }

    return (
        <NativeBaseProvider style={styles.container}>

            <Button icon="logout" mode="text" textColor='#050354' style={styles.logout_btn} onPress={() => { navigation.navigate("Login", { username }); }} >
                Log Out
            </Button>
            <Text style={styles.title} onPress={loadCars()}>YOUR COLLECTION</Text>

            <HStack space={5} style={styles.hstack}>
                <View style={styles.search}>
                    {/* <Input type={show ? "text" : "password"} w="60%" InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>} placeholder="Password" /> */}
                    <Input type={Text} size="md" w="100%" py="0" InputRightElement={<Button size="xs" rounded="none" type="Button" w="1/6" h="full" onPress={() => { searchCars() }}>
                        {show ? "Search" : "Search"}
                    </Button>} placeholder="Search Here" />
                </View>

                <Button icon="car" mode="contained-tonal" textColor='#050354' buttonColor='#c0edfc' style={styles.uploadImage_btn} onPress={() => { navigation.navigate("AddCar", { username }); }} >
                    Add Car
                </Button>

            </HStack>
            <FlatList
                data={carlist}S
                renderItem={({ item }) =>
                    <View style={{ borderWidth: 1, marginBottom: '5%', padding: 5, marginTop: 10, backgroundColor: "#f7f7ff" }}>
                        {/* <Image source={require('images\rn_image_picker_lib_temp_0fdf297d-f2ad-4baf-ae1d-29b2eb6d4727.jpg')}/> */}
                        <HStack space={"5%"}>
                            <VStack width={"80%"}>
                                <Text style={{ marginBottom: 10, fontWeight: 'bold', color: 'black', fontSize: 13}} >{item.date}</Text>
                                <Text style={{ marginBottom: 10, fontWeight: 'bold', color: 'green', fontSize: 20 }} >{item.location}</Text>
                                <Text style={{ marginBottom: 10, color: 'black' }} >{item.description}</Text>
                            </VStack>
                            <VStack space={"5%"}>
                                <IconButton
                                    icon="pencil"
                                    iconColor={MD3Colors.error0}
                                    size={15}
                                    mode={'contained'}
                                    style={styles.captureBtn}
                                    onPress={() => {
                                        navigation.navigate("UpdateForm", { item });
                                    }}
                                />
                                <IconButton
                                    icon="delete"
                                    iconColor={MD3Colors.error50}
                                    size={15}
                                    mode={'contained'}
                                    style={{ backgroundColor: "#fac9c5" }}
                                    onPress={() => {
                                        Alert.alert(
                                            "Confirmation",
                                            "Do you want to delete this car?",
                                            [{
                                                    text: "Yes",
                                                    onPress: () => {
                                                        deleteCar(item);
                                                    }
                                                },{
                                                    text: "No",
                                                    onPress: () => {
                                                        console.log("No");
                                                    }
                                                }],{
                                                cancelable: true
                                            }
                                        )
                                    }}

                                />
                            </VStack>
                        </HStack>
                    </View>
                }
            />
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    uploadImage_btn: {
        position: 'relative',
        bottom: 12,
        height: 40,
        width: '30%',
        marginLeft: 80,
        marginTop: '1%',
        borderRadius: 100,
        left: 160
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    hstack: {
        marginTop: 30,
        height: "5%",
        width: "100%"

    },
    title: {
        color: "#030357",
        fontSize: 30,
        alignSelf: "center",
        marginTop: 15,
        fontWeight: '400',
        letterSpacing: 1
    },
    search: {
        position: "absolute",
        left: 10,
        top: -10,
        height: 70,
        width: "60%"
    },
    logout_btn: {
        position: 'relative',
        top: 6,
        height: 40,
        width: '30%',
        marginLeft: 115,
        borderRadius: 100,
        left: 160
    },
    captureBtn: {
        marginTop: 15,
        backgroundColor: "#9bf095"
    }
})
import { StyleSheet, Text, TouchableOpacity, View, FlatList, useEffect } from 'react-native'
import React, { useState } from 'react'
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { HStack, NativeBaseProvider, Input } from 'native-base';

export default function LoadAllCars({ route, navigation }) {
    const [DATA, setDATA] = useState(['Kamal']);

    const [fullname, setFullName] = useState(route.params.fullname);
    const [username, setUsername] = useState(route.params.username);

    const [posts, setPosts] = useState([]);

    console.log(posts);

    const [show, setShow] = React.useState(false);

    const searchCars = () => {

    };

    // useEffect(()=>{
    //     loadAll = () => {
    //         fetch('https://jsonplaceholder.typicode.com/posts/1',{
    //             method: "GET",
    //             headers: {
    //                 'content-type' : 'application/json'
    //             }
    //         })
    //             .then((response) => response.json())
    //             .then((json) => console.log(json));
    //     }


    //     // loadAll();
    // });

    loadAll = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => setPosts(json));
    }

    return (
        <NativeBaseProvider style={styles.container}>

            <Button icon="logout" mode="text" textColor='#050354' style={styles.logout_btn} onPress={() => { navigation.navigate("Login", { username }); }} >
               Log Out
            </Button>
            <Text style={styles.title} onPress={loadAll()}>YOUR COLLECTION</Text>

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
                data={posts}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{ borderWidth: 1, marginBottom: '5%', padding: 5, marginTop: 10 }} onPress={() => { console.log("hello"); }}>
                        <Text style={{ marginBottom: 10, fontWeight: 'bold', color: 'black' }} >{item.title}</Text>
                        <Text style={{ marginBottom: 10, color: 'black' }} >{item.body}</Text>
                    </TouchableOpacity>
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
    }
})
import { StyleSheet, Text, TouchableOpacity, View, FlatList, useEffect } from 'react-native'
import React, { useState } from 'react'
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { HStack, NativeBaseProvider, Input } from 'native-base';

export default function LoadAllCars({ route , navigation }) {
    const [DATA, setDATA] = useState(['Kamal']);

    const [fullname, setFullName] = useState(route.params.fullname);
    const [username, setUsername] = useState(route.params.username);

    const [posts, setPosts] = useState([]);

    const [show, setShow] = React.useState(false);

    const searchCars = () => {

    };

    loadData();

    loadData = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => setPosts(json));
    }

    return (
        // <View>
        //     <View>
        //         <Button icon="car" mode="contained-tonal" textColor='#050354' buttonColor='#c0edfc' style={styles.uploadImage_btn}>
        //             Add Car
        //         </Button>

        //     </View>
        //     <FlatList
        //         data={DATA}
        //         renderItem={({ }) =>
        //             <TouchableOpacity style={{ borderWidth: 1, marginBottom: '5%', padding: 5 }}>
        //                 <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Hello</Text>
        //                 <Text style={{ marginBottom: 10 }}>Body</Text>
        //             </TouchableOpacity>
        //         }
        //     />
        // </View>
        <NativeBaseProvider style={styles.container}>

            <Text style={styles.title}>YOUR COLLECTION</Text>

            <HStack space={5} style={styles.hstack}>
                <View style={styles.search}>
                    {/* <Input type={show ? "text" : "password"} w="60%" InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>} placeholder="Password" /> */}
                    <Input type={Text} size="md" w="100%" py="0" InputRightElement={<Button size="xs" rounded="none" type="Button" w="1/6" h="full" onPress={searchCars()}>
                        {show ? "Search" : "Search"}
                    </Button>} placeholder="Search Here" />
                </View>

                <Button icon="car" mode="contained-tonal" textColor='#050354' buttonColor='#c0edfc' style={styles.uploadImage_btn} >
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
        marginTop: 60,
        height: "5%",
        width: "100%"
    },
    title: {
        color: "black",
        fontSize: 30,
        alignSelf: "center",
        marginTop: 30,
        fontWeight: '400',
        letterSpacing: 1
    },
    search: {
        position: "absolute",
        left: 10,
        top: -10,
        height: 70,
        width: "60%"
    }
})
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Button, IconButton, MD3Colors } from 'react-native-paper';

export default function LoadAllCars() {
    const [DATA, setDATA] = useState(['Kamal']);
    return (
        <View>
            <View>
                <Button icon="upload" mode="contained-tonal" textColor='#050354' buttonColor='#c0edfc' style={styles.uploadImage_btn}>
                    Upload an Image
                </Button>
            </View>
            <FlatList
                data={DATA}
                renderItem={({ }) =>
                    <TouchableOpacity style={{ borderWidth: 1, marginBottom: '5%', padding: 5 }}>
                        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Hello</Text>
                        <Text style={{ marginBottom: 10 }}>Body</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    uploadImage_btn: {
        width: '50%',
        marginLeft: 150,
        marginTop: '2.5%',
        borderRadius: 100
    }
})
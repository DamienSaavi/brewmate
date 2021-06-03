import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { Card, ListItem, Image, Button, Icon } from 'react-native-elements'

export default function Step({ navigation }) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const ref_passBox = useRef()

    function login() {
        fetch('http://192.168.0.17:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: pass
            }),
        })
            .then(res => res.json())
            .then(resj => console.log(resj))
            .catch(err => console.log(err))
    }

    navigation.setOptions({
        headerRight: () => (
            <Button
                onPress={() => {
                    navigation.navigate('Register')
                }}
                title={'Regiter'} />
        )
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
            style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>{'Email'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    keyboardType={'email-address'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => { ref_passBox.current.focus() }}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{'Password'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPass(text)}
                    secureTextEntry
                    maxLength={32}
                    returnKeyType={'done'}
                    ref={ref_passBox}
                /></View>
            <View style={styles.buttonRow}>
                <Button
                    title='Login'
                    containerStyle={{ width: 180 }}
                    buttonStyle={styles.button}
                    onPress={login}
                />
            </View>
            <Button
                title='Test'
                containerStyle={{ width: 90 }}
                buttonStyle={styles.button}
                onPress={() => {
                    console.log('yeet')
                    fetch('http://192.168.0.17:3000/user', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(res => res.json())
                        .then(resj => console.log(resj))
                        .catch(err => console.log(err))
                }}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 5,
        shadowOpacity: .2,
        borderRadius: 20
    },
    row: {
        flexDirection: 'row',
        marginVertical: 8,
        height: 60,
    },
    label: {
        flex: 1,
        fontSize: 16,
        lineHeight: 60,
        textAlign: 'right',
        marginRight: 12
    },
    input: {
        flex: 3,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: .5
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 18
    },
    button: {
        borderRadius: 40,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { Card, ListItem, Image, Button, Icon } from 'react-native-elements'

export default function Step(props) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')

    const ref_nameBox = useRef()
    const ref_passBox = useRef()

    function register() {
        fetch('http://192.168.0.17:3000/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: pass,
            }),
        })
            .then(res => res.json())
            .then(resj => console.log(resj))
            .catch(err => console.log(err))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
            style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>{'Name'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    maxLength={32}
                    returnKeyType={'next'}
                    onSubmitEditing={() => { ref_nameBox.current.focus() }}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>{'Email'}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    keyboardType={'email-address'}
                    returnKeyType={'next'}
                    ref={ref_nameBox}
                    onSubmitEditing={() => { ref_passBox.current.focus() }}
                /></View>
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
                    type='clear'
                    containerStyle={{ width: 60 }}
                    buttonStyle={styles.button}
                />
                <Button
                    title='Register'
                    containerStyle={{ width: 180 }}
                    buttonStyle={styles.button}
                    onPress={register}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 0,
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

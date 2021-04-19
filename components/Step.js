import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, LayoutAnimation } from 'react-native'
import { Icon } from 'react-native-elements'

export default function Step({ step, step_no, editing, delStep}) {
    const description = step.description
    const ingredient = step.ingredient
    const [editable, setEditable] = useState(editing)
    const timer = step.timer

    useEffect(() => {
        setEditable(editing) 
    }, [editing])

    return (
        <View style={styles.step_container}>
            {editable ?
                <Button
                    onPress={() => {
                        delStep(step_no)
                    }}
                    title="X" /> : null}
            <Text>{step_no + '.'}</Text>
            <View style={styles.desc_container}>
                <Text>{description}</Text>
                {ingredient ?
                    <View style={styles.ingr_container}>
                        {ingredient.map((ingredient, index) => {
                            return (
                                <Text style={styles.ingr} key={index}>
                                    {ingredient.name + '  ' + String(ingredient.amount) + ingredient.unit}
                                </Text>
                            )
                        })}
                    </View> : null}
            </View>
            {editable && !timer ?
                <View style={styles.timer_container}>
                    <Icon
                        name='timer'
                        type='Ionicons'
                        color='#fff'
                    />
                    <Text style={styles.timer}>
                        {'+'}
                    </Text>
                </View> :
                timer ?
                    <View style={styles.timer_container}>
                        {/* <Text>{timer.name}</Text> */}
                        <Icon
                            name='timer'
                            type='Ionicons'
                            color='#fff'
                        />
                        <Text style={styles.timer}>
                            {String(timer.time.minute).padStart(2, '0') + ':' + String(timer.time.second).padStart(2, '0')}
                        </Text>
                    </View> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    step_container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        flexGrow: 0,
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 50,
    },
    ingr_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        bottom: -20,
        position: 'absolute'
    },
    ingr: {
        color: 'white',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 17,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginRight: 8,
        backgroundColor: '#a15d0a',
        overflow: 'hidden'
    },
    desc_container: {
        flex: 1,
        position: 'relative',
        alignItems: 'flex-start',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#58a83d'
    },
    timer_container: {
        flex: 1,
        flexBasis: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1c7aad',
        marginLeft: 16,
        maxWidth: 60,
        height: 80,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#154e6e'
    },
    timer: {
        color: 'white'
    }
});
import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default function Step(props) {
    const [editable, setEditable] = useState(false)
    const [description, setDescription] = useState(props.step.description)
    const [ingredient, setIngredient] = useState(props.step.ingredient)
    const [timer, setTimer] = useState(props.step.timer)

    return (
        <View
            onLongPress={() => { setEditable(!editable) }}>
            <View style={styles.container}>
                <View style={styles.descing}>
                    <Text style={styles.description}>{description}</Text>
                    {ingredient ?
                        (<View style={styles.ingredients}>
                            {ingredient.map((ingredient, index) => {
                                return (
                                    <Text style={{ color: 'white', paddingHorizontal: 12 }} key={index}>{ingredient.name + '  ' + String(ingredient.amount) + ingredient.unit}</Text>
                                )
                            })}
                        </View>) : (null)}
                </View>
                {timer ?
                    <View style={styles.timer}>
                        <Text>{timer.name}</Text>
                        <Icon
                            name='timer'
                            type='Ionicons'
                            color='#000'
                        />
                        <Text>{String(timer.time.minute).padStart(2, '0') + ':' + String(timer.time.second).padStart(2, '0')}</Text>
                    </View> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 0,
        marginTop: 40,
        borderRadius: 30,
        padding: 10,
        borderColor: '#000',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 5,
        shadowOpacity: .2,
        backgroundColor: 'white'
    },
    description_edit: {
        flex: 1,
        padding: 10,
        borderWidth: .1,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#000',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 3,
        shadowOpacity: .2,
        backgroundColor: 'transparent',
        borderColor: 'white'
    },
    description: {
        flex: 1,
        padding: 10,
    },
    ingredients: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderRadius: 25,
        justifyContent: 'center',
        padding: 15,
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: .3,
        backgroundColor: '#855E42',
        // top: 30,
        shadowOffset: { width: 1, height: 3 },
    },
    descing: {
        flex: 1,
        alignItems: 'flex-start'
    },
    timer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 80,
        minHeight: 80,
    }
});
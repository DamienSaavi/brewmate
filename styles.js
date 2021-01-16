import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#6f4e37',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    step: {
        alignSelf: 'stretch',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 30,
        borderWidth: .2,
        borderColor: '#aaa',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 5,
        shadowOpacity: .5
    },
    background: {
        width: '100%',
        height: '100%',
        paddingTop: Constants.statusBarHeight,
        margin: 0,
    }
});
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#eee',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
    },
    step: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 30,
        padding: 10,
        borderColor: '#000',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 5,
        shadowOpacity: .2,
        backgroundColor: 'white'
    },
    description: {
        flex: 1,
        padding: 10
    },
    ingredients: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        borderRadius: 25,
        justifyContent: 'center',
        padding: 15,
        shadowRadius: 3,
        shadowOpacity: .7,
        backgroundColor: '#855E42',
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
        minHeight: 80,    }
});
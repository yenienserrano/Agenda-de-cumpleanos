import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import firebase from '../utils/firebase'

const ActionBar = ({ showBrithday, setShowBrithday }) => {
    return (
        <View style={ styles.viewFooter }>
            <TouchableOpacity 
                style={ styles.viewClose }
                onPress={ () => firebase.auth().signOut() }
            >
                <Text style={ styles.text }>Cerrar sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={ styles.viewAdd }
                onPress={ () => setShowBrithday( !showBrithday )}
            >
                <Text style={ styles.text }>
                    {
                        showBrithday
                        ?
                        'Nueva fecha'
                        :
                        'Cancelar'
                    }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionBar

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    viewClose: {
        backgroundColor: '#820000',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    viewAdd: {
        backgroundColor: '#1ea1f2',
        borderRadius: 50,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
})

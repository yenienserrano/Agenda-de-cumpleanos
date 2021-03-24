import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { validateEmail } from '../utils/validatorEmail'
import firebase from '../utils/firebase'

export default function LoginForm({ changeForm }) {

    const initialFormData = {
        email: '',
        password: '',
    }

    const [ formData, setFormData ] = useState( initialFormData )
    const [formErrors, setFormErrors] = useState({})

    const onChange = ( e, type ) => {
        return setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const login = () => {
        let errors = {}

        if( !formData.email || !formData.password ){
            if ( !formData.email ) errors.email = true
            if ( !formData.password ) errors.password = true
        }else if( !validateEmail( formData.email ) ) {
            errors.email = true
        }else if( formData.password.length <= 5 ) {
            errors.password = true
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword( formData.email, formData.password )
                .then( () => {
                    console.log( 'cuenta iniciada correctamente' )
                })
                .catch( () => {
                    setFormErrors({
                        email: true,
                        password: true,
                        repeatPassword: true,
                    })
                })
        }
        setFormErrors( errors )
    }

    return (
        <>
            <TextInput 
                placeholder='Correo electronico' 
                placeholderTextColor='#969696' 
                style={[ styles.input, formErrors.email && styles.error ]}
                onChange={ ( e ) => onChange( e, 'email' ) }
            />
            <TextInput 
                placeholder='Contraseña' 
                placeholderTextColor='#969696' 
                style={[ styles.input, formErrors.password && styles.error ]}
                secureTextEntry={ true }
                onChange={ ( e ) => onChange( e, 'password' ) }
            />
            <TouchableOpacity onPress={ login }>
                <Text style={ styles.btnText }>Iniciar sesion</Text>
            </TouchableOpacity>

            <View style={ styles.viewBtnLogin }>
                <TouchableOpacity onPress={ changeForm }>
                    <Text style={ styles.btnText }>Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18,
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
    },
    viewBtnLogin: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    error: {
        borderColor: '#940c0c'
    }
})

import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { validateEmail } from '../utils/validatorEmail'
import firebase from '../utils/firebase'

export default function RegisterForm({ changeForm }) {

    const initialFormData = {
        email: '',
        password: '',
        repeatPassword: '',
    }

    const [ formData, setFormData ] = useState( initialFormData )
    const [formErrors, setFormErrors] = useState({})

    const register = () => {
        
        let errors = {}

        if( !formData.email || !formData.password || !formData.repeatPassword ){
            if ( !formData.email ) errors.email = true
            if ( !formData.password ) errors.password = true
            if ( !formData.repeatPassword ) errors.repeatPassword = true
        }else if( !validateEmail( formData.email ) ) {
            errors.email = true
        }else if( formData.password !== formData.repeatPassword ) {
            errors.password = true
            errors.repeatPassword = true
        }else if( formData.password.length <= 5 ) {
            errors.password = true
            errors.repeatPassword = true
        } else {

            firebase
                .auth()
                .createUserWithEmailAndPassword( formData.email, formData.password )
                .then( () => {
                    console.log( 'Cuenta creada' )
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
                onChange={ ( e ) => setFormData({ ...formData, email: e.nativeEvent.text }) }
            />
            <TextInput 
                placeholder='Contraseña' 
                placeholderTextColor='#969696' 
                style={[ styles.input, formErrors.password && styles.error ]}
                secureTextEntry={ true }
                onChange={ ( e ) => setFormData({ ...formData, password: e.nativeEvent.text }) }
            />
            <TextInput 
                placeholder='Repetir la contraseña' 
                placeholderTextColor='#969696' 
                style={[ styles.input, formErrors.repeatPassword && styles.error ]}
                secureTextEntry={ true }
                onChange={ ( e ) => setFormData({ ...formData, repeatPassword: e.nativeEvent.text }) }
            />


            <TouchableOpacity onPress={ register }>
                <Text style={ styles.btnText }>Registrate</Text>
            </TouchableOpacity>

            <View style={ styles.viewBtnLogin }>
                <TouchableOpacity onPress={ changeForm }>
                    <Text style={ styles.btnText }>Iniciar sesion</Text>
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

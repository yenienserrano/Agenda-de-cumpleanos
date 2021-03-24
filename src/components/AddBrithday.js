import moment from 'moment';
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from '../utils/firebase'
import 'firebase/firestore'
import 'moment/locale/es'

firebase.firestore().settings({experimentalForceLongPolling: true})
const db = firebase.firestore( firebase )

const AddBrithday = ({user, setShowBrithday, setReloadData}) => {

    const [ isDatePickerVisible, setDatePickerVisibility ] = useState( false )
    const [ formData, setFormData ] = useState({})
    const [ errorMsg, setErrorMsg ] = useState({})
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        const dateBrith = date
        dateBrith.setHours(0)
        dateBrith.setMinutes(0)
        dateBrith.setSeconds(0)
        setFormData({ ...formData, dateBrith })
        hideDatePicker();
      };

      const onChangeText = ( e, type ) => {
        return setFormData({ ...formData, [type]: e.nativeEvent.text })
      }

      const onSubmit = async() => {
        let errors = {}

        if( !formData.name || !formData.lastname || !formData.dateBrith ){
            if ( !formData.name ) errors.name = true
            if ( !formData.lastname ) errors.lastname = true
            if ( !formData.dateBrith ) errors.dateBrith = true
        } else {
            const data = formData
            data.dateBrith.setYear(0)
            db.collection( user.uid )
              .add( data )
              .then( () => {
                  setReloadData(true)
                  setShowBrithday(true)
              })
        }
        

        setErrorMsg( errors )
      }

    return (
        <>
            <View style={ styles.container }>
                <TextInput 
                    style={[ styles.input, errorMsg.name && { borderColor: '#940c0c'} ]}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                    onChange={ ( e ) => onChangeText( e, 'name' ) }
                />
                <TextInput 
                    style={[ styles.input, errorMsg.lastname && { borderColor: '#940c0c'} ]}
                    placeholder="Apellido"
                    placeholderTextColor="#969696"
                    onChange={ ( e ) => onChangeText( e, 'lastname' ) }
                />
                <View style={[ styles.input, styles.datePicker, errorMsg.dateBrith && { borderColor: '#940c0c'}  ]}>
                    <Text 
                        onPress={ showDatePicker }
                        style={{
                            color: formData.dateBrith ? '#fff' : '#969696',
                            fontSize: 18,
                        }} 
                    >
                        {
                            formData.dateBrith 
                            ? moment( formData.dateBrith ).format( 'LL' )
                            : 'Fecha de nacimiento'
                        }
                    </Text>
                </View>
                <TouchableOpacity onPress={ onSubmit }>
                    <Text style={ styles.btnAdd }>Crear cumpleaños</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={ isDatePickerVisible }
                mode="date"
                onConfirm={ handleConfirm }
                onCancel={ hideDatePicker }
            />
        </>
    )
}

export default AddBrithday

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
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
        borderColor: '#1e3040'
    },
    datePicker: {
        justifyContent: 'center',
    },
    btnAdd: {
        fontSize: 18,
        color: '#fff'
    }
})

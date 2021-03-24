import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import moment from 'moment'
import firebase from '../utils/firebase'
import 'firebase/firestore'
import ActionBar from './ActionBar'
import AddBrithday from './AddBrithday'
import Brithday from './Brithday'


const db = firebase.firestore(firebase)

const ListBrithday = ({user}) => {

    const [showBrithday, setShowBrithday] = useState( true )
    const [brithday, setBrithday] = useState([])
    const [pastBrithday, setPastBrithday] = useState([])
    const [reloadData, setReloadData] = useState(false)

    
    useEffect(() => {
        setBrithday([])
        setPastBrithday([])
        db.collection(user.uid)
        .orderBy('dateBrith', 'asc')
        .get()
        .then( (res) => {
            const itemsArray = []
            res.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id
                itemsArray.push( data )
            })
                formatData(itemsArray)
            })
        setReloadData(false)
    }, [reloadData])

    const formatData = (items) => {
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        })

        const brithdayTempArray  = []
        const pastBrithdayTempArray  = []

        items.forEach( (item) => {
            const dateBrith = new Date(item.dateBrith.seconds * 1000)
            const dateBrithday = moment(dateBrith)
            const currentYear = moment().get('year')
            dateBrithday.set({ year: currentYear })

            const diffDate = currentDate.diff(dateBrithday, 'days')
            const itemTemp = item
            itemTemp.dateBrith = dateBrithday
            itemTemp.days = diffDate

            if( diffDate <= 0 ){
                brithdayTempArray.push( itemTemp )
            } else {
                pastBrithdayTempArray.push( itemTemp )
            }

        })
        setBrithday(brithdayTempArray)
        setPastBrithday(pastBrithdayTempArray)
    }

    const deleteBrithday = (brithday) => {
        Alert.alert(
            'Eliminar cumpleaño',
            `Estas seguro que quieres eliminar el cumpleaños de ${brithday.name} ${brithday.lastname}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        db.collection( user.uid )
                            .doc(brithday.id)
                            .delete()
                            .then(
                                setReloadData(true)
                            )
                    }
                }
            ]
        )
    }

    return (
        <View style={ styles.container }>
            
            {
                showBrithday
                ?
                <ScrollView style={styles.scrollView}>
                    {
                        brithday.map((item, index) => (
                            <Brithday key={index} brithday={item} deleteBrithday={deleteBrithday}/>
                        ))
                    }
                    {
                        pastBrithday.map((item, index) => (
                            <Brithday key={index} brithday={item} deleteBrithday={deleteBrithday}/>
                        ))
                    }
                </ScrollView>
                :
                <AddBrithday user={user} setShowBrithday={setShowBrithday} setReloadData={setReloadData}/>
            }
            
            <ActionBar 
                showBrithday={showBrithday} 
                setShowBrithday={setShowBrithday} 
            />
        </View>
    )
}

export default ListBrithday

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    scrollView: {
        marginBottom: 50,
        width: '100%'
    }
})

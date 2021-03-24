import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { decode, encode } from 'base-64'
import firebase  from './src/utils/firebase'
import 'firebase/auth'
import Auth from './src/components/Auth';
import ListBrithday from './src/components/ListBrithday';

if( !global.btoa ) global.btoa = encode
if( !global.atob ) global.atob = decode

export default function App() {

  const [ user, setUser ] = useState( undefined )

  useEffect(() => {
    firebase.auth().onAuthStateChanged(( response ) => {
      setUser( response )
    })
  }, [])

  if( user === undefined ) return null

  return (
    <>
      <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
      <SafeAreaView style={styles.container}>
        { user ? <ListBrithday user={ user }/> : <Auth /> }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15212b',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
});

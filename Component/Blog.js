import React from 'react';
import {StyleSheet, View, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; //https://medium.com/@mehulmistri/integrate-airbnb-google-maps-in-a-react-native-app-889f0c31a7a8


class Invoke extends React.Component {
  render() {
    return (
      <View style ={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>
      </View>
    );
  }  
}
export default Invoke;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    map: {     
        ...StyleSheet.absoluteFillObject,   
    },
})
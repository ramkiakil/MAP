import React from 'react';
import {StyleSheet, View, Text, Button,Dimensions,PermissionsAndroid } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; 
import { Marker,Callout } from 'react-native-maps';
const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.78825,-122.4324&radius=500&types=foods&key=AIzaSyDKkvUWoJ8kkfeAqEsjImmRuftKF21z3lI

class Invoke extends React.Component {
constructor() {
    super()
    this.state = {
        initialPosition: {
            latitude:13.119220, 
            longitude:79.935928,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
    }
    }

    async  requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Access Location Permission',
              'message': 'Location App needs access to your Location '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            navigator.geolocation.getCurrentPosition((position) => {
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)
          
                var initialRegion = {
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }
          
                this.setState({initialPosition: initialRegion})
              },
              (error) => alert(JSON.stringify(error)),
              {enableHighAccuracy: true, timeout: 2000, maximumAge: 2000});

          } else {
            console.log("Location permission denied")
          }
        } catch (err) {
          console.warn(err)
        }
      }

      componentWillMount(){
          this.requestLocationPermission();
      }

    componentDidMount() {

      }

      getInitialState() {
        return {
          region: {
            latitude:13.119220, 
            longitude:79.935928,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
        };
      }
      

      onRegionChange(region) {
        this.setState({ region });
        }


      renderScreen = () => {
        return (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={this.state.initialPosition}
            // region={this.state.region}
              showsUserLocation={true} >
            
              </MapView>
          </View>
        );
    }
    render() {
        return (
        // <View style ={styles.container}>
        //     <MapView
        //     provider={PROVIDER_GOOGLE}
        //     style={styles.map}
        //     region={{
        //         latitude: 37.78825,
        //         longitude: -122.4324,
        //         latitudeDelta: 0.015,
        //         longitudeDelta: 0.0121,
        //     }}
        //     ></MapView>
        // </View>
        this.renderScreen()
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
import React from 'react';
import {StyleSheet, View, Text, Button,Dimensions,PermissionsAndroid,Image } from 'react-native';
import MapView, {PROVIDER_GOOGLE ,Marker, Callout} from 'react-native-maps'; 
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
  
            lat:13.119220, 
            long:79.935928,
            latitudeDelta: 0.0922,
            longitudeDelta:0.0922,
             place:null,
    }
 }

    getUrlWithParameters(lat,long,radius,types,api){
      const url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
      const location=`location=${lat},${long}&radius=${radius}`;
      const typeData=`&types=${types}`;
      const key=`&key=${api}`; //AIzaSyDKkvUWoJ8kkfeAqEsjImmRuftKF21z3lI
      return `${url}${location}${typeData}${key}`;
    }

  

      componentWillMount(){
      
         navigator.geolocation.getCurrentPosition(
           (position) =>{
             const lat=position.coords.latitude;
             const long=position.coords.longitude;
             this.setState({lat,long});
             this.getPlaces();
           },
           (error) => console.warn(error.message),
           {enableHighAccuracy: true, timeout:5000}
         );

       
      }

    componentDidMount() {

      }

    
  getPlaces(){
    const url=this.getUrlWithParameters(this.state.lat,this.state.long,2500,'food','AIzaSyDKkvUWoJ8kkfeAqEsjImmRuftKF21z3lI');
    fetch(url)
      .then((data)=>data.json())
      .then((res)=>{
        console.warn(res);
        const arrayMarkers=[];
        res.results.map((element,i)=>{
            arrayMarkers.push(
              <Marker key={i} coordinate={{
                latitude:element.geometry.location.lat,
                longitude:element.geometry.location.lng
              }}>
                <Callout>
                    <View>
                      <Text>{element.name}</Text>
                       <Text>{element.opening_hours.open_now?'YES':'NO'}</Text>
                    </View>
                </Callout>

              </Marker>
            )
        })
        this.setState({place:arrayMarkers});
        
      })
  }

    render() {
        return (
        <View style ={styles.container}>
        {
          this.state.lat? 
           <MapView
            provider={MapView.PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            initialRegion={{
                latitude: this.state.lat,
                longitude: this.state.long,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121, }} >
                <Marker coordinate={{latitude:this.state.lat,longitude:this.state.long}}>
                 <View>
                   <Image source={require('./images/Marker.png')} style={{width:50,height:50}}/>
                 </View>
                </Marker>
                {this.state.place}

            </MapView>
            :
            null
        }
           
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
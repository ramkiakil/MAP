import React from 'react';
import {StyleSheet, View, Text, Button,Dimensions,PermissionsAndroid,Image,TouchableHighlight } from 'react-native';
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
          region:{
            latitude:13.119220, 
            longitude:79.935928,
            latitudeDelta: 0.0922,
            longitudeDelta:0.0922,
          },
          place:null,
    }
    this.showPlaces=this.showPlaces.bind(this);
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
            this.setState({
              latitude:position.coords.latitude, 
              longitude:position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta:0.0922,
            })
           },
           (error) => console.log(error.message),
           {enableHighAccuracy: true, timeout: 2000},
         )

         this.WatchID=navigator.geolocation.watchPosition(
           (position) =>{
             const newRegion={
               latitude:position.coords.latitude,
               longitude:position.coords.longitude,
               latitudeDelta:0.0922,
               longitudeDelta:0.0922,
             }
             this.setState({region:newRegion})
           }) 
      }

      showPlaces(){
        this.setState({place:null});
        this.getPlaces();
      }

    componentDidMount() {

      }

    
  getPlaces(){
    const url=this.getUrlWithParameters(this.state.region.latitude,this.state.region.longitude,500,'atm','AIzaSyDKkvUWoJ8kkfeAqEsjImmRuftKF21z3lI');
    fetch(url)
      .then((data)=>data.json())
      .then((res)=>{
        //console.log(res);
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
                       {/* <Text>{element.opening_hours.open_now?'YES':'NO'}</Text> */}
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
        <TouchableHighlight onPress={()=>this.showPlaces()} style={{position:'absolute',right:0,bottom:0,borderWidth:1,backgroundColor:'red',zIndex:3}}>
          <Text>SHOW place</Text>
        </TouchableHighlight>
        {
          this.state.region.latitude? 
           <MapView
            provider={MapView.PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            initialRegion={this.state.region}
            
            >
              <Marker coordinate={{latitude:this.state.region.latitude,longitude:this.state.region.longitude}}>
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
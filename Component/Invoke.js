import React from 'react';
import {StyleSheet, View, Text, Button,Dimensions,PermissionsAndroid,Image,TouchableHighlight,Modal,Alert,TextInput,ActivityIndicator,Picker} from 'react-native';
import MapView, {PROVIDER_GOOGLE ,Marker, Callout} from 'react-native-maps'; 
import {checkPermission} from 'react-native-android-permissions';
const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.78825,-122.4324&radius=500&types=foods&key='your key'

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
          modalVisible: false,
          types:'atm',
          radius:500,
          isLoading: true,
          userTypes: [{userType: 'atm', userName: 'ATM'}, {userType: 'accounting', userName: 'ACCOUNTING'}, {userType: 'airport', userName: 'AIRPORT'}, {userType: 'bakery', userName: 'BAKERY'}, {userType: 'bank', userName: 'BANK'},{userType: 'beauty_salon', userName: 'SALON'}, {userType: 'bicycle_store', userName: 'CYCLE STORE'}, {userType: 'book_store', userName: 'BOOKSTORE'}, {userType: 'bus_station', userName: 'BUS STATION'}, {userType: 'cafe', userName: 'CAFE'},{userType: 'car_repair', userName: 'CAR REPAIR'}, {userType: 'car_wash', userName: 'CAR WASH'}, {userType: 'church', userName: 'CHRUCH'}, {userType: 'clothing_store', userName: 'CLOTHING STORE'}, {userType: 'department_store', userName: 'DEPARTMENT STORE'},{userType: 'doctor', userName: 'DOCTOR'}, {userType: 'fire_station', userName: 'FIRE STATION'}, {userType: 'gas_station', userName: 'GAS'}, {userType: 'gym', userName: 'GYM'}, {userType: 'hair_care', userName: 'HAIR CARE'},{userType: 'hardware_store', userName: 'HARDWARE'}, {userType: 'hindu_temple', userName: 'TEMPLE'}, {userType: 'hospital', userName: 'HOSPITAL'}, {userType: 'jewelry_store', userName: 'JEWELRY'}, {userType: 'lawyer', userName: 'LAWYER'},{userType: 'library', userName: 'LIBRARY'}, {userType: 'local_government_office', userName: 'GOVT OFFICE'}, {userType: 'book_store', userName: 'BOOKSTORE'}, {userType: 'bus_station', userName: 'BUS STATION'}, {userType: 'movie_theater', userName: 'THEATER'},{userType: 'museum', userName: 'MUSEUM'}, {userType: 'park', userName: 'PARK'}, {userType: 'parking', userName: 'PARKING'}, {userType: 'pet_store', userName: 'PET SHOP'}, {userType: 'pharmacy', userName: 'MEDICINE'},{userType: 'physiotherapist', userName: 'PHYSIOTHERAPIST'}, {userType: 'police', userName: 'POLICE STATION'}, {userType: 'post_office', userName: 'POST OFFICE'}, {userType: 'real_estate_agency', userName: 'REAL ESTATE'}, {userType: 'restaurant', userName: 'HOTEL'},{userType: 'shopping_mall', userName: 'MALL'}, {userType: 'school', userName: 'SCHOOL'}, {userType: 'stadium', userName: 'STADIUM'}, {userType: 'store', userName: 'STORE'}, {userType: 'subway_station', userName: 'SUBWAY'},{userType: 'supermarket', userName: 'SUPER MARKET'}, {userType: 'taxi_stand', userName: 'TAXI STAND'}, {userType: 'train_station', userName: 'RAILWAY STATION'}, {userType: 'travel_agency', userName: 'TRAVEL AGENCY'}, {userType: 'zoo', userName: 'ZOO'}],
          selectedUserType: '',
          userRadiusTypes: [{userType: '500', userName: '0.5 km'}, {userType: '1000', userName: '1 km'}, {userType: '1500', userName: '1.5 km'}, {userType: '2000', userName: '2 km'}, {userType: '3000', userName: '2.5 km'},{userType: '5000', userName: '3 km'},{userType: '10000', userName: '5 km'}, {userType: '15000', userName: '7.5 km'}, {userType: '20000', userName: '10 km'}, {userType: '30000', userName: '12 km'}, {userType: '50000', userName: '13 km'},{userType: '100000', userName: '15 km'}],
          selectedRadiusUserType: '',

    }
    this.showPlaces=this.showPlaces.bind(this);
    this.getCurrentLocation=this.getCurrentLocation.bind(this);
 }

 loadUserTypes() {
  return this.state.userTypes.map(user => (
     <Picker.Item label={user.userName} value={user.userType} />
  ))
}
loadUserRadiusTypes() {
  return this.state.userRadiusTypes.map(userradius => (
     <Picker.Item label={userradius.userName} value={userradius.userType} />
  ))
}

    getUrlWithParameters(lat,long,radius,types,api){
      const url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
      const location=`location=${lat},${long}&radius=${radius}`;
      const typeData=`&types=${types}`;
      const key=`&key=${api}`; 
      return `${url}${location}${typeData}${key}`;
    }

  

    async  componentWillMount(){
      // await  checkPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
      //   console.log("Already Granted!");
      //   navigator.geolocation.getCurrentPosition(
      //       (position) =>{
      //         this.setState({
      //           latitude:position.coords.latitude, 
      //           longitude:position.coords.longitude,
      //           latitudeDelta: 0.0922,
      //           longitudeDelta:0.0922,
      //         })
      //       },
      //       (error) => console.warn(error.message),
      //       {enableHighAccuracy: true, timeout: 2000},
      //     )
     
      //   this.WatchID=navigator.geolocation.watchPosition(
      //     (position) =>{
      //       const newRegion={
      //         latitude:position.coords.latitude,
      //         longitude:position.coords.longitude,
      //         latitudeDelta:0.0922,
      //         longitudeDelta:0.0922,
      //       }
      //       this.setState({region:newRegion})
      //     }) 
      // }, (result) => {
      //   console.log("Not Granted!");
      //   console.log(result);
      // });
          //or
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
              {
                'message': 'Cool location App needs access to your location ' 
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
             
              navigator.geolocation.getCurrentPosition(
                (position) =>{
                 this.setState({
                   latitude:position.coords.latitude, 
                   longitude:position.coords.longitude,
                   latitudeDelta: 0.0922,
                   longitudeDelta:0.0922,
                 })
                },
                (error) => console.warn(error.message),
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

               this.setState({isLoading: false });
            } else {
              Alert.alert("location permission denied");
            }
          } catch (err) {
            console.warn(err)
          }
        
      
      
      }

      showPlaces(){
        this.setState({place:null,isLoading:true});
        this.getPlaces();
      }

    componentDidMount() {
     
      }

  
    
  getPlaces(){
    const url=this.getUrlWithParameters(this.state.region.latitude,this.state.region.longitude,this.state.radius,this.state.types,'your key');
    fetch(url)
      .then((data)=>data.json())
      .then((res)=>{
        // console.warn(res);
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
                      {/* <Text>{element.rating}</Text> */}
                      
                      {/* {element.opening_hours.open_now ?
                      <Text>OPEN:{element.opening_hours.open_now ?'YES':'NO'}</Text>:null
                      } */}
                    </View>
                </Callout>

              </Marker>
            )
        })
        this.setState({place:arrayMarkers,isLoading: false});
        
      })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  getCurrentLocation = () =>
  navigator.geolocation.getCurrentPosition(
     (position) => {
         let currentUserPosition = position.coords;
         alert(JSON.stringify(currentUserPosition));
     },
     (error) => {
         console.log(error);
     },
     {
         enableHighAccuracy: false,
         timeout: 20000,
         maximumAge: 0,
         distanceFilter: 10
     }
 );




    render() {

      if(this.state.isLoading){
     return(
      <ActivityIndicator
      style={{ height: 80,zIndex:3, }}
      color="#C00"
      size="large"
    />
     )  
  } else{
    return (
      <View style ={styles.container}>
       <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}>
        <View style={{flex:1,}}>
          <View style={{position:'absolute',top:'5%',margin:'10%',width:'75%',height:'60%'}}>
           <View style={{flex:1,}}>
                 <View style={{flex:1,flexDirection:'column',}}>
                   {/* <View style={{flex:1,flexDirection:'row'}}>
                        <Text style={{flex:1,}}>Type</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1,flex:1,}}
                            onChangeText={(types) => this.setState({types})}
                            value={this.state.types}
                          />
          
                   </View>
                   <View style={{flex:1,flexDirection:'row'}}>
                        <Text style={{flex:1,}}>Radius</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1,flex:1,}}
                            onChangeText={(radius) => this.setState({radius})}
                            placeholder="500"
                            value={this.state.radius}
                          />
                       
                   </View>  */}
                   <Picker
                          selectedValue={this.state.selectedUserType}
                          onValueChange={(itemValue, itemIndex) => 
                              this.setState({selectedUserType: itemValue,
                                types:itemValue
                              })}>
                          {this.loadUserTypes()}
                        </Picker>

                      <Picker
                          selectedValue={this.state.selectedRadiusUserType}
                          onValueChange={(itemValue, itemIndex) => 
                             this.setState({selectedRadiusUserType: itemValue,
                              radius:itemValue
                              })}>
                          {this.loadUserRadiusTypes()}
                        </Picker>
               
                 </View>
           </View>
          </View>
          <TouchableHighlight style={{position:'absolute',top:'80%',left:'40%',borderWidth:1,backgroundColor:'green',width:100,height:50,borderRadius:10,justifyContent:'center',alignItems:'center'}}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
               
              }}>
              <Text>Update</Text>
            </TouchableHighlight>
        </View>
      </Modal>
      {/* <TouchableHighlight onPress={()=>{ this.getCurrentLocation();    }} style={{position:'absolute',left:0,top:0,borderWidth:1,backgroundColor:'red',zIndex:3}}>
      <Text>my location</Text>
      </TouchableHighlight> */}
      <TouchableHighlight onPress={()=>{this.setModalVisible(true)}} style={{position:'absolute',left:0,bottom:0,borderWidth:1,backgroundColor:'red',zIndex:3}}>
      <Text>Change place</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>{this.showPlaces()}} style={{position:'absolute',right:0,bottom:0,borderWidth:1,backgroundColor:'red',zIndex:3}}>
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

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,Dimensions,Image,Touchable,TouchableNativeFeedback} from 'react-native';
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/Ionicons';

// import Spinner from 'react-native-loading-spinner-overlay';

export default class MainIndex extends Component {
  
  constructor(){
    super();        
    this.state={
      data:[],
      modalVisible: true,
      itemsvalue:[],
      appApi:100,
      spinner: true
    }
  }
  
  componentWillMount(){
    // this.fetchData();
      // setInterval( () => {
      //   this.setState({
           
      //     spinner: false,
      //   })
 
      // }  ,3000)
    
  }

  // fetchData = async() =>{
  //   const response= await fetch("https://randomuser.me/api?results="+this.state.appApi);
  //   const json=await response.json();
  //   this.setState({
  //     data:json.results,
  //     spinner: false,
  //   });


    
  // }


 setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }


  render() {
    return (
      <ImageBackground
      source={require('./images/alp.jpg')}
      // source={{uri:'https://source.unsplash.com/1600x900/?world,hot'}}
      style={{width: '100%', height: '100%',flex:1,zIndex:2}}> 
    
        <View style={styles.triangle}></View>
       <View style={styles.square}></View>
       {/* <Image source={require('./images/white_apple.png')} style={[styles.icon,{width:120,height:150}]}/> */}
       <ResponsiveImage  style={[styles.icon]}
                       source={require('./images/white_apple.png')} initWidth="120" initHeight="150"/>
       <Text style={[styles.iconText,{fontFamily:'PacificoRegular',fontSize:20,color:'white'}]}><Text>Your Firm </Text>App</Text>  
        
        <View style={styles.mainText}>
              <View style={styles.space}>
                                
              </View>
              <View style={styles.contain}>
                        <View  style={styles.spaces}>
                        <ResponsiveImage source={require('./images/phone1.png')}
                         style={{marginTop:6,}}
                        initWidth="20" initHeight="20"/>
                           
                            <Text style={styles.phone} ><Text>(91)  222-222-2222</Text></Text>  
                        </View>      
                        <View  style={styles.spaces}>
                            <ResponsiveImage source={require('./images/mail1.png')} 
                            style={{marginTop:5,}}
                            initWidth="20" initHeight="20"/>
                            <Text style={styles.phone} >yourfirmapp@app.com</Text>  
                        </View>    
                        <View  style={styles.spaces}>
                            <View style={{marginLeft:20,}}></View>
                            <Text style={styles.phone} >your firm app street,app world-21</Text>  
                        </View>  
              </View>
              <View style={styles.end}>
                                   
              </View>
               
        </View>
        <View style={styles.square1}>
            
                <View style={styles.flux1}>
                  <TouchableNativeFeedback onPress={()=>{ this.props.navigation.navigate('Contact')}}>
                  <View style={styles.flux}>
                        <ResponsiveImage 
                       source={require('./images/Contact1.png')} initWidth="30" initHeight="30"/>
                        <Text style={{fontFamily:'Avenir',color:'white',}}>Contact</Text>  
                    </View>  
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback  onPress={()=>{ this.props.navigation.navigate('Invoke')}}>
                    <View style={styles.flux}>
                        <ResponsiveImage 
                       source={require('./images/Invoke1.png')} initWidth="30" initHeight="30"/>
                        <Text  style={{fontFamily:'Avenir',color:'white',}}>Invoke</Text>  
                    </View> 
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback  onPress={()=>{ this.props.navigation.navigate('Contact')}}>
                    <View style={styles.flux}>
                        <ResponsiveImage 
                       source={require('./images/Blog1.png')} initWidth="30" initHeight="30"/>
                        <Text  style={{fontFamily:'Avenir',color:'white',}}>Blog</Text>  
                    </View> 
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback  onPress={()=>{ this.props.navigation.navigate('Social')}}>
                    <View style={styles.flux}>
                        <ResponsiveImage 
                        source={require('./images/Social1.png')} initWidth="30" initHeight="30"/>
                        <Text  style={{fontFamily:'Avenir',color:'white',}}>Social</Text>  
                    </View> 
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback  onPress={()=>{ this.props.navigation.navigate('Login')}}>
                    <View style={styles.flux}>
                        <ResponsiveImage 
                        source={require('./images/Login1.png')} initWidth="30" initHeight="30"/>
                        <Text  style={{fontFamily:'Avenir',color:'white',}}>Login</Text>  
                    </View> 
                    </TouchableNativeFeedback>
              
              </View>    
        </View>
        <View style={styles.triangle1}>
            
            </View>
        
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  icon:{
    position: 'absolute',
    left:width/2-40,
    bottom:'50%',
    alignItems:'center',
    justifyContent:'center',
    zIndex:3,
  },

  iconText:{
    position:'absolute',
    left:'36%',
    bottom:'45%',
    fontSize:20,
 
  },
  mainText:{
    position:'absolute',
    bottom:'15%',
    height:'25%',
    width:'100%',
    flexDirection:'row',

  },
  square:{
    position: 'absolute',
    bottom:0,
    width:'100%',
    height:'45%',
    backgroundColor:'#184a36',
    opacity:0.9,
  },
  triangle: {
    position: 'absolute',
    bottom:'45%',
    width:0,
    height:0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width/2,
    borderRightWidth: width/2,
    borderBottomWidth:80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#184a36',
    opacity:0.9,
   
  },
  space:{
    flex:20,
   
  },
  contain:{
    flex:70,
    // flexDirection:'row',
   
  },
  end:{
    flex:10,
   
  },
  spaces:{
  
    flexDirection:'row',
   
  },
  phone:{
    marginLeft:8,
    fontSize:15,
    fontFamily:'PacificoRegular',
    width:'60%',
    color:'white',
 
  },
  square1:{
    position: 'absolute',
    bottom:0,
    width:'100%',
    height:'10%',
    backgroundColor:'#8A2BE2',
    paddingBottom:5,
    // opacity:0.7,
  },
  triangle1: {
    position: 'absolute',
    bottom:'10%',
    width:0,
    height:0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth:width/2,
    borderRightWidth:width/2,
    borderBottomWidth:30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#8A2BE2',
    // opacity:0.7,
   
  },

  flux:{
    flex:1,
    fontSize:10,
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'Avenir',

  } ,

  flux1:{
    flex:1,
    flexDirection:'row',
   
  }


});

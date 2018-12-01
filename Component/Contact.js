import React from 'react';
import { View, Text, Button } from 'react-native';
import {  StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class Contact extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Contact</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ],
            }))
          }}
        />
      </View>
    );
  }  
}
export default Contact;
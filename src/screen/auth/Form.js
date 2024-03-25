
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';


import React, { Component } from 'react'


export default class Form extends Component {
    render() {
        return (
             <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgb(0, 0, 0, 0, 0)"
          placeholder="Email"
          placeholderTextColor="#ffffff"
        />
        <TextInput
          styles={styles.inputBox}
          underlineColorAndroid="rgb(0, 0, 0, 0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttoText}>Sing Up</Text>
        </TouchableOpacity>
      </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
    width: 300,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
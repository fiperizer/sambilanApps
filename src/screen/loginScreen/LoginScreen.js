import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

import styles from './styles';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
const [isModalVisible, setModalVisible] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate('register');
  };

  const onLoginPress = () => {
     if (!email.trim()) {
       Alert.alert('Oops','Mohon Lengkapi Data Terlebih Dahulu');
       return;
     }
      if (!password.trim()) {
        Alert.alert('Oops', 'Isi password terlebih dahulu');
        return;
      }
    setModalVisible(true)
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
               setModalVisible(false);
              return;
            }
            const dataUsers = firestoreDocument.data();
            navigation.navigate('Home', dataUsers);
             setModalVisible(false);
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
         setModalVisible(false);
      });
  };

  useEffect(() => {
   
    
    return () => {
      isModalVisible
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{color:'white',fontSize:32,marginTop:-windowHeight*.3,fontWeight:'bold'}}>
        Log in Now
      </Text>
      <Image
        style={{width: windowWidth, height: windowHeight*0.5, resizeMode:'cover',marginTop:20}}
        source={require('../../assets/images/login.png')}
      />
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
        keyboardShouldPersistTaps="always">
        {/* <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        /> */}
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'white',
            borderRadius: 20,
            paddingVertical: 20,
          }}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={text => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}>
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Modal
        isVisible={isModalVisible}
        transparent={true}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        style={{width: '100%', margin: 0}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              height: 200,
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={require('../../assets/animation/loading.gif')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';

export default function AddRoomScreen({navigation}) {
  const [roomName, setRoomName] = useState('');

  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
        })
        .then(() => {
          navigation.navigate('Home');
        });
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create new chat room</Title>
        <FormInput
          labelName="Room Name"
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="Create"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 5,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    // marginButtom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});

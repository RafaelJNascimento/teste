import React, { useEffect, useState } from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

import {
  View,
  Text,
  Modal,
  StatusBar,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

function App(props) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    BackHandler.addEventListener("hardwareBackPress", () => {
      JitsiMeet.backPress();
      return true;
    });

    setTimeout(() => {
      const url = props.url;
      const userInfo = {
        displayName: props.name,
        email: props.email,
      };
      console.log(url, ' ',JSON.stringify(userInfo));
      JitsiMeet.call(url, userInfo);
    }, 2000);


    return () => {
      JitsiMeet.endCall();
    };
  }, []);

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent)
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#000"
        barStyle={"light-content"} />
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={() => setIsLoading(false)}
        onConferenceWillJoin={() => setIsLoading(true)}
        style={styles.container}
      />
      <Modal
        animationType="fade"
        transparent={false}
        visible={isLoading}
        onRequestClose={() => { }}>
        <View style={styles.containerLoading}>
          <View style={styles.boxWrapper}>
            <Text style={styles.textLoading}>
              {"esperando o servidor"}
            </Text>
            <ActivityIndicator color={'#000'} />
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  boxWrapper: {
    flexDirection: 'row',
    height: 50,
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoading: {
    flex: 1,
    backgroundColor: 'rgba(0, 0 , 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    color: '#000',
    fontSize: 16,
    marginRight: 10,
  },
})

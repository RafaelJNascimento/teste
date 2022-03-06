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
    <View>
      <StatusBar
        backgroundColor="#000"
        barStyle={"light-content"} />
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={() => setIsLoading(false)}
        onConferenceWillJoin={() => setIsLoading(true)}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
      />
      <Modal
        animationType="fade"
        transparent={false}
        visible={isLoading}
        onRequestClose={() => { }}>
        <View style={styles.containerLoading}>
          <ActivityIndicator color={'#000'} />
          <Text style={styles.textLoading}>
            {"esperando o servidor"}
          </Text>
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
  containerLoading: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    color: '#000',
    fontFamily: 'OpenSans',
    fontSize: 16,
    marginTop: 18
  },
})

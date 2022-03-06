import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';

import Jitsi from './jitsi';

const teste = () => {

    const [joinMeeting, setJoinMeeting] = useState(false);
    const [url, setURL] = useState('https://meet.jit.si/rafaelTesteJitsi');
    const [name, setName] = useState('rafael');
    const [email, setEmail] = useState('rafael@gmail.com');

    const requestPermission = async () => {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Permissão de Câmera",
                message: "O App precisa de acesso à câmera.",
                buttonNeutral: "Pergunte-me depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
        );
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "App Permissão de gravar audio",
                message: "O App precisa de acesso para gravar audio.",
                buttonNeutral: "Pergunte-me depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
        );
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Permissão de acesso a arquivos",
                message: "O App precisa de acesso ao arquivos",
                buttonNeutral: "Pergunte-me depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            }
        );
    };

    return (
        <SafeAreaView
            style={styles.containe}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle={'light-content'} />
            <View style={styles.body}>
                {
                    joinMeeting
                        && url.length > 0
                        && name.length > 0
                        && email.length > 0 ?
                        <Jitsi
                            url={url}
                            name={name}
                            email={email}
                        />
                        :
                        <View
                            style={{
                                flex: 1,
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                onChangeText={setURL}
                                placeholder={'insira a url'}
                                value={url}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                placeholder={'insira seu nome'}
                                value={name}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                placeholder={'insira seu email'}
                                value={email}
                            />
                            <TouchableOpacity
                                onPress={() => requestPermission()}
                                style={styles.button}>
                                <Text>Solicitar Permissões</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setJoinMeeting(true)}
                                style={styles.button}>
                                <Text>Abrir chamada de vídeo</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containe: {
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 180,
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    button: {
        height: 40,
        width: 180,
        margin: 5,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});

export default teste;
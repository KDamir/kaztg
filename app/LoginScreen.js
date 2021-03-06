import React from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Dimensions,
    Image,
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';

import { Container, Header, Content, Input, Item, Form, Label, Button,} from 'native-base';
import logoImage from './images/turmys-white-logo.png';
import iconLogoImage from './images/icon_logo.png';
import backgroundImage from './images/background.png';
import menuImage from './images/menu.png';
import OneSignal from 'react-native-onesignal';

import StaticWebView from './StaticWebView';

import styles from './styles';

const { width, height } = Dimensions.get('window');

export default class LoginScreen extends React.PureComponent {

    static navigationOptions = {
        drawerLabel: 'Главное меню',
    };

    componentWillMount() {
        this.fetchToken();
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        //console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        // console.log('Message: ', openResult.notification.payload.body);
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        // console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        //console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        //console.log('Device info: ', device);
    }

    fetchToken = async () => {
        const token = await AsyncStorage.getItem('id_token');
        this.setState({token: token});
    };

    state = {
        iin: '',
        password: '',
        errorMessage: '',
        token: null
    };

    _login = async () => {
        let response = await this.postRequest();
        if(response === undefined) {
            this.setState({errorMessage: 'Проверьте подключение к интернету'});
            return
        }
        if(response.status === 401) {
            this.setState({errorMessage: 'Неверные ИИН или пароль'});
            return
        }

        if(!response.ok) {
            this.setState({errorMessage: 'Техническая ошибка'});
            return
        }
        const result = JSON.parse(response._bodyText);
        const id_token = result.id_token;
        this.setState({errorMessage: false, token: id_token});
        await AsyncStorage.setItem('id_token', id_token);
        await this.postTags();
    };

    postRequest = async () => {
        const url = `http://turmys.kz/api/authenticate`;
        const username = this.state.iin;
        const password = this.state.password;
        const body = JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        });
        return await fetch(url, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json'}
        });
    };

    fetchData = async () => {
        const url = `http://turmys.kz/api/account`;
        const _token = this.state.token;
        return await fetch(url, {
            method: 'GET',
            headers: {Authorization: 'Bearer ' + _token}
        })
    };

    postTags = async () => {
        const response = await this.fetchData();
        if(response.ok) {
            const res = JSON.parse(response._bodyText);
            OneSignal.sendTag("email", res.email);
        }
    };

    _invalidateToken = async () => {
        this.setState({token: null});
        await AsyncStorage.removeItem('id_token');
    };

    render() {
        let screen;
        if(this.state.token !== '' && this.state.token !== null) {
            screen = <StaticWebView uri="http://turmys.kz/" token={this.state.token} logout={this._invalidateToken}/>
        }
        else {
            screen = <Container style={styles.container}>
                <Image source={backgroundImage} style={{flex: 1, width: width, height: height}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Image source={menuImage} style={styles.menuButtonImage}/>
                    </TouchableHighlight>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        overflow:'hidden',}}>
                        <KeyboardAvoidingView behavior={'padding'}>
                            <Image source={iconLogoImage} style={{alignSelf: 'center', width: 100, height: 100}}/>
                            <Image source={logoImage} style={{alignSelf: 'center', marginBottom: 50, marginTop: 5}}/>
                            <Form>
                                <Item bordered
                                      rounded
                                      style={{marginBottom: 10, width: width*5/7}}>
                                    <Input keyboardType="default"
                                           style={{color: 'white', width: width/2}}
                                           placeholder={'Ваш ИИН'}
                                           placeholderTextColor={'white'}
                                           blurOnSubmit={true}
                                           returnKeyType="done"
                                           maxLength={12}
                                           value={this.state.iin}
                                           onChangeText={iin => this.setState({iin})}/>
                                </Item>
                                <Item bordered
                                      rounded
                                      style={{width: width*5/7}}>
                                    <Input style={{color: 'white', width: width/2}}
                                           value={this.state.name}
                                           placeholder={'Пароль'}
                                           placeholderTextColor={'white'}
                                           onChangeText={password => this.setState({password})}
                                           secureTextEntry/>
                                </Item>
                            </Form>
                            <Button info rounded large
                                    style={{alignSelf: 'center', justifyContent: 'center', marginTop: 30, width: width*5/7}}
                                    onPress={this._login.bind(this)}
                                    disabled={this.state.iin === '' || this.state.password === '' }>
                                <Text style={{textAlign: 'center', alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>Войти</Text>
                            </Button>
                        </KeyboardAvoidingView>
                        {this.state.errorMessage !== '' && <View style={{paddingBottom: 20}}><Text style={{color: 'white'}}>{this.state.errorMessage}</Text></View>}
                    </View>
                </Image>
            </Container>;
        }
        return(
            <View style={{flex: 1}}>
            {screen}
            </View>
        );
    }

}
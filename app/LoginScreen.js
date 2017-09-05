import React from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Dimensions,
    Image,
    AsyncStorage
} from 'react-native';

import { Container, Header, Content, Input, Item, Form, Label, Button,} from 'native-base';
import logoImage from './images/turmys-white-logo.png';
const { width, height } = Dimensions.get('window');
import OneSignal from 'react-native-onesignal';

import StaticWebView from './StaticWebView';

export default class LoginScreen extends React.PureComponent {

    static navigationOptions = {
        drawerLabel: 'Авторизация',
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

    componentDidMount() {
        OneSignal.sendTag("name", "value");
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    fetchToken = async () => {
        const token = await AsyncStorage.getItem('id_token');
        this.setState({token: token});
    }

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
        if(!response.ok) {
            this.setState({errorMessage: 'Неверные ИИН или пароль'});
            return
        }
        const id_token = response.json().id_token;
        this.setState({errorMessage: false, token: id_token});
        await AsyncStorage.setItem('id_token', id_token);
    };

    postRequest = async () => {
        const url = `http://turmys.kz/api/authenticate`;
        const username = this.state.iin;
        const password = this.state.password;
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: `${username}`, password: `${password}`}),
            headers: {'Mobile-client': 'Webview-mobile-client'}
        })
    };

    render() {
        let screen;
        if(this.state.token !== '' && this.state.token !== null) {
            screen = <StaticWebView uri="http://turmys.kz" token={this.state.token}/>
        }
        else {
            screen = <Container>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0b6990',
                    overflow:'hidden',}}>
                    <Content style={{paddingTop: height/4}}>
                        <Image source={logoImage} style={{alignSelf: 'center', marginBottom: 50}}/>
                        <Form>
                            <Item stackedLabel>
                                <Label style={{color: 'white'}}>ИИН</Label>
                                <Input keyboardType="numeric"
                                       style={{color: 'white', width: width/2}}
                                       maxLength={12}
                                       value={this.state.iin}
                                       onChangeText={iin => this.setState({iin})}/>
                            </Item>
                            <Item stackedLabel>
                                <Label style={{color: 'white'}}>Пароль</Label>
                                <Input style={{color: 'white', width: width/2}}
                                       value={this.state.name}
                                       onChangeText={password => this.setState({password})}
                                       secureTextEntry/>
                            </Item>
                        </Form>
                        <Button info style={{alignSelf: 'center', marginTop: 30, width: width/3}} onPress={this._login.bind(this)}
                                disabled={this.state.iin === '' || this.state.password === '' }>
                            <Text style={{textAlign: 'center'}}>Войти</Text>
                        </Button>
                    </Content>
                    {this.state.errorMessage !== '' && <View style={{paddingBottom: 20}}><Text style={{color: 'white'}}>{this.state.errorMessage}</Text></View>}
                </View>
            </Container>;
        }
        return(
            <View style={{flex: 1}}>
            {screen}
            </View>
        );
    }

}
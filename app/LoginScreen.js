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

import StaticWebView from './StaticWebView';

export default class LoginScreen extends React.PureComponent {

    static navigationOptions = {
        drawerLabel: 'Авторизация',
    };

    componentWillMount() {
        //this.fetchToken();
    }

    fetchToken = async () => {
        const token = await AsyncStorage.getItem('id_token');
        this.setState({token: token});
    }

    state = {
        iin: '',
        password: '',
        errorMessage: false,
        token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkzMjEiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNTA3MTM4MjQyfQ.PpVj-MnuksSZWPnS8lv_SxqWRZKadOvMpuYG4VhQgl9P-blcE0c_RpBObOINdUxbZr_V11UyzmJanRrWf3bYMA'
    };

    _login = async () => {
        let response = await this.postRequest();
        if(!response.ok) {
            this.setState({errorMessage: true})
            return
        }
        this.setState({errorMessage: false, token: response.json().token})
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
            .catch(e => {
                console.error(e)
            })
    };

    render() {
        let screen;
        if(this.state.token !== '') {
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
                    {this.state.errorMessage && <View><Text>Неверные данные</Text></View>}
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
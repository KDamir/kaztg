import React from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import { Container, Header, Content, Input, Item, Form, Label, Button,} from 'native-base';
const { width, height } = Dimensions.get('window');

export default class Login extends React.PureComponent {

    state = {
        iin: '',
        password: '',
        errorMessage: false
    };

    _login = async () => {
        let result = await this.postRequest();
        if(!result.ok) {
            this.setState({errorMessage: true})
        }
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
        return(
            <Container>
                <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#0b6990',
                                overflow:'hidden',}}>
                    <Content style={{paddingTop: height/4}}>
                        <Form>
                            <Item stackedLabel>
                                <Label style={{color: 'white'}}>ИИН</Label>
                                <Input keyboardType="phone-pad"
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
            </Container>
        );
    }


}
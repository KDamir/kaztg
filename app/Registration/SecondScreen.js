import React from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Dimensions,
    Image,
    AsyncStorage,
    KeyboardAvoidingView,
    StyleSheet,
    Linking,
    Modal
} from 'react-native';

import {
    Container,
    Header,
    Content,
    Body,
    Input,
    Item,
    Form,
    Label,
    Button,
    ListItem,
    CheckBox
} from 'native-base';
import logoImage from './../images/turmys-white-logo.png';
import iconLogoImage from './../images/icon_logo.png';
import backgroundImage from './../images/background.png';

const { width, height } = Dimensions.get('window');

import {NavigationActions} from 'react-navigation';

export default class SecondScreen extends React.PureComponent {

    state = {
        pass1: '',
        pass2: '',
        check1: true,
        check2: false,
        check3: false,
        errorMsg: '',
        responseMsg: ''
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params);
    }

    checkPass = () => {
        if(this.state.pass1 !== this.state.pass2) {
            this.setState({errorMsg: 'Пароли не совпадают'});
            return false;
        }
        return true;
    };

    _register = async () => {
        if(!this.checkPass()) return;
        const url = `http://turmys.kz/api/register`;

        const params = this.props.navigation.state.params;
        const adsAccept = this.state.check1;
        const agreementAccept = this.state.check2;
        const email = params.email;
        const firstName = params.name;
        const langKey = 'ru';
        const lastName = params.family;
        const login = params.iin;
        const password = this.state.pass1;
        const patronymic = params.otchestvo;
        const phone = params.phone;

        const body = JSON.stringify({
            "adsAccept": `${adsAccept}`,
            "agreementAccept": `${agreementAccept}`,
            "email": `${email}`,
            "firstName": `${firstName}`,
            "langKey": `${langKey}`,
            "lastName": `${lastName}`,
            "login": `${login}`,
            "password": `${password}`,
            "patronymic": `${patronymic}`,
            "phone": `${phone}`
        });

        let response = await fetch(url, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json'}
        });
        if(response === undefined) {
            this.setState({responseMsg: 'Проверьте соединение к интернету'})
        }
        if(response.status === 400) {
            this.setState({responseMsg: response._bodyText})
        }
        if(!response.ok) {
            this.setState({responseMsg: 'Техническая ошибка'})
        }
        if(response.status === 201) {
            this.setState({responseMsg: 'Успешно! Проверьте свою почту.'})
        }

    };

    render() {
        return(
            <Container style={styles.container}>
            <Content>
                <Image source={backgroundImage} style={styles.background}>
                    <Image source={iconLogoImage} style={{alignSelf: 'center', width: 70, height: 70}}/>
                    <Image source={logoImage} style={{alignSelf: 'center', marginBottom: 20, marginTop: 5}}/>
                    <KeyboardAvoidingView behavior={'padding'}>
                        <Form>
                            <Item bordered
                                  rounded
                                  style={styles.item}>
                                <Input style={{color: 'white', width: width/2}}
                                       value={this.state.name}
                                       placeholder={'Пароль'}
                                       placeholderTextColor={'white'}
                                       onChangeText={pass1 => this.setState({pass1})}
                                       secureTextEntry/>
                            </Item>
                            <Item bordered
                                  rounded
                                  style={styles.item}>
                                <Input style={{color: 'white', width: width/2}}
                                       value={this.state.name}
                                       placeholder={'Повторите пароль'}
                                       placeholderTextColor={'white'}
                                       onChangeText={pass2 => this.setState({pass2})}
                                       secureTextEntry/>
                            </Item>
                            {this.state.errorMsg !== '' && <Text style={{color: '#EEE8AA', textAlign: 'center'}}>{this.state.errorMsg}</Text>}
                            <ListItem>
                                <CheckBox
                                    checked={this.state.check1}
                                    onPress={() => this.setState({check1: !this.state.check1})}/>
                                <Body>
                                    <Text style={styles.text}>Согласен на получение рекламных и информационных сообщений</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.check2}
                                    onPress={() => this.setState({check2: !this.state.check2})}/>
                                <Body>
                                    <Text style={styles.text}>Согласие на использование электронного адреса для рассылки официальных уведомлений</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox
                                    checked={this.state.check3}
                                    onPress={() => this.setState({check3: !this.state.check3})}/>
                                <Body>
                                    <Text style={styles.text}>
                                        Я прочел и принимаю
                                    </Text>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Third')}>
                                        <Text style={[styles.text, {textDecorationLine: 'underline'}]}>соглашение</Text>
                                    </TouchableHighlight>
                                </Body>
                            </ListItem>
                        </Form>
                        <Button info
                                rounded
                                style={{alignSelf: 'center', justifyContent: 'center', marginTop: 50, width: width*5/7, height: height/15}}
                                onPress={this._register}
                                disabled={this.state.pass1 === '' || !this.state.check3}>
                            <Text style={{textAlign: 'center', alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>Зарегистрироваться</Text>
                        </Button>
                        {this.state.responseMsg !== '' && <Text style={{color: '#EEE8AA', textAlign: 'center'}}>{this.state.responseMsg}</Text>}
                        <TouchableHighlight
                            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                            underlayColor={'white'}>
                            <Text style={{color: 'white', textAlign: 'center', paddingTop: 10, fontSize: 15, textDecorationLine: 'underline'}}>Назад</Text>
                        </TouchableHighlight>
                    </KeyboardAvoidingView>
                </Image>
            </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: width,
        height: height,
        alignItems: 'center'
    },
    menuButtonImage: {
        position: 'absolute',
        backgroundColor: 'transparent',
        marginTop: 13,
        marginRight: 13,
        marginBottom: 13,
        marginLeft: 13,
    },
    text: {
        color: 'white',
        textAlign: 'left',
        paddingLeft: 10,
        fontSize: 10
    },
    item: {
        marginBottom: 10,
        width: width*5/7,
        height: height/15
    }
});
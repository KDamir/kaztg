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
    StyleSheet
} from 'react-native';

import { Container, Header, Content, Input, Item, Form, Label, Button,} from 'native-base';
import logoImage from './../images/turmys-white-logo.png';
import iconLogoImage from './../images/icon_logo.png';
import backgroundImage from './../images/background.png';

const { width, height } = Dimensions.get('window');

export default class FirstScreen extends React.PureComponent {

    state = {
        family: '',
        name: '',
        otchestvo: '',
        iin: '',
        phone: '',
        email: ''
    };

    render() {
        return(
            <Content style={styles.container}>
                <Image source={backgroundImage} style={styles.background}>
                    <View style={styles.content}>
                        <Image source={iconLogoImage} style={{alignSelf: 'center', width: 70, height: 70}}/>
                        <Image source={logoImage} style={{alignSelf: 'center', marginBottom: 20, marginTop: 5}}/>
                        <KeyboardAvoidingView behavior={'padding'}>
                            <Form>
                                <Item bordered
                                      rounded
                                      style={styles.item}>
                                    <Input keyboardType="default"
                                           style={{color: 'white', width: width/2}}
                                           placeholder={'Фамилия'}
                                           placeholderTextColor={'white'}
                                           blurOnSubmit={true}
                                           returnKeyType="done"
                                           value={this.state.family}
                                           onChangeText={family => this.setState({family})}/>
                                </Item>
                                <Item bordered
                                      rounded
                                      style={styles.item}>
                                    <Input keyboardType="default"
                                           style={{color: 'white', width: width/2}}
                                           placeholder={'Имя'}
                                           placeholderTextColor={'white'}
                                           blurOnSubmit={true}
                                           returnKeyType="done"
                                           value={this.state.name}
                                           onChangeText={name => this.setState({name})}/>
                                </Item>
                                <Item bordered
                                      rounded
                                      style={styles.item}>
                                    <Input keyboardType="default"
                                           style={{color: 'white', width: width/2}}
                                           placeholder={'Отчество'}
                                           placeholderTextColor={'white'}
                                           blurOnSubmit={true}
                                           returnKeyType="done"
                                           value={this.state.otchestvo}
                                           onChangeText={otchestvo => this.setState({otchestvo})}/>
                                </Item>
                                <Item bordered
                                      rounded
                                      style={styles.item}>
                                    <Input keyboardType="default"
                                           style={{color: 'white', width: width/2}}
                                           placeholder={'ИИН (Логин)'}
                                           maxLength={12}
                                           placeholderTextColor={'white'}
                                           blurOnSubmit={true}
                                           returnKeyType="done"
                                           value={this.state.iin}
                                           onChangeText={iin => this.setState({iin})}/>
                                </Item>
                                <Item bordered
                                      rounded
                                      style={styles.item}>
                                    <Input keyboardType="default"
                                           style={{color: 'white', width: width/2}}
                                           placeholder={'Номер телефона'}
                                           placeholderTextColor={'white'}
                                           blurOnSubmit={true}
                                           returnKeyType="done"
                                           value={this.state.phone}
                                           onChangeText={phone => this.setState({phone})}/>
                                </Item>
                                <Item bordered
                                      rounded
                                      style={styles.item}>
                                    <Input keyboardType="default"
                                           style={{color: 'white', width: width/2}}
                                           placeholder={'Электронная почта'}
                                           placeholderTextColor={'white'}
                                           blurOnSubmit={true}
                                           returnKeyType="done"
                                           value={this.state.email}
                                           onChangeText={email => this.setState({email})}/>
                                </Item>
                                <Button info rounded
                                        style={{alignSelf: 'center', justifyContent: 'center', marginTop: 30, width: width*5/7}}
                                        onPress={() => this.props.navigation.navigate('Second', {...this.state} )}
                                        disabled={
                                                this.state.name === ''   ||
                                                this.state.phone === ''  ||
                                                this.state.family === '' ||
                                                this.state.email === ''  ||
                                                this.state.iin === ''
                                        }>
                                    <Text style={{textAlign: 'center', alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>Далее</Text>
                                </Button>
                            </Form>
                        </KeyboardAvoidingView>
                    </View>
                </Image>
            </Content>
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
    },
    content: {
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
    item: {
        marginBottom: 10,
        width: width*5/7,
        height: height/15
    }
});
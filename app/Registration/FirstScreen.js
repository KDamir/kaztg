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
import menuImage from './../images/menu.png';

const { width, height } = Dimensions.get('window');

export default class FirstScreen extends React.PureComponent {
    static navigationOptions = {
        header: null,
    };

    state = {
        family: '',
        name: '',
        otchestvo: '',
        iin: '',
        phone: '',
        email: ''
    }

    render() {
        return(
            <Content style={styles.container}>
                <Image source={backgroundImage} style={styles.background}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Image source={menuImage} style={styles.menuButtonImage}/>
                    </TouchableHighlight>
                    <Image source={iconLogoImage} style={{alignSelf: 'center', width: 100, height: 100}}/>
                    <Image source={logoImage} style={{alignSelf: 'center', marginBottom: 50, marginTop: 5}}/>
                    <KeyboardAvoidingView behavior={'padding'}>
                        <Form>
                            <Item bordered
                                  rounded
                                  style={{marginBottom: 10, width: width*5/7}}>
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
                                  style={{marginBottom: 10, width: width*5/7}}>
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
                                  style={{marginBottom: 10, width: width*5/7}}>
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
                                  style={{marginBottom: 10, width: width*5/7}}>
                                <Input keyboardType="default"
                                       style={{color: 'white', width: width/2}}
                                       placeholder={'ИИН'}
                                       placeholderTextColor={'white'}
                                       blurOnSubmit={true}
                                       returnKeyType="done"
                                       value={this.state.iin}
                                       onChangeText={iin => this.setState({iin})}/>
                            </Item>
                            <Item bordered
                                  rounded
                                  style={{marginBottom: 10, width: width*5/7}}>
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
                                  style={{marginBottom: 10, width: width*5/7}}>
                                <Input keyboardType="default"
                                       style={{color: 'white', width: width/2}}
                                       placeholder={'Электронная почта'}
                                       placeholderTextColor={'white'}
                                       blurOnSubmit={true}
                                       returnKeyType="done"
                                       value={this.state.email}
                                       onChangeText={email => this.setState({email})}/>
                            </Item>
                            <Button info rounded large
                                    style={{alignSelf: 'center', justifyContent: 'center', marginTop: 30, width: width*5/7}}
                                    onPress={() => this.props.navigation.navigate('Second', {...this.state} )}
                                    disabled={false}>
                                <Text style={{textAlign: 'center', alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>Далее</Text>
                            </Button>
                        </Form>
                    </KeyboardAvoidingView>
                </Image>
            </Content>
        );
    }
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    background: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
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
});
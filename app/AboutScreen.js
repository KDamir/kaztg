/**
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    FlatList,
    TouchableHighlight,
    BackHandler,
    Image,
    ScrollView,
    PixelRatio,
    Linking,
    Dimensions
} from 'react-native';

import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem } from 'native-base';
import logoImage from './images/turmys-white-logo.png';
import iconLogoImage from './images/icon_logo.png';
import backgroundImage from './images/background.png';
import menuImage from './images/menu.png';

import styles from './styles';

const { width, height } = Dimensions.get('window');

export default class AboutScreen extends React.PureComponent {

    static navigationOptions = {
        drawerLabel: 'О приложении',
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20,}}>
                <Image source={backgroundImage} style={{flex: 1, width: width, height: height}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Image source={menuImage} style={styles.menuButtonImage}/>
                    </TouchableHighlight>
                    <Image source={iconLogoImage} style={{alignSelf: 'center', width: 100, height: 100, marginTop: height/6}}/>
                    <Image source={logoImage} style={{alignSelf: 'center', marginTop: 5}}/>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 20, paddingTop: 20}}>
                        Turmys - это система, которая облегчит ваши квартирные и домашние дела
                    </Text>
                    <View style={{
                                    position: 'absolute',
                                    bottom: 30,
                                    height: height/5,
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    alignSelf: 'center'}}>
                        <Button info
                                rounded
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{alignSelf: 'center', justifyContent: 'center', width: width*5/7}}>
                            <Text style={{textAlign: 'center', alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>Авторизация</Text>
                        </Button>
                        <Text style={{textAlign: 'center', color: 'white',}}>
                            Нет аккаунта?
                        </Text>
                        <TouchableHighlight onPress={() => Linking.openURL('http://turmys.kz/#/property')}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white',
                                textDecorationLine: 'underline',
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontWeight: 'bold'
                            }}>
                                Зарегестрироваться
                            </Text>
                        </TouchableHighlight>
                    </View>
                </Image>

            </View>
        );
    }
}
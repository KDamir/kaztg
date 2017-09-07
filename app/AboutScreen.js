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
const { width, height } = Dimensions.get('window');

export default class AboutScreen extends React.PureComponent {

    static navigationOptions = {
        drawerLabel: 'О приложении',
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={backgroundImage} style={{flex: 1, width: width, height: height}}>
                    <Image source={iconLogoImage} style={{alignSelf: 'center', width: 100, height: 100, marginTop: height/6}}/>
                    <Image source={logoImage} style={{alignSelf: 'center', marginTop: 5}}/>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 20, paddingTop: 20}}>
                        Turmys - это система, которая облегчит ваши квартирные и домашние дела
                    </Text>
                    <View style={{position: 'absolute', bottom: 150}}>
                        <Text style={{textAlign: 'center', color: 'white',}}>
                            Нет аккаунта?
                        </Text>
                        <TouchableHighlight onPress={() => Linking.openURL('http://turmys.kz/#/property')}>
                            <Text style={{textAlign: 'center', color: 'white', textDecorationLine: 'underline', paddingLeft: 10, paddingRight: 10}}>
                                Нажмите, чтобы зарегестрироваться на сайте
                            </Text>
                        </TouchableHighlight>
                    </View>
                </Image>

            </View>
        );
    }
}
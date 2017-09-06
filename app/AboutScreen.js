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
    Linking
} from 'react-native';

import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem } from 'native-base';

export default class AboutScreen extends React.PureComponent {

    static navigationOptions = {
        drawerLabel: 'О приложении',
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b6990'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
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
                <View style={{position: 'absolute', bottom: 20}}>
                    <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
                        Контакты
                    </Text>
                    <Text style={{textAlign: 'center', color: 'white'}}>
                        Телефон: +7 (7172) 55-90-22 вн. 7939
                        Email: info@turmys.kz
                    </Text>
                </View>


            </View>
        );
    }
}
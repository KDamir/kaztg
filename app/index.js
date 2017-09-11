/**
 * @flow
 */

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//     GLOBAL.originalXMLHttpRequest :
//     GLOBAL.XMLHttpRequest;
//
// // fetch logger
// global._fetch = fetch;
// global.fetch = function (uri, options, ...args) {
//     return global._fetch(uri, options, ...args).then((response) => {
//         console.log('Fetch', { request: { uri, options, ...args }, response });
//         return response;
//     });
// };
//
// import 'core-js';
//
// window.onunhandledrejection = function(promise, reason) {
//     console.log('window.onunhandledrejection is', promise, reason);
// };

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

import { DrawerNavigator, StackNavigator } from 'react-navigation';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import SideBar from './SideBar';
import FirstScreen from './Registration/FirstScreen';
import SecondScreen from './Registration/SecondScreen';
import ThirdScreen from './Registration/ThirdScreen';

const RegistrationScreen = StackNavigator({
    First: {
        screen: FirstScreen
    },
    Second: {
        screen: SecondScreen,
    },
    Third: {
        screen: ThirdScreen,
    }
});


const kaztg = DrawerNavigator(
    {
        Login: {
            path: '/',
            screen: LoginScreen
        },
        About: {
            path: '/about',
            screen: AboutScreen
        },
        Registration: {
            path: '/registration',
            screen: RegistrationScreen
        }
    },
    {
        initialRouteName: 'About',
        contentOptions: {
            activeTintColor: '#1F586C',
            inactiveTintColor: '#1F586C'
        },
        contentComponent: props => <SideBar {...props} />
    }
);

AppRegistry.registerComponent('kaztg', () => kaztg);

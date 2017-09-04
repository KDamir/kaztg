/**
 * @flow
 */

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
    return global._fetch(uri, options, ...args).then((response) => {
        console.log('Fetch', { request: { uri, options, ...args }, response });
        return response;
    });
};

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

import { DrawerNavigator } from 'react-navigation';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import SideBar from './SideBar';

const kaztg = DrawerNavigator(
    {
        Login: {
            path: '/',
            screen: LoginScreen
        },
        About: {
            path: '/about',
            screen: AboutScreen
        }
    },
    {
        initialRouteName: 'About',
        contentOptions: {
            activeTintColor: 'black',
            inactiveTintColor: '#4f3252',
        },
        contentComponent: props => <SideBar {...props} />
    }
);

AppRegistry.registerComponent('kaztg', () => kaztg);

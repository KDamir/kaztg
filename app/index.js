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

import StaticWebView from './StaticWebView';
import Login from './Login';

export default class kaztg extends Component {




    render() {
        return (
            <Login/>

            /*<StaticWebView uri={'http://turmys.kz/'}/>*/
        );
    }
}

AppRegistry.registerComponent('kaztg', () => kaztg);

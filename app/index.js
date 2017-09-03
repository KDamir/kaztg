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
    Linking,
    AsyncStorage
} from 'react-native';
import OneSignal from 'react-native-onesignal';

export default class kaztg extends Component {

    // componentWillMount() {
    //     OneSignal.addEventListener('received', this.onReceived);
    //     OneSignal.addEventListener('opened', this.onOpened);
    //     OneSignal.addEventListener('registered', this.onRegistered);
    //     OneSignal.addEventListener('ids', this.onIds);
    // }
    //
    // componentWillUnmount() {
    //     OneSignal.removeEventListener('received', this.onReceived);
    //     OneSignal.removeEventListener('opened', this.onOpened);
    //     OneSignal.removeEventListener('registered', this.onRegistered);
    //     OneSignal.removeEventListener('ids', this.onIds);
    // }
    //
    // onReceived(notification) {
    //     console.log("Notification received: ", notification);
    // }
    //
    // onOpened(openResult) {
    //     console.log('Message: ', openResult.notification.payload.body);
    //     console.log('Data: ', openResult.notification.payload.additionalData);
    //     console.log('isActive: ', openResult.notification.isAppInFocus);
    //     console.log('openResult: ', openResult);
    // }
    //
    // onRegistered(notifData) {
    //     console.log("Device had been registered for push notifications!", notifData);
    // }
    //
    // onIds(device) {
    //     console.log('Device info: ', device);
    // }

    state = {
        url: "https://www.google.kz",
    };


    render() {
        return (
            <StaticWebView uri={this.state.url}/>
        );
    }
}

class StaticWebView extends React.PureComponent {
    props: {
        uri: string,
    };

    state = {
        url: this.props.uri,
        loading: true
    }

    componentDidMount() {
        this.refs.myWebView.injectJavaScript(injectedJavaScript);
    }

    render() {
        return <WebView
                        ref="myWebView"
                        startInLoadingState
                        domStorageEnabled
                        javaScriptEnabled
                        style={styles.webView}
                        onLoadStart={(navState) => this.setState({url: navState.nativeEvent.url})}
                        onLoadEnd={() => this.setState({loading: false})}
                        source={{
                            uri: this.state.url,
                }}/>;
    }
}

const injectedJavaScript = `
    alert(window.localStorage);
    //alert(localStorage.getItem("jhi-authenticationToken"));
    window.localStorage.setItem("jhi-authenticationToken", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkzMjEiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNTA3MDEyODgxfQ.VSQ2GFH1YCetMqdJzZLKFvlxW3dwFx1kDcLVRA5s3lpro5VTh6styPOT-kBS6zy909B77-T6MdOZewj7FhG_Wg");
    window.alert(localStorage.getItem("jhi-authenticationToken"));
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('kaztg', () => kaztg);

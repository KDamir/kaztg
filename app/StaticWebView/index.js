import React from 'react';
import {Dimensions} from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';
const { width, height } = Dimensions.get('window');

export default class StaticWebView extends React.PureComponent {
    props: {
        uri: string,
        token: string
    };

    state = {
        url: this.props.uri
    };

    _loadStart = (event) => {
        const token = '"' + this.props.token + '"';
        const injectedJavascript = `
                var token = ${token};
                window.localStorage.setItem("jhi-authenticationToken", '"' + token + '"');
            `;
        this.refs.myWebView.evaluateJavaScript(injectedJavascript);
        this.setState({url: event.nativeEvent.url});
    };

    render() {
        return <WKWebView
            style={{flex: 1, width: width}}
            ref="myWebView"
            startInLoadingState
            injectedJavaScript={injectedListenerForLogout}
            onMessage={this.webViewMessage}
            onLoadStart={this._loadStart}
            source={{
                uri: this.state.url,
                headers: {Authorization: 'Bearer ' + this.props.token}
            }}
        />;
    }

    webViewMessage = async (data) => {
        let message;
        try {
            message = JSON.parse(data.body);
        } catch (e) {
            console.log('Error parsing data from webView message: ' + data);
        }
        if (message == null) return;
        if (message.value === 'logout') {
            await this.props.logout();
        }
    }

}

const injectedListenerForLogout = ` 
var el = document.querySelector('a[ng-click="headerVm.logout()"]');
el.addEventListener('click', function (event) {
  var message = {type: 'click', value: 'logout'};
  window.webkit.messageHandlers.reactNative.postMessage(JSON.stringify(message));
});
`;

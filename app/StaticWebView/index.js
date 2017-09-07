import React from 'react';
import {WebView, View, Text, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class StaticWebView extends React.PureComponent {
    props: {
        uri: string,
        token: string
    };

    state = {
        loading: true,
        url: this.props.uri
    };

    navStateChange = (navState) => {
        this.setState({loading: navState.loading})
    };

    _loadStart = (event) => {
        const token = '"' + this.props.token + '"';
        const injectedJavascript = `
                var token = ${token};
                window.localStorage.setItem("jhi-authenticationToken", '"' + token + '"');
            `;
        this.refs.myWebView.injectJavaScript(injectedJavascript);
        this.setState({url: event.nativeEvent.url});
    };

    render() {
        return <WebView
            style={{flex: 1, width: width}}
            ref="myWebView"
            startInLoadingState
            injectedJavaScript={injectedListenerForLogout}
            onMessage={this.webViewMessage}
            onNavigationStateChange={this.navStateChange.bind(this)}
            onLoadStart={this._loadStart}
            source={{
                uri: this.state.url,
                headers: {Authorization: 'Bearer ' + this.props.token}
            }}
        />;
    }

    webViewMessage = async (event) => {
        const data = event.nativeEvent.data;
        let message;
        try {
            message = JSON.parse(data);
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
  window.postMessage(JSON.stringify(message));
});
`;

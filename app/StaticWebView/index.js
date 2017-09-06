import React from 'react';
import {WebView, View, Text} from 'react-native';

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
            style={{flex: 1}}
            ref="myWebView"
            startInLoadingState
            onNavigationStateChange={this.navStateChange.bind(this)}
            onLoadStart={this._loadStart}
            source={{
                uri: this.state.url,
                headers: {Authorization: 'Bearer ' + this.props.token}
            }}
        />;
    }

}

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
        if(!this.state.loading) {
            const injectedJavascript = `
                var token = ${this.props.token};
                window.localStorage.setItem("jhi-authenticationToken", '"' + token + '"');
            `;
            this.refs.myWebView.injectJavaScript(injectedJavascript);
        }
        this.setState({loading: navState.loading})
    };

    _loadStart = (event) => {
        this.setState({url: event.nativeEvent.url});
    };

    render() {
        return <WebView
            style={{flex: 1}}
            ref="myWebView"
            startInLoadingState
            onNavigationStateChange={this.navStateChange.bind(this)}
            onLoadStart={this._loadStart}
            source={{uri: this.state.url}}
        />;
    }

}

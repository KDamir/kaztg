import React from 'react';
import {
    WebView
} from 'react-native';

import {
    Container,
    Header,
    Content,
    Body,
    Input,
    Item,
    Form,
    Label,
    Button,
    ListItem,
    CheckBox
} from 'native-base';

export default class ThirdScreen extends React.PureComponent {
    render() {
        return(
            <WebView
                style={{flex: 1}}
                source={{uri: 'http://telegra.ph/Soglashenie-09-11'}}/>
        )
    }
}


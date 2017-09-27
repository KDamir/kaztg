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
    WebView,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { DrawerNavigator, StackNavigator } from 'react-navigation';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import SideBar from './SideBar';
import FirstScreen from './Registration/FirstScreen';
import SecondScreen from './Registration/SecondScreen';
import ThirdScreen from './Registration/ThirdScreen';
import BackButton from './BackButton';
import { NavigationActions } from 'react-navigation'
import menuImage from './images/menu.png';
import backgroundImage from './images/background.png';
const { width, height } = Dimensions.get('window');

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Image source={backgroundImage} style={{flex: 1, width: width, height: height,}}>
            <Image source={menuImage} style={{backgroundColor: 'transparent', marginTop: 13, marginRight: 13, marginBottom: 13, marginLeft: 13,}}/>
        </Image>
    </TouchableOpacity>
);

DrawerButton.propTypes = {
    navigation: React.PropTypes.object.isRequired,
};

const RegistrationScreen = StackNavigator({
    First: {
        screen: FirstScreen
    },
    Second: {
        screen: SecondScreen,
    },
    Third: {
        screen: ThirdScreen,
        navigationOptions: ({navigation}) => ({
          headerLeft: <BackButton navigation={navigation} />,
        }),
    }
},
    {
        navigationOptions: ({navigation}) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
        }),
    }
);


const kaztg = DrawerNavigator(
    {
        Login: {
            path: '/',
            screen: LoginScreen
        },
        Registration: {
            path: '/registration',
            screen: RegistrationScreen,
            navigationOptions: {
                title: 'Регистрация'
            }
        },
        About: {
            path: '/about',
            screen: AboutScreen
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

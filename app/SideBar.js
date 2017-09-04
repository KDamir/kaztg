import React from 'react';
import { AppRegistry, Image, StatusBar, View, Dimensions,} from 'react-native';
import { Container, Content, Text, List, ListItem, } from 'native-base';
import { DrawerItems } from 'react-navigation';
const { width, height } = Dimensions.get('window');

export default class SideBar extends React.PureComponent {

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{
                    backgroundColor: 'white', height: height
                }}>
                    <View style={{
                        width: this.props.drawerWidth,
                        height: 80,
                        justifyContent: 'center', alignItems: 'center',overflow: 'hidden'}}>
                        <Image
                            source={require('./images/logo-turmys.gif')}
                            style={{
                                height: 45,
                                width: 113,
                            }}>
                        </Image>
                    </View>
                    <DrawerItems {...this.props}/>
                </Content>
            </Container>
        );
    }
}

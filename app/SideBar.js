import React from 'react';
import { AppRegistry, Image, StatusBar, View, Dimensions,} from 'react-native';
import { Container, Content, Text, List, ListItem, } from 'native-base';
import { DrawerItems } from 'react-navigation';
import backgroundWhiteImage from './images/background-white.png';
import iconLogoImage from './images/icon_logo.png';
const { width, height } = Dimensions.get('window');

export default class SideBar extends React.PureComponent {

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{
                    height: height
                }}>
                    <Image source={backgroundWhiteImage} style={{flex: 1, width: this.props.drawerWidth,}}>
                        <View style={{
                            width: this.props.drawerWidth,
                            height: height/4,
                            marginTop: height/15,
                            backgroundColor: 'transparent',
                            justifyContent: 'center', alignItems: 'center',overflow: 'hidden'}}>
                            <Image source={iconLogoImage} style={{alignSelf: 'center', width: 80, height: 80}}/>
                            <Image
                                source={require('./images/logo-turmys.png')}
                                style={{
                                    height: 16,
                                    width: 128,
                                    marginTop: 10
                                }}>
                            </Image>
                        </View>
                        <DrawerItems style={{alignSelf: 'center', marginTop: 5}} {...this.props}/>
                        <View style={{position: 'absolute', bottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                            <Text style={{fontSize: 12, color: '#AFC8CF', fontWeight: 'bold', paddingBottom: 5}}>Наши контакты:</Text>
                            <Text style={{fontSize: 12, paddingBottom: 2, color: 'grey'}}>Республика Казахстан, г. Астана,</Text>
                            <Text style={{fontSize: 12, paddingBottom: 2, color: 'grey'}}>БЦ "Нурсая 1", ул. Д.Кунаева д.14/3</Text>
                            <Text style={{fontSize: 12, paddingBottom: 2, color: 'grey'}}>8(7172) 55-90-22 вн. 7939</Text>
                            <Text style={{fontSize: 12, paddingBottom: 2, color: 'grey'}}>info@turmys.kz</Text>
                            <Text style={{fontSize: 12, paddingBottom: 2, color: 'grey'}}>www.turmys.kz</Text>
                        </View>
                    </Image>
                </Content>
            </Container>
        );
    }
}

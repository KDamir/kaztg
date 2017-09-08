// @flow

import {StyleSheet, PixelRatio, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        paddingTop: 40,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        // resizeMode: 'cover',
    },
    menuButtonImage: {
        marginTop: 13,
        marginRight: 13,
        marginBottom: 13,
        marginLeft: 13,
    },

});

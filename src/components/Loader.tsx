import { FC } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

const Loader: FC = () => {
    let { loaderView } = styles;
    return (
        <View style={loaderView}>
            <ActivityIndicator size={'large'} color={'grey'} />
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    loaderView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
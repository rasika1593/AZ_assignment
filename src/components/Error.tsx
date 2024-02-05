import { FC } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

interface ErrorProps {
    error: string;
}

const Error: FC<ErrorProps> = ({ error }) => {
    let { errorContainer, errorText } = styles;
    return (
        <View style={errorContainer}>
            <Text style={errorText}>{error}</Text>
        </View>
    )
}

export default Error;

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: '#FFC0CB',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        margin: 16,
        alignItems: 'center'
    },
    errorText: {
        color: '#D8000C',
        fontSize: 16,
        textAlign: 'center'
    }
});
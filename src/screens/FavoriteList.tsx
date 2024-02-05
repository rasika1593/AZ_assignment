
import React, { useContext, FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';

import { CommonContext, CommonContextType } from "../context/context";



const FavoriteList: FC = () => {
    let { container, cardText, card, cardImage, emptyMsg } = styles;
    const context = useContext(CommonContext) as CommonContextType;

    const renderItem = ({ item }: { item: any }) => (
        <View style={card}>
            <TouchableOpacity
                key={item?.key}
            >
                <Image style={cardImage} source={{ uri: `${item?.image?.original}` }} />

                <Text style={cardText}>{item?.name}</Text>
            </TouchableOpacity>

        </View>
    );

    return (
        <View >

            {context.favoriteList?.length ?
                < FlatList
                    style={container}
                    data={context.favoriteList}
                    renderItem={renderItem}
                    keyExtractor={item => item?.id}
                />
                : <Text style={ emptyMsg }>No favorites yet!</Text>
            }
        </View>
    );
}

export default FavoriteList;

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    cardText: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center'

    },
    card: {
        marginBottom: 10,
        paddingBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3
        },
        backgroundColor: '#6082B6'
    },
    cardImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover'
    },
    emptyMsg: {
        margin: '30%',
        fontSize: 18
    }
});
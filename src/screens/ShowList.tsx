
import React, { useState, useEffect, useContext, FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import axios from "axios";
import { CommonContext, CommonContextType } from "../context/context";
import useLoader from '../hooks/useLoader';
import Loader from '../components/Loader';
import Error from '../components/Error';
import useError from '../hooks/useError';
import { BASE_URL } from '../services/api';
import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}

const ShowList: FC<Props> = ({ navigation }) => {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const { isLoading, setIsLoading } = useLoader();
    const { error, setError } = useError();

    const context = useContext(CommonContext) as CommonContextType;

    let { container, cardText, card, cardImage, subContainer, subContent, rating } = styles;

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/shows?page=${currentPage}`);
            let mergedData = [...data, ...response.data]
            context.setShowList(mergedData);
            setData(mergedData);
            setIsLoading(false);
            setError("")
        } catch (error) {
            console.log("Error fetching data:", error)
            setIsLoading(false);
            setError("Failed to fetch list.");
        }
    }

    const onPress = (item: any) => {
        navigation.navigate('ShowDetails', { id: item.id })
    };

    const setToFavList = (item: any) => {
        context.updateList(item)
    }

    const renderItem = ({ item }: { item: any }) => {
        const isFavorite = context.favoriteList?.some(favorite => favorite.id === item.id);
        return (
            <View style={card}>
                <TouchableOpacity
                    key={item.key}
                    onPress={() => onPress(item)}
                >
                    <Image style={cardImage} source={{ uri: `${item?.image?.original}` }} />
                    <Text style={cardText}>{item.name}</Text>
                </TouchableOpacity>
                <View style={subContainer}>
                    <View style={subContainer}>
                        <Image style={subContent} source={require('../../assets/star.png')} />
                        <Text style={rating}>{item.rating?.average}</Text>
                    </View>
                    <View >
                        <TouchableOpacity
                            onPress={() => setToFavList(item)}
                        >
                            {isFavorite?<Image style={subContent} source={require('../../assets/clickedfavorite.png')} />:
                            <Image style={subContent} source={require('../../assets/favorite.png')} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    const renderLoader = () => {
        if (!context.searchQuery) {
            return (
                <Loader />
            )
        }
    }

    const loadMore = () => {
        setCurrentPage(currentPage + 1)
    }


    if (isLoading) {
        <Loader />
    }
    if (error) {
        <Error error={error} />
    }

    return (
        <FlatList
            style={container}
            data={context.showList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={renderLoader}
            onEndReached={loadMore}
            onEndReachedThreshold={0}
        />
    );
}

export default ShowList;

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

    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
    },
    subContent: {
        height: 40, width: 40
    },
    ratingText: {
        paddingTop: 13,
        fontSize: 18
    },
    rating: {
        paddingTop: 13,
        fontSize: 18
    }
});


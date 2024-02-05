
import React, { useState, useEffect, FC } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions
} from 'react-native';
import axios from "axios";
import HTML from 'react-native-render-html';
import Loader from '../components/Loader';
import useLoader from '../hooks/useLoader';
import useError from '../hooks/useError';
import Error from '../components/Error';
import { BASE_URL } from '../services/api';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
    route: any;
};

var { width, height } = Dimensions.get('window');

const ShowDetails: FC<Props> = ({ navigation, route }) => {
    let [detailData, setDetailData] = useState<any>({});
    const { isLoading, setIsLoading } = useLoader();
    const { error, setError } = useError();
    const alldays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weekends = ['Saturday', 'Sunday'];


    let { mainView, genresSection, showTitle, summarySection, infoSection, infoTitle, subSection, subSecTitle, table, row, cell, tableTitle, episodeName, castSection, castTitle, castContainer, castImage, textName, textCharacter } = styles;

    const fetchDetails = async (id: number) => {
        try {
            const response = await axios.get(`${BASE_URL}/shows/${id}?embed[]=episodes&embed[]=cast&embed[]=crew`)
            setIsLoading(false);
            setDetailData(response.data)
        } catch (error) {
            console.log("Error fetching data:", error)
            setIsLoading(false);
            setError("Failed to fetch list.");
        }
    }

    useEffect(() => {
        fetchDetails(route.params.id)
    }, [route.params.id])

    const showschedule = (days: any) => {
        if (JSON.stringify(days) === JSON.stringify(alldays)) {
            return 'all days';
        } else if (JSON.stringify(days) === JSON.stringify(weekdays)) {
            return 'weekdays';
        } else if (JSON.stringify(days) === JSON.stringify(weekends)) {
            return 'weekends';
        } {
            return days?.join(', ');
        }
    }
    if (isLoading) {
        <Loader />
    }
    if (error) {
        <Error error={error} />
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <Image source={{ uri: detailData?.image?.original }} style={{ width, height: height * 0.55 }} />
            <View style={mainView}>
                <Text style={showTitle}>
                    {detailData?.name}
                </Text>
                <View style={genresSection}>
                    {
                        detailData?.genres?.map((genre: any, index: number) => {
                            let showbar = index + 1 != detailData.genres.length;
                            return (
                                <View key={index}
                                    style={styles.genresSection}>
                                    <Text >{genre}</Text>
                                    <Text>{showbar ? "    |   " : null}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={summarySection}>
                    {(!detailData || !detailData.summary) ?
                        <View><Text>No summary available</Text></View> : <HTML source={{ html: detailData.summary }} />}
                </View>
                <View style={infoSection}>
                    <Text style={infoTitle}>Information</Text>
                    <View style={subSection}>
                        <Text style={subSecTitle}>Schedule: </Text>
                        <Text>{showschedule(detailData?.schedule?.days)}</Text>

                        <Text> at {detailData?.schedule?.time} </Text>
                    </View>

                    <View style={subSection}>
                        <Text style={subSecTitle}>Language: </Text>
                        <Text>{detailData?.language}</Text>
                    </View>
                    <View style={subSection}>
                        <Text style={subSecTitle}>Status: </Text><Text>{detailData?.status}</Text>
                    </View>
                    <View style={subSection}>
                        <Text style={subSecTitle}>Episodes: </Text>
                        <Text>{detailData?._embedded?.episodes?.length} episodes</Text>
                    </View>

                    <View style={subSection}>
                        <Text style={subSecTitle}>Created By: </Text>
                        <Text> {detailData?._embedded?.crew?.map((item: any, index: number) => {
                            let showbar = index + 1 != detailData?._embedded?.crew?.length;
                            return (
                                item.type === "Creator" && (
                                    <View key={item.person.id}>
                                        <Text>{item.person.name} {showbar ? "   |   " : null}</Text>
                                    </View>
                                )
                            )
                        })}</Text>
                    </View>
                </View>
                <View >
                    <Text style={tableTitle}>Episodes</Text>
                    <View style={table}>
                        <View style={row}>
                            <Text style={cell}>Episode Name</Text>
                            <Text style={cell}>Airdate</Text>
                            <Text style={cell}>Duration</Text>
                        </View>
                        {detailData?._embedded?.episodes.slice(0, 3)?.map((episode: any, index: number) => {
                            return (
                                <View key={index} style={row}>
                                    <Text style={cell}>{episode.season}x {episode.number}  <Text style={episodeName}>{episode.name}</Text></Text>
                                    <Text style={cell}>{episode.airdate}</Text>
                                    <Text style={cell}>{episode.runtime} min</Text>
                                </View>
                            )
                        })}
                    </View>
                    <Button
                        color='#6082B6'
                        title="View all episodes"
                        onPress={() => console.log('Redirect to all episodes')}
                    />
                </View>

                <View>
                    <Text style={castTitle}>Cast</Text>
                    <View style={castSection}>
                        {detailData?._embedded?.cast.slice(0, 5)?.map((person: any, index: number) => {
                            return (
                                <View key={index} style={castContainer} >
                                    <Image source={{ uri: person?.person?.image?.original ? person?.person?.image?.original : null }} style={castImage} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={textName}>{person?.person?.name}</Text>
                                        <Text>as</Text>
                                        <Text style={textCharacter}>{person?.character?.name}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <Button
                        color='#6082B6'
                        title="View all Cast"
                        onPress={() => console.log('Redirect to all cast')}
                    />

                </View>
            </View>
        </ScrollView>

    );
}
export default ShowDetails;

const styles = StyleSheet.create({
    mainView: {
        padding: 15
    },

    showTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        padding: 20
    },
    genresSection: {
         flexDirection: 'row',
          justifyContent: 'center' 
    },
    summarySection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10
    },
    infoSection: {
        width: '100%',
        backgroundColor: '#E5E4E2',
        padding: 20,
        marginBottom: 10
    },
    infoTitle: {
        fontSize: 20
    },
    subSection: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    subSecTitle: {
        fontWeight: '600'
    },
    tableTitle: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10
    },
    table: {
        borderWidth: 1,
        borderColor: '#E5E4E2',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E4E2',
    },
    episodeName: {
        color: '#6082B6'
    },
    castSection: {
        marginBottom: 20
    },
    castTitle: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10
    },
    castContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
    },
    castImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#6082B6'
    },
    textCharacter: {
        fontSize: 14,

    }


});


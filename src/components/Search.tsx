
import { FC, useContext, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { BASE_URL } from '../services/api';
import { CommonContext, CommonContextType } from "../context/context";
import axios from "axios";

const Search: FC = () => {
    let { searchBox } = styles;

    const context = useContext(CommonContext) as CommonContextType;

    useEffect(() => {
        fetchData();
    }, [context.searchQuery])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/search/shows?q=${context.searchQuery}`)
            const transformedData = response.data.map((item: any) => item.show);
            context.setShowList(transformedData)
        } catch (error) {
            console.log("Error fetching data:", error)
        }
    }

    const handleSearch = (query: string) => {
        context.setSearchQuery(query)
    }
    return (
        <View style={{ margin: '2%' }}>
            <TextInput
                placeholder='Search'
                clearButtonMode='always'
                style={searchBox}
                autoCapitalize='none'
                value={context.searchQuery}
                onChangeText={(query) => handleSearch(query)}
            />
        </View>

    )
}
export default Search;

const styles = StyleSheet.create({
    searchBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8
    },

});
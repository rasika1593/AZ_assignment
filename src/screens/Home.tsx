
import { FC } from "react";
import ShowList from "./ShowList"
import Search from "../components/Search"
import { useNetInfo } from '@react-native-community/netinfo';
import NetworkCheck from '../components/NetworkCheck';
import { NavigationProp } from '@react-navigation/native';
import ErrorBoundary from "../components/ErrorBoundary";

interface Props {
    navigation: NavigationProp<any>;
}

const Home: FC<Props> = ({ navigation }) => {
    const netiInfo = useNetInfo();

    return (
        <ErrorBoundary>
            <Search />
            <ShowList navigation={navigation} />
        </ErrorBoundary>
    )
}
export default Home;
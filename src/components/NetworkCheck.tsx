import { FC } from "react";
import { StyleSheet, Text, View } from "react-native"

const NetworkCheck:FC = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>
          Connection Status :  Disconnected
        </Text>
        <Text style={styles.statusText}>Please check your internet connection </Text>
      </View>
    );
  };

export default NetworkCheck;

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
      },
      statusText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
      },
  })
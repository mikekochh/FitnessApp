import { StyleSheet } from "react-native"
import { Platform } from "react-native";

export const isAndroid = () => {
  if (Platform.OS === "android") {
    return true;
  } else {
    return false;
  }
};

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#fff',
    },
    header: {
        backgroundColor: '#1e88e5',
        padding: 20,
        alignItems: 'center',
        width: "100%",
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});
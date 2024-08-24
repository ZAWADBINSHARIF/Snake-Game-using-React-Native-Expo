import AsyncStorage from "@react-native-async-storage/async-storage";


export default function useStoreData() {
    const store = {
        async setItem(key: string, value: any) {
            try {
                await AsyncStorage.setItem(key, value);
            } catch (error) {
                console.log(error);
            }
        },
        async getItem(key: string) {
            try {
                return await AsyncStorage.getItem(key);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return store;
}
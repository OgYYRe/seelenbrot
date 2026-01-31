import {Pressable, Text, View} from "react-native";

export default function HomeScreen({navigation}:  any ) {

    return (
        <View>
            <Text>Home Screen</Text>

            <Pressable onPress={()=> navigation.navigate('Recipe')}>
                <Text>Malzemeleri ayarla</Text>
            </Pressable>

            <Pressable onPress={()=> navigation.navigate('Today')}>
                <Text>Yemek Vakti</Text>
            </Pressable>


        </View>
    );
}
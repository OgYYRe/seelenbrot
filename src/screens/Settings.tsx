import {View, Text} from "react-native";
import {styles} from "@react-native-community/slider/src/utils/styles.ts";

export default function SettingsScreen() {
    return (
        <View>
            <Text style={{marginTop: 20, fontSize: 24, fontWeight: 'bold'}}>Ayarlar</Text>

            <Text style={{marginTop: 20, fontSize: 12, color: '#666'}}>
                Quran Mushaf data:
                zonetecde/mushaf-layout
                Licensed under CC BY-NC 4.0
            </Text>
        </View>
    );
}

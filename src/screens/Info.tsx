import {View, Text} from "react-native";
import {useTranslation} from "react-i18next";



export default function InfoScreen() {


    const { t } = useTranslation();
    return (
        <View>
            <Text style={{marginTop: 20, fontSize: 24, fontWeight: 'bold'}}>{t("nav3")}</Text>

        </View>
    );
}

import { ScrollView, View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import {useTranslation} from "react-i18next";

const openLink = (url: string) => {
    Linking.openURL(url);
};


export default function InfoScreen({ navigation }: any) {

    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.topNav}>
                    <Pressable onPress={() => navigation.navigate('Home')} style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.9 }] }>
                        <Text style={styles.topNavText}>← {t('nav_home')}</Text>
                    </Pressable>
                </View>

            {/* About App */}
            <View style={styles.card}>
                <Text style={styles.title}>
                    {t("app_title")}
                </Text>
                <Text style={styles.text}>
                    {t("app_desc")}
                </Text>
            </View>

            {/* Sources */}
            <View style={styles.card}>
                <Text style={styles.title}>
                    {t("sources_title")}
                </Text>
                <Text style={styles.text}>
                    {t("sources_desc")}
                </Text>

                <Pressable onPress={() => openLink("https://tanzil.net/download/")}>
                    <Text style={styles.link}>
                        {t("sources_quran")}
                    </Text>
                </Pressable>

            </View>

            {/* Feedback */}
            <View style={styles.card}>
                <Text style={styles.title}>
                    {t("feedback_title")}
                </Text>
                <Text style={styles.text}>
                    {t("feedback_desc")}
                </Text>

                <Pressable onPress={() => openLink("mailto:cetinkaya-oguzhan@hotmail.com")}>
                    <Text style={styles.link}>
                        {t("feedback_email")}
                    </Text>
                </Pressable>

                <Pressable onPress={() => openLink("https://github.com/OgYYRe")}>
                    <Text style={styles.link}>
                        {t("feedback_github")}
                    </Text>
                </Pressable>
            </View>

            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    content: {
        padding: 16,
        paddingBottom: 40
    },
    container: {
        flex: 1,
        backgroundColor: '#041219'
    },
    card: {
        backgroundColor: '#072f36',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        color: '#e6f7ff'
    },

    text: {
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20
    },

    link: {
        color: '#64acd3',
        marginTop: 6,
        textDecorationLine: 'underline'
    },
    topNav: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 16, paddingTop: 8 },
    topNavText: { color: '#e6f7ff', fontWeight: '700' },
    backButton: { padding: 8, backgroundColor: 'transparent' }

})

// top navigation styles (keep inside StyleSheet)
// ...existing code...


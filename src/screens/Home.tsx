import React from "react";
import {Pressable, Text, View, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen({navigation}:  any ) {

    const changeLanguage = async (lang: string) => {
        await AsyncStorage.setItem("app:lang", lang);
        await i18n.changeLanguage(lang);
    };

    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.langRow}>
                    <Pressable onPress={() => changeLanguage("tr")} style={styles.flagButton}>
                        <Text style={styles.flag}>🇹🇷</Text>
                    </Pressable>

                    <Pressable onPress={() => changeLanguage("en")} style={styles.flagButton}>
                        <Text style={styles.flag}>🇬🇧</Text>
                    </Pressable>

                    <Pressable onPress={() => changeLanguage("de")} style={styles.flagButton}>
                        <Text style={styles.flag}>🇩🇪</Text>
                    </Pressable>
                </View>


                <View style={styles.headerCard}>
                    <Text style={styles.arabicText}>
                        اَلَا بِذِكْرِ اللّٰهِ تَطْمَئِنُّ الْقُلُوبُؕ❂
                    </Text>
                    <Text style={styles.subtitle}>Kalpler, ancak Allah’ı anmakla huzur bulur.</Text>
                    <Text style={styles.smallTextGer}>Die Herzen werden nur durch die Erwähnung Allahs ruhig.</Text>
                    <Text style={styles.smallTextEng}>Hearts find peace through the remembrance of Allah.</Text>
                    <Text style={styles.smallTextQ}>Ra'd 13:28</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {t("welcome_1")}
                    </Text>
                    <Text style={styles.title}>
                        {t("home_intro_1")}
                    </Text>
                    <Text style={styles.title}>
                        {t("home_intro_2")}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Pressable onPress={()=> navigation.navigate('Recipe')} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.buttonText}>{t("nav1")}</Text>
                    </Pressable>
                </View>


                <View style={styles.section}>
                <Pressable onPress={()=> navigation.navigate('Today')} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
                    <Text style={styles.buttonText}>{t("nav2")}</Text>
                </Pressable>
                </View>


                <View style={styles.section}>
                <Pressable onPress={()=> navigation.navigate('Settings')} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.buttonText}>{t("nav3")}</Text>
                    </Pressable>
                </View>



            </ScrollView>
        </SafeAreaView>
    );
}

const colors = {
    background: '#041219', // deeper dark navy
    card: '#072f36', // deep teal
    cardElev: 'rgba(0,0,0,0.6)',
    accentBlue: '#00ffff', // unified accent color
    accentGreen: '#1f7a3a', // deep green
    buttonBg: '#04232a',
    textPrimary: '#e6f7ff',
    textSecondary: '#97c9d6',
    muted: 'rgba(255,255,255,0.65)'
}

const styles = StyleSheet.create({
    langRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 12,
        gap: 12
    },

    flagButton: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: colors.card,
    },

    flag: {
        fontSize: 26
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: 12
    },
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 20, paddingBottom: 40 },
    headerCard: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 20,
        marginBottom: 18,
        // soft outer glow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)'
    },
    arabicText: {
        textAlign: 'center',
        writingDirection: 'rtl',
        fontSize: 26,
        color: colors.textPrimary,
        marginBottom: 12,
        lineHeight: 40,
        fontWeight: '700'
    },
    subtitle: {
        fontStyle: 'italic',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 6
    },
    smallTextGer: {
        fontStyle: 'normal',
        textAlign: 'center',
        fontSize: 12,
        color: colors.muted
    },
    smallTextEng: {
        fontStyle: 'normal',
        textAlign: 'center',
        fontSize: 14,
        color: colors.muted
    },
    smallTextQ: {
        fontStyle: 'normal',
        fontSize: 12,
        color: colors.muted,
        marginTop: 6
    },

    section: {
        marginBottom: 14,
        borderRadius: 14,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: colors.buttonBg,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 14,
        borderLeftWidth: 6,
        borderLeftColor: colors.accentBlue,
        // subtle elevated look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 6,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.998 }]
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary
    }
});

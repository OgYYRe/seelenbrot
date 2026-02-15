import React from "react";
import {Pressable, Text, View, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen({navigation}:  any ) {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerCard}>
                    <Text style={styles.arabicText}>اَلَا بِذِكْرِ اللّٰهِ تَطْمَئِنُّ الْقُلُوبُۜ</Text>

                    <Text style={styles.subtitle}>Kalpler, ancak Allah’ı anmakla huzur bulur.</Text>
                    <Text style={styles.smallText}>Die Herzen werden nur durch die Erwähnung Allahs ruhig.</Text>
                    <Text style={styles.smallText}>Hearts </Text>
                </View>

                <View style={styles.section}>
                    <Pressable onPress={()=> navigation.navigate('Recipe')} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.buttonText}>Malzemeleri ayarla</Text>
                    </Pressable>
                </View>


                <View style={styles.section}>
                <Pressable onPress={()=> navigation.navigate('Today')} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
                    <Text style={styles.buttonText}>Yemek Vakti</Text>
                </Pressable>
                </View>

                <View style={styles.section}>
                    <Pressable onPress={()=> navigation.navigate('Debug')} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.buttonText}>Debug Ekrani</Text>
                    </Pressable>
                </View>


                <View style={styles.section}>

                <Pressable onPress={()=> navigation.navigate('Settings')} style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.buttonText}>Ayarlar</Text>
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
    accentBlue: '#0f5b83', // slightly brighter deep blue
    accentGreen: '#1f7a3a', // deep green
    buttonBg: '#04232a',
    textPrimary: '#e6f7ff',
    textSecondary: '#97c9d6',
    muted: 'rgba(255,255,255,0.65)'
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 20, paddingBottom: 40 },
    headerCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 22,
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
    smallText: {
        fontStyle: 'normal',
        textAlign: 'center',
        fontSize: 14,
        color: colors.muted
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

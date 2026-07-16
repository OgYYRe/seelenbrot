import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Pdf from "react-native-pdf";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useTranslation} from "react-i18next";

type Props = {
    page: number;
};

export default function QuranPDFView({ page }: Props) {

    const {t} = useTranslation();
    const pdfSource = useMemo(() => {
        if (Platform.OS === "android") {
            return { uri: "bundle-assets://lastQ.pdf" };
        }

        return require("../../assets/lastQ.pdf");
    }, []);

    const safePage = useMemo(() => {
        const p = Math.floor(Number(page) || 1);
        if (p < 1) return 1;
        if (p > 604) return 604;
        return p;
    }, [page]);

    const [isFull, setIsFull] = useState(false);
    const [loading, setLoading] = useState(false);

    const insets = useSafeAreaInsets();


    const open = () => {
        setLoading(true);
        setIsFull(true);
    };

    const close = () => {
        setIsFull(false);
    };

    return (
        <View style={styles.previewBox}>
            <Pressable style={styles.previewTap} onPress={open}>
                <Text style={styles.previewText}>
                    {t("pdf_preview_open_page", {page})}
                </Text>
            </Pressable>

            <Modal visible={isFull} animationType="fade" onRequestClose={close}>
                <SafeAreaView style={styles.fullscreen}>
                    <View style={styles.contentWrapper}>
                        <View style={[styles.topBar, { top: insets.top }]} pointerEvents="box-none">

                        <Pressable onPress={close} style={styles.closeBtn} hitSlop={12}>
                                <Text style={styles.closeText}>X</Text>
                            </Pressable>
                        </View>
                        <Pdf
                            source={pdfSource}
                            page={safePage}
                            fitPolicy={0}
                            minScale={1}
                            maxScale={4}
                            enablePaging={true}
                            horizontal={true}
                            style={styles.fullPdf}
                            onLoadComplete={() => setLoading(false)}
                            onError={(e) => {
                                console.log("PDF error", e);
                                setLoading(false);
                            }}
                        />




                        {loading && (
                            <View
                                style={[
                                    StyleSheet.absoluteFill,
                                    styles.centeredOverlay,
                                ]}
                                pointerEvents="none"
                            >
                                <ActivityIndicator size="large" color={colors.accentBlue} />
                            </View>
                        )}
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const colors = {
    background: '#041219', // deep dark navy
    card: '#072f36', // deep teal
    accentBlue: '#00ffff',
    accentGreen: '#1f7a3a',
    textPrimary: '#e6f7ff',
    muted: 'rgba(255,255,255,0.65)'
}

const styles = StyleSheet.create({
    previewBox: {
        width: "100%",
        height: 64,
        backgroundColor: colors.card,
        borderRadius: 12,
        overflow: "hidden",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
        justifyContent: 'center'


    },
    previewTap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    previewText: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: '600'
    },
    fullscreen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentWrapper: {
        flex: 1,
    },
    fullPdf: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.background,
    },
    closeBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(15,91,131,0.12)',
        justifyContent: "center",
        alignItems: "center",
    },
    closeText: {
        color: colors.textPrimary,
        fontSize: 18,
        fontWeight: '700'
    },
    topBar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        backgroundColor: 'transparent',
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 12,
        zIndex: 999,
    },
    centeredOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

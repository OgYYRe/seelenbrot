import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    page: number;
};

export default function QuranPDFView({ page }: Props) {
    const pdfSource = require("../../assets/lastQ.pdf");

    const safePage = useMemo(() => {
        const p = Math.floor(Number(page) || 1);
        if (p < 1) return 1;
        if (p > 604) return 604;
        return p;
    }, [page]);

    const [isFull, setIsFull] = useState(false);
    const [loading, setLoading] = useState(false);

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
                <Text style={styles.previewText}>{page}. sayfayi acmak icin tikla</Text>
            </Pressable>

            <Modal visible={isFull} animationType="fade" onRequestClose={close}>
                <SafeAreaView style={styles.fullscreen}>
                    <View style={{ flex: 1 }}>
                        <Pdf
                            source={pdfSource}
                            page={safePage}
                            singlePage
                            fitPolicy={0}
                            minScale={1}
                            maxScale={4}
                            enablePaging={false}
                            style={styles.fullPdf}
                            onLoadComplete={() => setLoading(false)}
                            onError={(e) => {
                                console.log("PDF error", e);
                                setLoading(false);
                            }}
                        />

                        <Pressable onPress={close} style={styles.closeBtn}>
                            <Text style={styles.closeText}>X</Text>
                        </Pressable>

                        {loading && (
                            <View
                                style={[
                                    StyleSheet.absoluteFill,
                                    { justifyContent: "center", alignItems: "center" },
                                ]}
                                pointerEvents="none"
                            >
                                <ActivityIndicator size="large" />
                            </View>
                        )}
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    previewBox: {
        width: "50%",
        height: 50,
        backgroundColor: "#000",
        borderRadius: 12,
        overflow: "hidden",
        alignSelf: "center",


    },
    previewTap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    previewText: {
        color: "#fff",
        fontSize: 14,
    },
    fullscreen: {
        flex: 1,
        backgroundColor: "black",
    },
    fullPdf: {
        flex: 1,
        width: "100%",
    },
    closeBtn: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    closeText: {
        color: "#fff",
        fontSize: 18,
    },
});

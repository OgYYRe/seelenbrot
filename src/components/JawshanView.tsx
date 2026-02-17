import React, { JSX, useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { BAB_MAP } from "../../assets/Jawshan/";
import {useTranslation} from "react-i18next";

type Props = { babNumber: number };

const colors = {
    textPrimary: '#e6f7ff',
    muted: 'rgba(255,255,255,0.65)'
}

export default function JawshanView({ babNumber }: Props): JSX.Element {

    const {t} = useTranslation();

    const [bab, setBab] = useState<any>(null);

    useEffect(() => {
        setBab(BAB_MAP[babNumber] ?? null);
    }, [babNumber]);

    if (!bab) {
        return <Text style={styles.missing}>
            {t("jawshan_bab_missing", { number: babNumber })}
        </Text>;
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{bab.title}</Text>

            <ScrollView style={styles.scroll}>
                <Text
                    selectable
                    style={styles.text}
                >
                    {bab.text}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginTop: 12 },
    title: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: colors.textPrimary },
    scroll: { maxHeight: 420 },
    text: { fontSize: 22, lineHeight: 40, textAlign: 'right', writingDirection: 'rtl', color: colors.textPrimary },
    missing: { color: colors.muted }
});

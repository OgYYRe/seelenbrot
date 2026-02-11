import React, { JSX, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { BAB_MAP } from "../../assets/Cevsen";

type Props = { babNumber: number };

export default function JawshanView({ babNumber }: Props): JSX.Element {
    const [bab, setBab] = useState<any>(null);

    useEffect(() => {
        setBab(BAB_MAP[babNumber] ?? null);
    }, [babNumber]);

    if (!bab) {
        return <Text>{babNumber}. bab bulunamadi</Text>;
    }

    return (
        <View style={{ marginTop: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
                {bab.title}
            </Text>

            <ScrollView>
                <Text
                    selectable
                    style={{
                        fontSize: 22,
                        lineHeight: 40,
                        textAlign: "right",
                        writingDirection: "rtl",
                    }}
                >
                    {bab.text}
                </Text>
            </ScrollView>
        </View>
    );
}

import React, {useMemo} from "react";
import {StyleSheet, View} from "react-native";
import Pdf from "react-native-pdf";

type Props = {
    page: number;
    totalPages?: number;
    source?: any;
};

export default function QuranPDFView({page, totalPages = 604, source}: Props) {
    const safePage = useMemo(() => {
        const p = Math.floor(Number(page) || 1);
        if (p < 1) return 1;
        if (p > totalPages) return totalPages;
        return p;
    }, [page, totalPages]);


    const pdfSource = source ?? require("../../assets/Q.pdf");

    return (
        <View style={styles.wrapper}>
            <Pdf
                source={pdfSource}
                page={safePage}
                singlePage={true}
                enablePaging={false}
                horizontal={false}
                spacing={0}
                scale={1}
                minScale={1}
                maxScale={1}
                style={styles.pdf}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {width: "100%", height: 520},
    pdf: {flex: 1, width: "100%"},
});

import React, {JSX, useEffect, useState} from "react";
import { ScrollView, Text } from "react-native";

export default function CevsenViewPage(): JSX.Element {
  const [text, setText] = useState("");

    useEffect(() => {
        const bab = require("../../assets/Cevsen/B001.json");
        const endings = require("../../assets/Cevsen/CevsenEnding.json");

        const fullText = bab.text + "\n\n" + (endings[bab.endingId] ?? "");

        setText(fullText);
    }, []);


    return (
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Cevsen Metni:
        </Text>

        <Text
            selectable
            style={{
              fontSize: 22,
              lineHeight: 40,
              textAlign: "right",
              writingDirection: "rtl",
              padding: 14,
              borderRadius: 12,
              backgroundColor: "#f2f2f2",
            }}
        >
          {text}
        </Text>

      </ScrollView>

  );
}

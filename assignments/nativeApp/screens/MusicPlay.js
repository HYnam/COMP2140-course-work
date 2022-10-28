import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import { colors } from "../data/theme";

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.purpleColorLighter
    },
    textPar: {
        fontSize: 20, 
        color: colors.purpleColorLighter
    }
});

export default function MusicPlay({ navigation }) {
    return (
        <SafeAreaView>
            <Text style={styles.textHeader}>
                No Music Nearby
            </Text>
            <Text style={styles.textPar}>
                It's Oh So Quiet... 
            </Text>
        </SafeAreaView>
    );
}
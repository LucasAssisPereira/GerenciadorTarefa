import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Gerenciador de Tarefas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 20,
    },
    headerText: {
        color: '#000', 
        fontWeight: 'bold', 
        fontSize: 18,
    },
});

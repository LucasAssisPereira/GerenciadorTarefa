import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem("tasks");
            if (savedTasks) setTasks(JSON.parse(savedTasks));
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
        }
    };

    const saveTasks = async (newTasks) => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
            setTasks(newTasks);
        } catch (error) {
            console.error("Erro ao salvar tarefas:", error);
        }
    };

    const onAddTask = () => {
        if (task.trim()) {
            if (isEditing && editTaskId) {
                const updatedTasks = tasks.map((item) => 
                    item.id === editTaskId ? { ...item, text: task } : item
                );
                saveTasks(updatedTasks);
                setIsEditing(false);
                setEditTaskId(null);
            } else {
                const newTask = { id: Date.now().toString(), text: task };
                const updatedTasks = [...tasks, newTask];
                saveTasks(updatedTasks);
            }
            setTask("");
        }
    };

    const onEditTask = (id, currentText) => {
        setTask(currentText);
        setIsEditing(true);
        setEditTaskId(id);
    };

    const onRemoveTask = (id) => {
        const updatedTasks = tasks.filter((item) => item.id !== id);
        saveTasks(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text style={styles.task}>{item.text}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => onEditTask(item.id, item.text)} style={styles.editButton}>
                                <Icon name="edit" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onRemoveTask(item.id)} style={styles.deleteButton}>
                                <Icon name="remove" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <TextInput
                style={styles.input}
                placeholder="Digite uma nova tarefa"
                value={task}
                onChangeText={setTask}
            />
            <Button title={isEditing ? "Salvar Alterações" : "Adicionar Tarefa"} onPress={onAddTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f8f8"
    },
    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    task: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    editButton: {
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 5,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import Logo from '@/assets/images/logo.png';
import Feather from '@expo/vector-icons/Feather';
import { Counter } from "@/components/Counter";
import { Colors } from "@/constants/Colors";
import Animated, { interpolateColor, Layout, LinearTransition, useAnimatedStyle, useSharedValue, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";
import { ItemCard } from "@/components/ItemCard";
import { useState } from "react";
import { EmptyList } from "@/components/EmptyList";
import { Fonts } from "@/constants/Fonts";

export function Home() {
    const [text, setText] = useState('')
    const [list, setList] = useState([
        {
            id: 1,
            checked: false,
            title: 'Fazer Café'
        }
    ])

    const animation = useSharedValue(0)

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

    const styleAnimdated = useAnimatedStyle(() => ({
        borderColor: interpolateColor(animation.value, [0, 100], [Colors.gray_700, Colors.purple_dark])
    }))

    function onFocus() {
        animation.value = withTiming(100)
    }

    function onBlur() {
        animation.value = withTiming(0)
    }

    function handleCheck(id: number) {
        const item = list.find(item => item.id == id)
        if (item) {
            item.checked = !item.checked
            const newList = list.filter(item => item.id !== id)
            setList([...newList, item])
        }
    }

    function handleAddItem() {
        const newItem = {
            id: Date.now(),
            checked: false,
            title: text
        }

        setText('')
        setList(state => [...state, newItem])
    }
    function handleRemoveItem(id: number) {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Logo} style={{ width: 110 }} />
            </View>

            <View style={styles.inputContent}>
                <Animated.View style={[styles.inputWrapper, styleAnimdated]}>
                    <TextInput
                        placeholder="Adicione uma nova tarefa"
                        style={styles.input}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholderTextColor="#808080"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </Animated.View>
                <TouchableOpacity style={styles.button} onPress={handleAddItem}>
                    <Feather name="plus-circle" size={18} color="white" />
                </TouchableOpacity>

            </View>

            <View style={styles.counterWrapper}>
                <Counter label="Criadas" value={list.length} />
                <Counter label="Concluídas" value={list.filter(item => item.checked).length} color={Colors.purple} />
            </View>

            <Animated.FlatList
                data={list}
                itemLayoutAnimation={LinearTransition}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
                ListEmptyComponent={
                    <EmptyList />
                }
                renderItem={({ item }) =>
                    <Animated.View
                        exiting={ZoomOut}
                        entering={ZoomIn}
                    >
                        <ItemCard
                            title={item.title}
                            checked={item.checked}
                            onValueChange={() => handleCheck(item.id)}
                            onRemove={() => handleRemoveItem(item.id)}
                        />
                    </Animated.View>
                }
            />
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray_600
    },

    header: {
        height: 173,
        backgroundColor: Colors.gray_700,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContent: {
        paddingHorizontal: 24,
        marginTop: -24,
        flexDirection: 'row',
        gap: 4
    },
    inputWrapper: {
        backgroundColor: Colors.gray_500,
        height: 54,
        padding: 16,
        borderRadius: 6,
        borderWidth: 1,
        flex: 1,
    },
    input: {
        fontFamily: Fonts.regular,
        color: Colors.gray_100,
    },
    button: {
        backgroundColor: '#1E6F9F',
        borderRadius: 6,
        height: 52,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterWrapper: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
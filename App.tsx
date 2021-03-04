import React from 'react'
import { Dimensions, FlatList, KeyboardAvoidingView, ListRenderItem, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

// false = single ScrollView surrounded by a KeyboardAvoidingView - vertical scrolling works on iOS with the keyboard open
// true = the above combo inside a horizontally paged FlatList - vertical scrolling doesn't work on iOS with keyboard open
const insideFlatList = true

const renderItem: ListRenderItem<number> = (info) => (
    <View key={info.index} style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? 'padding' : undefined}>
            <ScrollView style={styles.container}>
                <View style={styles.pagedItem} key={`${info.index}-item`}>
                    <Text style={styles.text}>{`Page ${info.item}`}</Text>
                    <TextInput style={styles.input}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
)

export default function App() {
    if (insideFlatList) {
        return (
            <FlatList style={styles.container} data={[1]}
                      renderItem={renderItem}
                      horizontal={true}
                      pagingEnabled={true}
            />
        )
    } else {
        return renderItem({ item: 1, index: 0, separators: { highlight: () => {}, unhighlight: () => {}, updateProps: () => {} } })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        margin: 20,
        paddingTop: 600,
        backgroundColor: 'red',

    },
    input: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        width: 200,
        margin: 20,
    },
    pagedItem: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

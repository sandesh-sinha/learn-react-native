import React from 'react'
import { View, Text } from 'react-native'

export default function Todo( {todo} ) {
    return (
        <View>
            <Text>{todo}</Text>
        </View>
    )
}

import React, { useState, useEffect } from 'react'

import { Text, SafeAreaView, SectionList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import ListItem, { Separator, SectionHeader } from "../components/ListItem"
import AddItem from "../components/AddItem"
import { useCurrentList } from "../util/ListManager"


export default ({ route, navigation }) => {
    console.log('Hello!');
    const { 
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favorited,
        addToFavorite
    } = useCurrentList();

    if (loading) {
        return (
            <SafeAreaView>
                {/* <ActivityIndicator size="large"/> */}
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior='padding'
            >
                <SectionList
                sections={[
                    {title: 'List', data: list},
                    {title: 'Cart', data: cart},
                ]}
                renderSectionHeader={({section}) => (
                    <SectionHeader title={section.title} />
                )}
                renderItem={({ item, index }) => (
                    <ListItem
                    name={item.name} 
                    onFavoritePress={() => addToFavorite(item.id)}
                    isFavorite={index < 2}
                    onAddedSwipe={() => addToCart(item)}
                    onDeleteSwipe={() => removeItem(item.id)}
                    onRowPress={() => {
                        navigation.navigate('ItemDetails', {item})
                    }}
                    />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Separator />}
                ListHeaderComponent={() => <AddItem 
                    onSubmitEditing={({ nativeEvent: { text }}) => addItem(text)}
                />
            }
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

};
import React, { useState, useEffect } from 'react'

import { Text, SafeAreaView, SectionList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { Separator, SectionHeader } from "../components/FavoriteItem"
import { useCurrentList } from "../util/ListManager"
import FavoriteItem from "../components/FavoriteItem"


export default ({ route, navigation }) => {
    console.log('Hello!');
    const { 
        loading,
        removeItem,
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
                    {title: 'Favorite', data: favorited}
                ]}
                renderSectionHeader={({section}) => (
                    <SectionHeader title={section.title} />
                )}
                renderItem={({ item, index }) => (
                    <FavoriteItem
                    name={item.name} 
                    onFavoritePress={() => addToFavorite(item.id)}
                    isFavorite={favorited}
                    onAddedSwipe={() => addToCart(item)}
                    onDeleteSwipe={() => removeItem(item.id)}
                    onRowPress={() => {
                        navigation.navigate('ItemDetails', {item})
                    }}
                    />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Separator />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

};
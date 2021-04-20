import React, { useEffect, useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator, SectionList } from 'react-native'

import FavoriteItem, { SectionHeader, Separator } from '../components/FavoriteItem'
import AddItem from '../components/AddItem'
import { useCurrentList } from '../util/ListManager';

export default ({ navigation }) => {
    const { list,
        loading,
        addItem,
        removeItem,
        addToCart,
        cart

    } = useCurrentList()


    if (loading) {
        return (<SafeAreaView>
            <Text>Loading...</Text>
        </SafeAreaView>)
    }

    console.log(cart);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>

                <SectionList
                    sections={[
                        { title: 'Favorited', data: favorited },
                    ]}
                    renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
                    renderItem={({ item, index }) => (
                        <FavoriteItem name={item.name}
                            onFavouritePress={() => console.log('favorited')}
                            isFavourite={index < 2}
                            onAddedSwipe={() => addToCart(item)}
                            onDeleteSwipe={() => removeItem(item.id)}
                            onRowPress={() => {
                                // navigation.navigate('ItemDetails')
                                navigation.navigate('ItemDetails', {
                                    item,
                                });
                            }}
                        />

                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator></Separator>}
                    ListHeaderComponent={() => <AddItem onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)} />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>)
};
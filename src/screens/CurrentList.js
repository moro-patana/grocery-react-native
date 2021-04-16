import React, { useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, SectionList } from 'react-native'
import {v4 as uuid } from 'uuid';
import nachos from '../data/nachos'
import ListItem, { Separator } from "../components/ListItem"
import AddItem from "../components/AddItem"
export default () => {
    console.log('Hello!');
    const [list, setList] = useState(nachos)
    const addItem = (text) => {
        setList([{id: uuid(), name: text}, ...list])
    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior='padding'
            >
                <FlatList
                data={list}
                renderItem={({ item, index }) => (
                    <ListItem
                    name={item.name} 
                    onFavoritePress={() => alert('todo: handle favorite!')}
                    isFavorite={index < 2}
                    onAddedSwipe={() => removeItem(item.id)}
                    onDeleteSwipe={() => removeItem(item.id)}
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
        // <SafeAreaView>
        //     <ScrollView>
        //         {nachos.map((item, index)=> (
        //             <React.Fragment key={item.id} >
        //                 <ListItem 
        //                 name={item.name} 
        //                 onFavoritePress={() => alert('todo: handle favorite!')}
        //                 isFavorite={index < 2}
        //                 />
        //                 <Separator/>
        //             </React.Fragment>
        //         ))}
        //     </ScrollView>
        // </SafeAreaView>

    )

};
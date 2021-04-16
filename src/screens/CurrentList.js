import React, { useState, useEffect } from 'react'

import { Text, SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
// import AsyncStorage from "@react-native-community/async-storage"
// import {v4 as uuid } from 'uuid';
import ListItem, { Separator } from "../components/ListItem"
import AddItem from "../components/AddItem"
import { useCurrentList } from "../util/ListManager"

// const updatStoredCurrentList = (list) => {
//     // Add an id to the file '@@GroceryList/currentList'
//     AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
// }
export default () => {
    console.log('Hello!');
    const { 
        list,
        loading,
        addItem,
        removeItem
    } = useCurrentList();
    // const [list, setList] = useState([])
    // const [loading, setLoading] = useState(true)

    // const addItem = (text) => {
    //     const newList = [{id: uuid(), name: text}, ...list]
    //     setList(newList)
    //     updatStoredCurrentList(newList)
    // }
    // const removeItem = (id) => {
    //     const newList = list.filter(item => item.id !== id)
    //     setList(newList)
    //     updatStoredCurrentList(newList)
    // }
    // useEffect(() => {
    //     setTimeout(() => {
    //         AsyncStorage.getItem('@@GroceryList/currentList')
    //          .then(data => JSON.parse(data))
    //          .then(data => {
    //              if(data) {
    //                  setList(data);
    //              }
    //              setLoading(false)
    //          })
    //     }, 1000)
    // }, [])

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
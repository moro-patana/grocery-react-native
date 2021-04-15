import React from 'react'

import { View, Text, SafeAreaView, ScrollView } from 'react-native'

import nachos from '../data/nachos'
import ListItem, { Separator } from "../components/ListItem"
export default () => {
    console.log('Hello!');
    return (
        <SafeAreaView>
            <ScrollView>
                {nachos.map((item, index)=> (
                    <React.Fragment key={item.id} >
                        <ListItem 
                        name={item.name} 
                        onFavoritePress={() => alert('todo: handle favorite!')}
                        isFavorite={index < 2}
                        />
                        <Separator/>
                    </React.Fragment>
                ))}
            </ScrollView>
        </SafeAreaView>

    )

};
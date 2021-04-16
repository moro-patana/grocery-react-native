import React, { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-community/async-storage"
import 'react-native-get-random-values'
import {v4 as uuid } from "uuid";

const updatStoredCurrentList = (list) => {
    // Add an id to the file '@@GroceryList/currentList'
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

export const useCurrentList = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const addItem = (text) => {
        const newList = [{id: uuid(), name: text}, ...list]
        setList(newList)
        updatStoredCurrentList(newList)
    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        updatStoredCurrentList(newList)
    }
    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('@@GroceryList/currentList')
             .then(data => JSON.parse(data))
             .then(data => {
                 if(data) {
                     setList(data);
                 }
                 setLoading(false)
             })
        }, 1000)
    }, [])

    return {
        list,
        loading,
        addItem,
        removeItem
    }
}
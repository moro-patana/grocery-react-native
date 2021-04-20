import React, { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-community/async-storage"
import 'react-native-get-random-values'
import {v4 as uuid } from "uuid";

const updateStoredCurrentList = (list) => {
    // Add an id to the file '@@GroceryList/currentList'
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}
const updateStoredCurrentCart = (cart) => {
    // Add an id to the file '@@GroceryList/currentList'
    AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(cart))
}
const updateStoredCurrentFavorite = (favoriteList) => {
    AsyncStorage.setItem('@@GroceryList/currentFavorite', JSON.stringify(favoriteList))
}

export const useCurrentList = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    const [favorited, setFavorited] = useState([])

    const addItem = (text) => {
        const newList = [{id: uuid(), name: text}, ...list]
        setList(newList)
        updateStoredCurrentList(newList)
    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        updateStoredCurrentList(newList)
    }

    const addToCart = (item) => {
        removeItem(item.id)
        const newCart = [item, ...cart]
        setCart(newCart)
        updateStoredCurrentCart(newCart)
    }
    console.log(cart);
    const addToFavorite = (item) => {
        // removeItem(item.id)
        const newFavorite = [item, ...favorited]
        setFavorited(newFavorite)
        updateStoredCurrentFavorite(newFavorite)
    }
    useEffect(() => {
        setTimeout(() => {
            Promise.all([
            AsyncStorage.getItem('@@GroceryList/currentList'),
            AsyncStorage.getItem('@@GroceryList/currentCart'),
            AsyncStorage.getItem('@@GroceryList/currentFavorite'),
        ])
             .then(([list, cartItems, favoriteList]) => [JSON.parse(list), JSON.parse(cartItems, JSON.parse(favoriteList))])
             .then(([list, cartItems, favoriteList]) => {
                 if(list) {
                     setList(list);
                 }
                 if(cartItems) {
                    setCart(cartItems);
                }
                if(favoriteList) {
                    setFavorited(favoriteList)
                }
                 setLoading(false)
             })
        }, 1000)
    }, [])

    return {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favorited,
        addToFavorite
    }
}
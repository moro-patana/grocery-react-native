import React from "react"
import { Text, Image, Platform } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CurrentList from "../screens/CurrentList"
import ItemDetails from "../screens/ItemDetails"
import FavoriteList from "../screens/FavoriteList"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CurrentListStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList}/>
                <Stack.Screen 
                name="ItemDetails" 
                component={ItemDetails}
                options={({ route }) => {
                    return {
                        headerTitle: () => {
                            return <Text>{route.params.item.name}</Text>
                        }
                    }
                }}
                />
            </Stack.Navigator>
    )
}
const FavoriteListStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="FavoriteList" component={FavoriteList}/>
            </Stack.Navigator>
    )
}

const TabsListStack = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let image;
                        const routeName  = route.name;
                        if(routeName === 'CurrentList') {
                            image = Platform.select({
                                ios: require('../assets/icons/ios-list.png'),
                                android: require('../assets/icons/md-list.png')
                            })
                        } else {
                            image = Platform.select({
                                ios: focused
                                ? require('../assets/icons/ios-star.png')
                                : require('../assets/icons/ios-star-outline.png'),
                                android: focused
                                ? require('../assets/icons/md-star.png')
                                : require('../assets/icons/md-star-outline.png')
                            })
                        }
                    
                        return <Image 
                        source={image}
                        resizeMode="contain"
                        style={{width: 25, tintColor: color}}
                       />
                    }
                })}>
                <Tab.Screen name="CurrentList" component={CurrentListStack}/>
                <Tab.Screen name="FavoriteList" component={FavoriteListStack}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabsListStack;
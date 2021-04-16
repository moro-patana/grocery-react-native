// import { createStackNavigator, createAppContainer } from "react-navigation"

// import currentList from "../screens/CurrentList"

// const CurrentListStack = createStackNavigator({
//     CurrentList: {
//         screen: currentList,
//     }
// })
// export default createAppContainer(CurrentListStack)
import React from "react"
import CurrentList from "../screens/CurrentList"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default CurrentListStack;
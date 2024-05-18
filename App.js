import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SplashScreen from 'react-native-splash-screen';
import DetailsScreen from './DetailsScreen';
import SearchScreen from './SearchScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import Icons from 'react-native-vector-icons/FontAwesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { StyleSheet } from 'react-native';
import NewNetflixDetailsScreen from './NewNetflixDetailsScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Main" component={MainScreen} />
                <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
                <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen} />
                <Stack.Screen options={{headerShown: false}} name="Details" component={DetailsScreen} />
                <Stack.Screen options={{headerShown: false}} name="NewNetflixDetails" component={NewNetflixDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function MainScreen() {
    return (
        <Tab.Navigator screenOptions={{
                                       tabBarStyle: { backgroundColor: 'black' },
                                       tabBarActiveTintColor: 'white',
                                   }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => {
                        return <FontAwesomeIcon icon={faHome} size={25} color='white' />
                    }
                }} // Closing curly brace was missing here
            />
            <Tab.Screen
                            name="Search"
                            component={SearchScreen}
                            options={{
                                headerShown: false,
                                tabBarIcon: () => {
                                    return <FontAwesomeIcon icon={faMagnifyingGlass} size={25} color='white' />
                                }
                            }}
                        />
        </Tab.Navigator>
    );
}



//import './shim.js';
import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { Cart, SignUp, SignIn, Transfer, Items } from './screens';

import Tabs from "./navigation/tabs";

//import Web3 from 'web3';
//const contract = require('truffle-contract');
//import eCampusCoinJson from './artifacts/eCampusCoin.json';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

const loadBlockchainData = async () => {
    const _provider = Web3.givenProvider || "http://localhost:9545"
        const _web3 = new Web3(_provider)

        const accounts = await _web3.eth.getAccounts()
        setAccountAddress( accounts[0] )
        // }
        //this.web3.eth.defaultAccount = accounts[0]

        const eCampusCoinContract = contract(eCampusCoinJson)
        eCampusCoinContract.setProvider( _provider )

        eCampusCoinContract.deployed().then((instance) => {
            setContractInstance( instance )
        })
        console.log(accounts[0]);
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    } 
}

const Stack = createStackNavigator()

const App = () => {
    React.useEffect(() => {
        console.log("useEffect");
        //loadBlockchainData();
    }, [])

    return (
        <Provider store={store}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'SignUp'}
                >
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="Transfer" component={Transfer} />
                    <Stack.Screen name="Items" component={Items} />

                    {/* Tabs */}
                    <Stack.Screen name="Tabs" component={Tabs} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;
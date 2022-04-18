import './shim.js';
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

import Web3 from 'web3';

//const contract = require('truffle-contract');
//import eCampusCoinJson from './artifacts/eCampusCoin.json';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

const loadBlockchainData = async () => {
    // const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:9545")
    // const accounts = await web3.eth.getAccounts()
    // //this.setState({ account: accounts[0] })
    // console.log(accounts[0]);

    const web3 = new Web3('HTTP://127.0.0.1:9545');
    const newWallet = web3.eth.accounts.wallet.create(1);
    const newAccount = newWallet[0];
    console.log(newAccount);
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
    //const [account, setAccount] = React.useState('');
    React.useEffect(() => {
        console.log("useEffect");
        loadBlockchainData();
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
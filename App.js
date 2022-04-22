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
import Toast from 'react-native-toast-message';

import Web3 from 'web3';
const Contract = require('web3-eth-contract');
const contractInterface = require('./artifacts/eCampusCoin.json');

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

const loadBlockchainData = async () => {
    // Initialise web3\
    // let web3;
    // if (typeof web3 !== "undefined") {
    //     web3 = new Web3(web3.currentProvider);
    // } else {
    //     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    // }

    // const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:9545');
    // const newWallet = web3.eth.accounts.wallet.create(1);
    // const newAccount = newWallet[0];
    // console.log(newAccount);
    
    const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:9545');
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    console.log(web3.eth.getBalance(accounts[0]));

    // console.log("Hello");
    // console.log(web3.eth.accounts);


    // set provider for all later instancesto use
    //Contract.setProvider(Web3.givenProvider || 'HTTP://127.0.0.1:9545');

    //contract = new Contract(contractInterface, newAccount.address);

    console.log("Hello World");
    //console.log(await web3.eth.getBalance(newAccount.address));

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
        loadBlockchainData();
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
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </NavigationContainer>
        </Provider>
    )
}

export default App;
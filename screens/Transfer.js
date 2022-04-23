import React from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import { Header, IconButton } from "../components";
import { FONTS, SIZES, COLORS, icons, dummyData } from "../constants";

const Contract = require('web3-eth-contract');
const contractInterface = require('./../artifacts/eCampusCoin.json');
import Web3 from 'web3';

const Transfer = ({navigation}) => {

    const [receiverAddress, setReceiverAddress] = React.useState("");
    const [enteredAmount, setEnteredAmount] = React.useState("");
    const [currentUserAccount, setCurrentUserAccount] = React.useState("");
    const [balance, setBalance] = React.useState(0);
    const [contract, setContract] = React.useState();

    const loadAccounts = async () => {
        const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:9545');

        Contract.setProvider(Web3.givenProvider || 'HTTP://127.0.0.1:9545');
        const cont = new Contract(contractInterface.abi, "0xB6484f873373B881B363A8a8c723f40B13dE7aa2");
        setContract(cont);

        const accounts = await web3.eth.getAccounts();
        //web3.eth.defaultAccount = accounts[0];
        setCurrentUserAccount(accounts[1]);
        cont.methods.balanceOf(currentUserAccount).call((error, result) => {
            setBalance(result);
            console.log(result, error);
        })
    }


    React.useEffect( () =>  {
        console.log("useEffect - Home");
        loadAccounts();
        //updateBalance();
        
    }, [])

    function renderHeader() {
        return (
            <Header
                title="Transfer Coins"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 40 
                }}
                leftComponent={
                    <IconButton
                        icon={icons.back1}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.gray
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                        onPress={() => navigation.goBack()}
                    />
                }
            />
        )
    }

    function renderBanner() {
        return (
            <View
                style={{
                    height: 120,
                    borderRadius: 20,
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                    marginLeft: 20,
                    marginTop: 20
                    
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h5
                    }}
                >Your Balance</Text>
                <Text
                    style={{
                        marginTop: SIZES.base,
                        color: COLORS.white,
                        ...FONTS.h1
                    }}
                >{balance} ⓔ</Text>
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3
                }}
            >

                {/* Email Address */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Address</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.black,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Receiving Address"
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.black}
                        onChangeText={(text) => setReceiverAddress(text)}
                    />
                </View>

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Amount</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.black,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Amount"
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.black}
                        onChangeText={(text) => setEnteredAmount(text)}
                    />
                </View>

                

            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={() => {
                        contract.methods.transfer(/*currentUserAccount, */receiverAddress, enteredAmount/*,currentUserAccount*/).send( {from: currentUserAccount}, (error, result) => {
                            console.log(receiverAddress);
                            console.log(enteredAmount);
                            //setBalance(result);
                            console.log(result, error);
                            loadAccounts();
                        })

                        //navigation.navigate("Home")
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Send</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white

            }}
        >
            {/* Header */}
            {renderHeader()}

            {renderBanner()}

            {renderForm()}

            {renderButton()}


            
        </View>
    )
}

export default Transfer;
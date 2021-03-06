import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";

import baseURL from "../assets/common/baseURL";
import axios from "axios";

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignUp = ({navigation}) => {

    const [showPassword, setShowPassword] = React.useState(false)
    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [walletAddress, setWalletAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    /*React.useEffect(() => {
        
        return () => {
            setPassword("");
            setConfirmPassword("");
        }
    }, [])*/

    /*
    {
        "name": "Sameed",
        "email": "i18@gmail.com",
        "password": "123456"
    }


    {
        "productSchema": {
            "name": "Sameed",
            "email": "i18@gmail.com",
            "password": "123456"  
        },
        "quantity": 4
    }

    */

    const validateSignUp = () => {
        if (fullName !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                let user = {
                    name: fullName,
                    email: email,
                    password: password
                }
                axios.post(`${baseURL}/users/register`, user)
                .then((res) => {
                    if (res.status == 200) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Registered Successfully",
                            text2: "Now you can login into your account"
                        });
                        setTimeout(() => {
                            navigation.navigate("SignIn");
                        });
                    }
                    console.log(res.data);
                })
            } else {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Registeration Failed",
                    text2: "Password Not Matched"
                });
                console.log("Error in SignUp - Password Not Matched");
            }  
        } else {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Registeration Failed",
                text2: "Please complete all fields"
            });
            console.log("Error in Signup - Complete All Fields");
        }
    }

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2                                         
                }}
                onPress={() => navigation.navigate("SignIn")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white,
                    ...FONTS.h4 }}>Sign In</Text>
            </TouchableOpacity>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Image
                    source={images.ec1}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />

            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 1,
                    marginHorizontal: SIZES.padding * 3
                }}
            >
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Full Name</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Full Name"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        onChangeText={(text) => setFullName(text)}
                    />
                </View>

                {/* Email Address */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Email Address</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Email Address"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                {/* Wallet Address */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Wallet Address</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Wallet Address"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Password</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword }
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Confirm Password</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Repeat Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword }
                        onChangeText={(text) => setConfirmPassword(text)}
                    />

                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
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
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={validateSignUp}
                    /*onPress={() => navigation.navigate("SignIn")}*/
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding": null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>

            </LinearGradient>

        </KeyboardAvoidingView>
    )
}

export default SignUp;
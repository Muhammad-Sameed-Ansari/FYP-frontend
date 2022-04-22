import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Modal
} from 'react-native'
import Toast from 'react-native-toast-message';
import { BlurView } from "@react-native-community/blur";

import baseURL from "../assets/common/baseURL";
import axios from "axios";

import { Header, IconButton, CartQuantityButton, StepperInput } from "../components";

import { images, icons, COLORS, FONTS, SIZES, dummyData } from '../constants';

import { connect } from 'react-redux';
import * as actions from '../Redux/Actions/cartActions';

const Items = ({ route, navigation, addItemToCart }) => {

    const { user_id } = route.params;

    const [showAddToBagModal, setShowAddToBagModal] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [userEnteredQuantity, setUserEnteredQuantity] = React.useState(1);
    const [addToBagItems, setAddToBagItems] = React.useState([]);

    const [recentlyViewed, setRecentlyViewed] = React.useState([]);
    
    React.useEffect(() => {
        axios.get(`${baseURL}/products`)
        .then((res) => {
            setRecentlyViewed(res.data);
        })
        return () => {
            setRecentlyViewed([]);
        }
    }, [])

    function addToCart(productId, userQuantity) {
        /*let newItem = {
            quantity: userQuantity,
            product: productId
        }

        setAddToBagItems([...addToBagItems, newItem]);*/
        props.addItemToCart({productId, userQuantity});
    }

    function goToCart() {
        /*if (addToBagItems.length > 0) {
            let order = {
                orderItems: addToBagItems,
                user: user_id
            }
    
            axios.post(`${baseURL}/orders`, order)
            .then((res) => {
                if (res.status == 200) {
                    console.log("Success! Order Added to Database");
                    navigation.navigate("Cart", {user_id: user_id});
                }
            })
            .catch((err) => console.log(err))
        } else {
            console.log("No Items Added in Cart");
            navigation.navigate("Cart", {user_id: user_id});
        }*/
        navigation.navigate("Cart", {user_id: user_id});

    }

    // Render

    function renderHeader() {
        return (
            <Header
                title="Cafe Items"
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
                rightComponent={
                    <CartQuantityButton
                        quantity={3}
                    />
                }
            />
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
                    onPress={goToCart}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Go To Cart</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderRecentlyViewed(item, index) {
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
                onPress={() => {
                    setSelectedItem(item);
                    setShowAddToBagModal(true);
                    setUserEnteredQuantity(0);
                    console.log(item.id);
                    //console.log("item pressed");
                    //console.log(selectedItem);
                    //console.log(item);
                }}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image
                        source={item.img}
                        resizeMode="contain"
                        style={{
                            width: 130,
                            height: 100,
                        }}
                    />
                </View>
                <View style={{ flex: 1.5, marginLeft: SIZES.radius, justifyContent: "center" }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body2 }}>{item.name}</Text>
                    <Text style={{ ...FONTS.h4 }}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}

            <View
                style={[{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    padding: 30,
                    borderRadius: 30,
                    backgroundColor: COLORS.white
                }, styles.recentContainerShadow]}
            >
                <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={recentlyViewed}
                        keyExtractor={item => item._id/*.toString()*/}
                        renderItem={({ item, index }) => renderRecentlyViewed(item, index)}
                    />
                </View>
            </View>

            {selectedItem &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showAddToBagModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <BlurView
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                    >
                        {/* Button to close modal */}
                        <TouchableOpacity
                            style={styles.absolute}
                            onPress={() => {
                                setSelectedItem(null)
                                //setSelectedSize("")
                                setShowAddToBagModal(false)
                            }}
                        >
                        </TouchableOpacity>

                        {/* Modal content */}
                        <View style={{ justifyContent: 'center', width: "85%", backgroundColor: selectedItem.bgColor }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -SIZES.padding * 2 }}>
                                <Image
                                    source={selectedItem.img}
                                    resizeMode="contain"
                                    style={{
                                        width: "90%",
                                        height: 170,
                                        transform: [
                                            { rotate: '-15deg' }
                                        ]
                                    }}
                                />
                            </View>
                            <Text style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding, color: COLORS.white, ...FONTS.body2 }}>{selectedItem.name}</Text>
                            <Text style={{ marginTop: SIZES.base / 2, marginHorizontal: SIZES.padding, color: COLORS.white, ...FONTS.body3 }}>{selectedItem.category}</Text>
                            <Text style={{ marginTop: SIZES.radius, marginHorizontal: SIZES.padding, color: COLORS.white, ...FONTS.h1 }}>{selectedItem.price}</Text>
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius, marginHorizontal: SIZES.padding }}>
                                <StepperInput
                                    containerStyle={{
                                        height: 50,
                                        width: 125,
                                        backgroundColor: COLORS.white
                                    }}
                                    value={userEnteredQuantity}
                                    onAdd={() => setUserEnteredQuantity(userEnteredQuantity+1)}
                                    onMinus={() => {
                                        if (userEnteredQuantity > 1) {
                                            setUserEnteredQuantity(userEnteredQuantity-1)
                                        }
                                    }}
                                />
                            </View>

                            <TouchableOpacity
                                style={{ width: '100%', height: 70, marginTop: SIZES.base, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
                                onPress={() => {
                                    setSelectedItem(null)
                                    //setSelectedSize("")
                                    setShowAddToBagModal(false)
                                    //addToCart(selectedItem.id, 2)
                                    console.log(selectedItem);
                                    addItemToCart(selectedItem, userEnteredQuantity);
                                    Toast.show({
                                        topOffset: 60,
                                        type: "success",
                                        text1: `${selectedItem.name} added to Cart`,
                                        text2: "Go to your cart to complete order"
                                    })
                                }}
                            >
                                <Text style={{ color: COLORS.white, ...FONTS.largeTitleBold }}>Add to Bag</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Modal>
            }
            {renderButton()}
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: COLORS.white
    },
    trendingShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    recentContainerShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product, q) => dispatch(actions.addToCart({quantity: q, product}))
    }
}

export default connect(null, mapDispatchToProps)(Items);
import React from "react"
import {
    View,
    Text,
    Image,
    StyleSheet
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-toast-message";

import baseURL from "../assets/common/baseURL";
import axios from "axios";

import { Header, IconButton, CartQuantityButton, StepperInput, FooterTotal } from "../components";
import { FONTS, SIZES, COLORS, icons, dummyData } from "../constants";

import { connect } from "react-redux";
import * as actions from '../Redux/Actions/cartActions';

const Cart = ({ route, navigation, cartItems, clearCart, removeFromCart }) => {

    const {user_id} = route.params;
    //const [cartList, setCartList] = React.useState(dummyData.myCart)
    const [cartList, setCartList] = React.useState(cartItems)
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [addToBagItems, setAddToBagItems] = React.useState([]);

    React.useEffect(() => {
        console.log("useEffect called");
        let total = 0;
        cartItems.map(x => {
            total += x.product.price * x.quantity;
            console.log(total)
        })
        setTotalPrice(total);
        return () => {
            setTotalPrice();
        }
    }, [])

    function placeOrder() {
        if (cartItems.length > 0) {
            let newCartItems = cartItems.map(x => {
                console.log(x.quantity);
                console.log(x.product.id);
                let newItem = {
                    quantity: x.quantity,
                    product: x.product.id
                }
                return newItem;
                //setAddToBagItems([...addToBagItems, {quantity: x.quantity, product: x.product.id}]);
                //console.log(addToBagItems);                
            })
            console.log(newCartItems);
            setAddToBagItems(newCartItems);
            console.log(addToBagItems);    

            let order = {
                orderItems: newCartItems,
                user: user_id
            }
            
            let orderPlaced = false;
            axios.post(`${baseURL}/orders`, order)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Placed Successfull",
                        text2: "You can get the Items from the counter"
                    });
                    console.log("Success! Order Added to Database");
                    orderPlaced = true;
                }
            })
            .catch((err) => console.log(err))

            if (orderPlaced) {
                clearCart();
                cartItems.map(x => {
                    let newProd = {
                        stockCount: x.quantity
                    }
                    axios.post(`${baseURL}/products/${x.product.id}`, newProd)
                    .then((res) => {
                        if (res.status == 200) {
                            console.log("Success! Product Updated In Database");
                            orderPlaced = true;
                        }
                    })
                    .catch((err) => console.log(err))
                })
            }
        } else {
            console.log("No Items Added in Cart");
            navigation.navigate("Cart", {user_id: user_id});
        }
    }

    // Handler

    function updateQuantityHandler(newQty, id) {
        const newCartList = cartList.map(cl => (
            cl.product.id === id ? { ...cl, quantity: newQty } : cl
        ))
        setCartList(newCartList)
        
    }

    function removeCartHandler(id, item) {
        const newCartList = [...cartList]

        const index = newCartList.findIndex(cart => cart.product.id === id)

        newCartList.splice(index, 1)
        setCartList(newCartList)
        removeFromCart(item)
    }

    // Render

    function renderCartItemOrText() {
        if (cartItems.length > 0) {
            {renderCartList}
        } else {
            {renderNoItemInCart}
        }
    }
    function renderNoItemInCart() {
        return (
            <Text
                style={{
                    textAlign: "center"
                }}>No Item Added To Cart</Text>            
        )
    }
 
    function renderHeader() {
        return (
            <Header
                title="Cafe Cart"
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
                            borderColor: COLORS.black
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

    function renderCartList() {
        if (cartItems.length > 0) { 
            return (
                <SwipeListView
                    data={cartList}
                    keyExtractor={item => `${item.product.id}`}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: SIZES.padding * 2
                    }}
                    disableRightSwipe={true}
                    rightOpenValue={-75}
                    renderItem={(data, rowMap) => (
                        <View
                            style={{
                                height: 100,
                                backgroundColor: COLORS.lightGray,
                                ...styles.cartItemContainer
                            }}
                        >
                            {/* Food Image*/}
                            <View
                                style={{
                                    width: 90,
                                    height: 100,
                                    marginLeft: -10
                                }}
                            >
                                <Image
                                    source={require("../assets/dummyData/hamburger.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        top: 10
                                    }}
                                />
                            </View>

                            {/* Food Info*/}
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <Text style={{ ...FONTS.body3 }}>{data.item.product.name}</Text>
                                <Text style={{ color: COLORS.primary, ...FONTS.h5}}>${data.item.product.price}</Text>
                            </View>

                            {/* Quantity */}
                            <StepperInput
                                containerStyle={{
                                    height: 50,
                                    width: 125,
                                    backgroundColor: COLORS.white
                                }}
                                value={data.item.quantity}
                                onAdd={() => updateQuantityHandler(data.item.quantity+1, data.item.product.id)}
                                onMinus={() => {
                                    if (data.item.quantity > 1) {
                                        updateQuantityHandler(data.item.quantity-1, data.item.product.id)
                                    }
                                }}
                            />
                        </View>
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <IconButton
                            containerStyle={{
                                flex: 1,
                                justifyContent: "flex-end",
                                backgroundColor: COLORS.red,
                                ...styles.cartItemContainer
                            }}
                            icon={icons.delete_icon}
                            iconStyle={{
                                marginRight: 10
                            }}
                            onPress={() => removeCartHandler(data.item.product.id, data.item)}
                        />
                    )}
                />
            )
        } else {
            return (
                <View
                    style={{
                        height: 100
                    }}>
                    <Text
                    style={{
                        textAlign: "center"
                    }}>No Item Added To Cart</Text>            
                </View>
                
            )
        }
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#c1ccd0"

            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Cart List */}
            {renderCartList()}

            {/* Footer */}
            <FooterTotal
                subTotal={totalPrice}
                serviceFee={0.00}
                total={totalPrice}
                onPress={placeOrder}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius
    }
})

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
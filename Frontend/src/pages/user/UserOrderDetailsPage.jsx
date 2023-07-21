import UserOrderDetailsComponent from './components/UserOrderDetailsComponent'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { loadScript } from "@paypal/paypal-js"

const UserOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userLoginRegister.userInfo)

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id)
        return data
    }

    const getOrder = async (orderId) => {
        const { data } = await axios.get("/api/orders/user/" + orderId)
        return data
    }

    const createPayPalOrderHandler = () => {
        console.log("createOrderHandler")
    }
    const onCancelHandler = () => {
        console.log("oncancelHandler")
    }
    const onApproveHandler = () => {
        console.log("onApproveHandler")
    }
    const onErrorHandler = () => {
        console.log("onErrorHandler")
    }

    const updateOrder  = async (orderId) => {
        const { data } = await axios.patch("/api/orders/paid/" + orderId)
        return data
    }

    const buttons = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
        return {
            createOrder: function(data, actions){
                // console.log(actions)
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: cartSubtotal,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: cartSubtotal
                                }
                            }
                        },
                        items: cartItems.map(product => {
                            return {
                                name: product.name,
                                unit_amount: {
                                    currency_code: "USD",
                                    value: product.price
                                },
                                quantity: product.quantity
                            }
                        })
                    }]
                })
            },
            onApprove: function(data, actions){
                return actions.order.capture().then(function(orderData) {
                    var transaction = orderData.purchase_units[0].payments.captures[0];
                    if (transaction.status === "COMPLETED" && Number(transaction.amount.value) === Number(cartSubtotal)) {
                        updateOrder(orderId)
                        .then((data) => {
                                console.log(data)
                                if (data.isPaid) {
                                    console.log(data.paidAt)
                                    updateStateAfterOrder(data.paidAt);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                });
            },
            oncancel: function(data, actions){
                console.log(actions)
            },
            onError: function(data, actions){
                console.log(actions)
            }
        } 
    }

    const loadPayPalScript = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
        loadScript({
            "client-id": "AcAuNeP15Vz3KxYjqoiEgOT2vfCV1m0IvMG5aaP0GaJsuZXnJRM4qNe2r1JhKDdwSpXQz4R7BPFtqHAT",
            currency: "USD",        // seller accepted currency code
        }).then(paypal => {
            // console.log(paypal) Buttons takes object as argument
            paypal.Buttons(buttons(cartSubtotal, cartItems, orderId, updateStateAfterOrder)).render("#paypal-container-element")
        }).catch(error => {
            console.log(error)
        })
    }

    return <UserOrderDetailsComponent
        userInfo={userInfo}
        getUser={getUser}
        getOrder={getOrder}
        loadPayPalScript={loadPayPalScript}
    />
}


export default UserOrderDetailsPage

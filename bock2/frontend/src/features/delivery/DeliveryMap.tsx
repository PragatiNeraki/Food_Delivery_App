// import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native'
// import React, { FunctionComponent, useEffect, useState } from 'react'
// import { useAuthStore } from '@state/authStore'
// import { confirmOrder, getOrderById, sendLiveOrderUpdates } from '@service/orderService'
// import { Colors, Fonts } from '@utils/Constants'
// import { ScrollView } from 'react-native-gesture-handler'
// import { RFValue } from 'react-native-responsive-fontsize'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import CustomText from '@components/ui/CustomText'
// import Geolocation from '@react-native-community/geolocation'
// import { CurrentRenderContext, useRoute } from '@react-navigation/native'
// import LiveHeader from '@features/map/LiveHeader'
// import LiveMap from '@features/map/LiveMap'
// import DeliveryDetails from '@features/map/DeliveryDetails'
// import OrderSummary from '@features/map/OrderSummary'
// import { hocStyles } from '@styles/GlobalStyles'
// import CustomButton from '@components/ui/CustomButton'



// const DeliveryMap:FunctionComponent = () => {

//     const user = useAuthStore(state => state.user)
//     const [orderData, setOrderData] = useState<any>(null)
//     const [loading, setLoading] = useState<boolean>(true)
//     const [myLocation, setMyLocation] = useState<any>(null)
//     const route = useRoute()

//     const orderDetails = route?.params as Record<string, any>
//     const {setCurrentOrder} = useAuthStore()
    

//     const fetchOrderDetails = async() => {
//         const data = await getOrderById(orderDetails?._id as any)
//         setOrderData(data)
//         setLoading(false)
//     }

//     useEffect(() => {
//         fetchOrderDetails()
//     }, [])

//     useEffect(() => {
//         const watchId = Geolocation.watchPosition(
//             async position => {
//                 const {latitude, longitude} = position.coords;
//                 setMyLocation({latitude, longitude});
//             },
//             (err) => console.log("Error Fetching GeoLoacation" , err),
//             { enableHighAccuracy: true, distanceFilter: 200},
//         );

//         return () => Geolocation.clearWatch(watchId)
//     },[]);

//     const acceptOrder = async() => {
//         const data = await confirmOrder(orderData?._id, myLocation)
//         if(data){
//             setCurrentOrder(data)
//             Alert.alert("Order Accepted, Grab your package")
//         } else {
//             Alert.alert("There was an error")
//         }
//         fetchOrderDetails()
//     }

//     const orderPickedUp = async() => {
//         const data = await sendLiveOrderUpdates(orderData?._id, myLocation, 'arriving')
//         if(data){
//             setCurrentOrder(data)
//             Alert.alert("Order Accepted, Grab your package")
//         } else {
//             Alert.alert("There was an error")
//         }
//         fetchOrderDetails()
//     }

//     const orderDelivered = async() => {
//         const data = await sendLiveOrderUpdates(orderData?._id, myLocation, 'delivered')
//         if(data){
//             setCurrentOrder(data)
//             Alert.alert("Woohoo! You made it!")
//         } else {
//             Alert.alert("There was an error")
//         }
//         fetchOrderDetails()
//     }

//     let message = "Start this order"
//     if(orderData?.deliveryPartner?._id == user?._id && orderData?.status==='confirmed'){
//         message = 'Grab your order'
//     }else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status==='arriving'){
//         message = 'Complete your order'
//     }
//     else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status==='delivered'){
//         message = 'Your milestone'
//     }
//     else if(orderData?.deliveryPartner?._id != user?._id && orderData?.status !='available'){
//         message = 'You missed it!'
//     }

//     useEffect(()=> {
//         async function sendLiveUpdates() {
//             if(orderData?.deliveryPartner?._id == user?._id
//                 && orderData?.status != 'delivered'
//                 && orderData?.status != 'cancelled'
//                 // && myLocation
//             ){
//                 await sendLiveOrderUpdates(orderData._id, myLocation, orderData?.status)
//                 fetchOrderDetails()
//             }
//         }
//         sendLiveUpdates();
//     }, [myLocation]);

//     if(loading){
//         return (
//             <View
//             style={[
//                 styles.container,
//                 {justifyContent: 'center',alignItems: 'center'}
//             ]}
//             >
//                 <ActivityIndicator color="#000" size="small" />

//             </View>
//         )
//     }
  

//     return (
//         <View style={styles.container}>
//             <LiveHeader type='Delivery' title={message} secondTitle='Delivery in 10 minutes' />
//             <ScrollView 
//             showsVerticalScrollIndicator = {false} 
//             contentContainerStyle={styles.scrollContent}>
//                 {orderData?.deliveryLocation && orderData?.pickupLocation && (

//                 <LiveMap 
//                 deliveryPersonLocation={
//                     orderData?.deliveryPersonLocation || myLocation
//                 }
//                 deliveryLocation={orderData?.deliveryLocation || null}
//                 hasAccepted={
//                     orderData?.deliveryPartner?._id == user?._id &&
//                     orderData?.status == 'confirmed'
//                 }
//                 hasPickedUp={orderData?.status == 'arriving'}
//                 pickupLocation={orderData?.pickupLocation || null}

//                  />
//                 )}

//                 <DeliveryDetails details={orderData?.customer} />
//                 <OrderSummary order={orderData} />


//                  <View style={styles.flexRow}>
//                     <View style={styles.iconContainer}>
//                         <Icon name='cards-heart-outline' color={Colors.disabled} size={RFValue(20)} />
//                     </View>

//                     <View style={{width: '82%'}}>
//                         <CustomText variant='h7' fontFamily={Fonts.SemiBold}>Do you like our app clone?</CustomText>
//                         <CustomText variant='h9' fontFamily={Fonts.SemiBold}>Hit Like and subscribe button! If you are enjoying comment your excitement</CustomText>
//                     </View>
//                  </View>

//                  <CustomText fontFamily={Fonts.SemiBold} variant='h6' style={{opacity: 0.6, marginTop: 20}}>
//                     Pragati x Blinkit
//                  </CustomText>
                

//             </ScrollView>

//             {orderData?.status != 'delivered' && orderData?.status != 'cancelled' &&
//                 <View style={[hocStyles.cartContainer, styles.btnContainer]}>
//                     {orderData?.status == 'available' && (
//                         <CustomButton 
//                         disabled={false}
//                         title='Accept Order'
//                         onPress={acceptOrder}
//                         loading={false}
//                         />
//                     )}
//                     {orderData?.status == 'confirmed' && 
//                     orderData?.deliveryPartner?._id === user?._id &&(
//                         <CustomButton 
//                         disabled={false}
//                         title='Order Picked Up'
//                         onPress={orderPickedUp}
//                         loading={false}
//                         />
//                     )}
//                     {orderData?.status == 'arriving' && 
//                     orderData?.deliveryPartner?._id === user?._id &&(
//                         <CustomButton 
//                         disabled={false}
//                         title='Delivered'
//                         onPress={orderDelivered}
//                         loading={false}
//                         />
//                     )}
//                 </View>
//             }
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.primary
//     },
//     scrollContent: {
//         paddingBottom: 150,
//         backgroundColor: Colors.backgroundSecondary,
//         padding: 15
//     },
//     flexRow:{
//         flexDirection: 'row',
//         alignItems:'center',
//         gap: 10,
//         width: '100%',
//         borderRadius: 15,
//         marginTop: 15,
//         paddingVertical: 10,
//         backgroundColor: '#fff',
//         padding: 10,
//         borderBottomWidth: 0.7,
//         borderColor: Colors.border
//     },
//     iconContainer:{
//         backgroundColor: Colors.backgroundSecondary,
//         borderRadius: 100,
//         padding: 10,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     btnContainer: {
//         padding:10
//     }
// })

// export default DeliveryMap


import { View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useAuthStore } from '@state/authStore';
import { confirmOrder, getOrderById, sendLiveOrderUpdates } from '@service/orderService';
import { Colors, Fonts } from '@utils/Constants';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@components/ui/CustomText';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';
import LiveHeader from '@features/map/LiveHeader';
import LiveMap from '@features/map/LiveMap';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummary from '@features/map/OrderSummary';
import { hocStyles } from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';

const DeliveryMap: FunctionComponent = () => {
    const user = useAuthStore(state => state.user);
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const route = useRoute();

    const orderDetails = route?.params as Record<string, any>;
    const { setCurrentOrder } = useAuthStore();

    const fetchOrderDetails = async () => {
        const data = await getOrderById(orderDetails?._id);
        setOrderData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                if (latitude && longitude) {
                    setMyLocation({ latitude, longitude });
                }
            },
            (err) => console.log("Error Fetching GeoLocation", err),
            { enableHighAccuracy: true, distanceFilter: 200 }
        );

        return () => Geolocation.clearWatch(watchId);
    }, []);

    const acceptOrder = async () => {
        if (!myLocation) {
            Alert.alert("Location Error", "Please enable location services.");
            return;
        }
        const data = await confirmOrder(orderData?._id, myLocation);
        if (data) {
            setCurrentOrder(data);
            Alert.alert("Order Accepted, Grab your package");
        } else {
            Alert.alert("There was an error");
        }
        fetchOrderDetails();
    };

    const orderPickedUp = async () => {
        if (!myLocation) {
            Alert.alert("Location Error", "Please enable location services.");
            return;
        }
        const data = await sendLiveOrderUpdates(orderData?._id, myLocation, 'arriving');
        if (data) {
            setCurrentOrder(data);
            Alert.alert("Order Picked Up, Heading to Delivery");
        } else {
            Alert.alert("There was an error");
        }
        fetchOrderDetails();
    };

    const orderDelivered = async () => {
        if (!myLocation) {
            Alert.alert("Location Error", "Please enable location services.");
            return;
        }
        const data = await sendLiveOrderUpdates(orderData?._id, myLocation, 'delivered');
        if (data) {
            setCurrentOrder(data);
            Alert.alert("Woohoo! You made it!");
        } else {
            Alert.alert("There was an error");
        }
        fetchOrderDetails();
    };

    let message = "Start this order";
    if (orderData?.deliveryPartner?._id === user?._id && orderData?.status === 'confirmed') {
        message = 'Grab your order';
    } else if (orderData?.deliveryPartner?._id === user?._id && orderData?.status === 'arriving') {
        message = 'Complete your order';
    } else if (orderData?.deliveryPartner?._id === user?._id && orderData?.status === 'delivered') {
        message = 'Your milestone';
    } else if (orderData?.deliveryPartner?._id !== user?._id && orderData?.status !== 'available') {
        message = 'You missed it!';
    }

    useEffect(() => {
        async function sendLiveUpdates() {
            if (
                orderData?.deliveryPartner?._id === user?._id &&
                orderData?.status !== 'delivered' &&
                orderData?.status !== 'cancelled' &&
                myLocation
            ) {
                await sendLiveOrderUpdates(orderData._id, myLocation, orderData?.status);
                fetchOrderDetails();
            }
        }
        sendLiveUpdates();
    }, [myLocation]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator color="#000" size="small" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LiveHeader type="Delivery" title={message} secondTitle="Delivery in 10 minutes" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {orderData?.deliveryLocation && orderData?.pickupLocation && myLocation && (
                    <LiveMap
                        deliveryPersonLocation={{
                            latitude: orderData?.deliveryPersonLocation?.latitute || myLocation.latitude,
                            longitude: orderData?.deliveryPersonLocation?.longitute || myLocation.longitude,
                        }}
                        deliveryLocation={{
                            latitude: orderData?.deliveryLocation?.latitute,
                            longitude: orderData?.deliveryLocation?.longitute,
                        }}
                        hasAccepted={orderData?.deliveryPartner?._id === user?._id && orderData?.status === 'confirmed'}
                        hasPickedUp={orderData?.status === 'arriving'}
                        pickupLocation={{
                            latitude: orderData?.pickupLocation?.latitute,
                            longitude: orderData?.pickupLocation?.longitute,
                        }}
                    />
                )}

                <DeliveryDetails details={orderData?.customer} />
                <OrderSummary order={orderData} />

                <View style={[hocStyles.cartContainer, styles.btnContainer]}>
                    {orderData?.status === 'available' && <CustomButton title="Accept Order" onPress={acceptOrder} disabled={false} loading={false} />}
                    {orderData?.status === 'confirmed' && orderData?.deliveryPartner?._id === user?._id && <CustomButton title="Order Picked Up" onPress={orderPickedUp} disabled={false} loading={false} />}
                    {orderData?.status === 'arriving' && orderData?.deliveryPartner?._id === user?._id && <CustomButton title="Delivered" onPress={orderDelivered} disabled={false} loading={false} />}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primary },
    scrollContent: { paddingBottom: 150, backgroundColor: Colors.backgroundSecondary, padding: 15 },
    btnContainer: { padding: 10 },
});

export default DeliveryMap;








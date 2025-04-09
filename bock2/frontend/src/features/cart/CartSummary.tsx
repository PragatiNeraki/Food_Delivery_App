// import {View,  StyleSheet, Image, TouchableOpacity} from 'react-native'
// import React, { FunctionComponent } from 'react'
// import { screenHeight, screenWidth } from '@utils/Scaling';
// import { Colors, Fonts } from '@utils/Constants';
// import CustomText from '@components/ui/CustomText';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { navigate } from '@utils/NavigationUtils';

// interface CartSummaryProps {
//     cartCount:number;
//     cartImage:string
// }

// const CartSummary:FunctionComponent<CartSummaryProps> = ({cartCount,cartImage}) => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.container}>
//                 <Image source={
//                     cartImage === null 
//                     ? require('@assets/icons/bucket.png')
//                     : {uri:cartImage}} 
//                     style = {styles.image}
//                     />
//                     <CustomText fontFamily={Fonts.SemiBold}>{cartCount} ITEM{cartCount > 1 ? 'S' : ''}</CustomText>

//                     <Icon name='arrow-drop-up' color={Colors.secondary} size={RFValue(25)} />
//             </View>

//             <TouchableOpacity
//             style={styles.btn}
//             activeOpacity={0.7}
//             onPress={()=>navigate("ProductOrder")}
//             >
//             <CustomText style={styles.btnText} fontFamily={Fonts.Medium}>Next</CustomText>
//             <Icon name='arrow-right' color='#fff' size={RFValue(25)} />
//             </TouchableOpacity>
//         </View>
//     )
// }

// const styles=StyleSheet.create({
//     container:{
//         justifyContent:'space-between',
//         alignItems:'center',
//         flexDirection:'row',
//         paddingHorizontal:screenWidth*0.05,
//         paddingBottom:screenHeight*0.03,
//         paddingTop:screenHeight*0.014
//     },
//     flexRowGap: {
//         alignItems:'center',
//         flexDirection:'row',
//         gap:screenWidth*0.03,
//     },
//     image: {
//         width:screenWidth*0.1,
//         height:screenWidth*0.1,
//         borderRadius: screenWidth*0.025,
//         borderColor: Colors.border,
//         borderWidth:1
//     },
//     btn : {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: screenHeight*0.01,
//         borderRadius: screenWidth* 0.025,
//         backgroundColor: Colors.secondary,
//         paddingHorizontal: screenWidth*0.1
//     },
//     btnText: {
//         marginLeft : screenWidth * 0.02,
//         color: '#fff'
//     }
// })


// export default CartSummary



// import React, { FunctionComponent, useState } from 'react';
// import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
// import { screenHeight, screenWidth } from '@utils/Scaling';
// import { Colors, Fonts } from '@utils/Constants';
// import CustomText from '@components/ui/CustomText';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { navigate } from '@utils/NavigationUtils';
// import UniversalAdd from '@components/ui/UniversalAdd'; // Assuming you have this component

// interface CartItem {
//     id: string;
//     name: string;
//     quantity: number;
//     price: number;
//     image: string;
// }

// interface CartSummaryProps {
//     cartCount: number;
//     cartItems: CartItem[]; // Ensure cartItems is required
//     onQuantityChange: (id: string, newQuantity: number) => void;
// }

// const CartSummary: FunctionComponent<CartSummaryProps> = ({ cartCount, cartItems, onQuantityChange }) => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const toggleExpansion = () => {
//         console.log("Toggle Expansion:", !isExpanded); // Debugging line
//         setIsExpanded(!isExpanded);
//     };

//     const renderItem = ({ item }: { item: CartItem }) => {
//         console.log("Rendering Item:", item); // Debugging line
//         return (
//             <View style={styles.itemContainer}>
//                 <Image source={{ uri: item.image }} style={styles.itemImage} />
//                 <View style={styles.itemDetails}>
//                     <CustomText numberOfLines={1} variant='h8' fontFamily={Fonts.Medium} style={styles.itemName}>
//                         {item.name}
//                     </CustomText>
//                     <CustomText variant='h9' style={styles.itemPrice}>
//                         ₹{item.price}
//                     </CustomText>
//                 </View>
//                 <View style={styles.quantityContainer}>
//                     <TouchableOpacity
//                         style={styles.quantityButton}
//                         onPress={() => onQuantityChange(item.id, item.quantity - 1)}
//                     >
//                         <Icon name="remove" size={RFValue(14)} color={Colors.secondary} />
//                     </TouchableOpacity>
//                     <CustomText fontFamily={Fonts.Medium} style={styles.quantityText}>
//                         {item.quantity}
//                     </CustomText>
//                     <TouchableOpacity
//                         style={styles.quantityButton}
//                         onPress={() => onQuantityChange(item.id, item.quantity + 1)}
//                     >
//                         <Icon name="add" size={RFValue(14)} color={Colors.secondary} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     };

//     console.log("Cart Items in CartSummary:", cartItems); // Debugging line

//     return (
//         <View style={styles.container}>
//             {/* Summary Bar */}
//             <TouchableOpacity style={styles.summaryContainer} onPress={toggleExpansion}>
//                 <Image
//                     source={require('@assets/icons/bucket.png')} // Use a generic cart icon
//                     style={styles.image}
//                 />
//                 <CustomText fontFamily={Fonts.SemiBold} style={styles.cartCountText}>
//                     {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
//                 </CustomText>
//                 <Icon name={isExpanded ? 'arrow-drop-down' : 'arrow-drop-up'} color={Colors.secondary} size={RFValue(20)} />
//             </TouchableOpacity>

//             {/* Expanded List of Items */}
//             {isExpanded && (
//                 <FlatList
//                     data={cartItems}
//                     renderItem={renderItem}
//                     keyExtractor={item => item.id}
//                     style={styles.list}
//                     contentContainerStyle={styles.listContent}
//                 />
//             )}

//             {/* Next Button */}
//             <View style={styles.nextButtonContainer}>
//                 <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => navigate("ProductOrder")}>
//                     <CustomText style={styles.btnText} fontFamily={Fonts.Medium}>Next</CustomText>
//                     <Icon name="arrow-right" color="#fff" size={RFValue(16)} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: screenWidth * 0.03, // Reduced padding
//         paddingBottom: screenHeight * 0.005, // Reduced padding
//         paddingTop: screenHeight * 0.005, // Reduced padding
//         backgroundColor: '#fff',
//         borderTopWidth: 1,
//         borderTopColor: Colors.border,
//     },
//     summaryContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: screenWidth * 0.02, // Reduced gap
//         width: '100%',
//         paddingVertical: screenHeight * 0.005, // Reduced padding
//     },
//     image: {
//         width: screenWidth * 0.08, // Reduced size
//         height: screenWidth * 0.08, // Reduced size
//         borderRadius: screenWidth * 0.02, // Reduced border radius
//     },
//     cartCountText: {
//         fontSize: RFValue(12), // Smaller font size
//     },
//     list: {
//         width: '100%',
//         marginTop: screenHeight * 0.005, // Reduced margin
//         backgroundColor: '#5cb235',
//         borderRadius: 8, // Reduced border radius
//     },
//     listContent: {
//         paddingVertical: 5, // Reduced padding
//     },
//     itemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 8, // Reduced padding
//         paddingVertical: 6, // Reduced padding
//         borderBottomWidth: 0.5,
//         borderBottomColor: Colors.border,
//     },
//     itemImage: {
//         width: 30, // Reduced size
//         height: 30, // Reduced size
//         borderRadius: 8, // Reduced border radius
//     },
//     itemDetails: {
//         flex: 1,
//         marginLeft: 8, // Reduced margin
//     },
//     itemName: {
//         fontSize: RFValue(12), // Smaller font size
//     },
//     itemPrice: {
//         fontSize: RFValue(10), // Smaller font size
//         color: Colors.secondary,
//     },
//     quantityContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 6, // Reduced gap
//     },
//     quantityButton: {
//         borderWidth: 1, // Add border
//         borderColor: '#000', // Black border
//         borderRadius: 4, // Rounded corners
//         padding: 4, // Padding inside the button
//     },
//     quantityText: {
//         fontSize: RFValue(12), // Smaller font size
//         marginHorizontal: 6, // Space between buttons and text
//     },
//     nextButtonContainer: {
//         width: '25%', // Smaller width
//         alignSelf: 'flex-end',
//         marginTop: screenHeight * 0.005, // Reduced margin
//     },
//     btn: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: screenHeight * 0.006, // Reduced padding
//         borderRadius: screenWidth * 0.02, // Reduced border radius
//         backgroundColor: Colors.secondary,
//         paddingHorizontal: screenWidth * 0.03, // Reduced padding
//     },
//     btnText: {
//         marginLeft: screenWidth * 0.01, // Reduced margin
//         color: '#fff',
//         fontSize: RFValue(12), // Smaller font size
//     },
// });

// export default CartSummary;


// import React, { FunctionComponent, useState } from 'react';
// import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
// import { screenHeight, screenWidth } from '@utils/Scaling';
// import { Colors, Fonts } from '@utils/Constants';
// import CustomText from '@components/ui/CustomText';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { navigate } from '@utils/NavigationUtils';
// import UniversalAdd from '@components/ui/UniversalAdd'; // Assuming you have this component

// interface CartItem {
//     id: string;
//     name: string;
//     quantity: number;
//     price: number;
//     image: string;
// }

// interface CartSummaryProps {
//     cartCount: number;
//     cartItems: CartItem[]; // Ensure cartItems is required
//     onQuantityChange: (id: string, newQuantity: number) => void;
// }


// const CartSummary: FunctionComponent<CartSummaryProps> = ({ cartCount, cartItems, onQuantityChange }) => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const toggleExpansion = () => {
//         console.log("Toggle Expansion:", !isExpanded); // Debugging line
//         setIsExpanded(!isExpanded);
//     };

//     const renderItem = ({ item }: { item: CartItem }) => {
//         console.log("Rendering Item:", item); // Debugging line
//         return (
//             <View style={styles.itemContainer}>
//                 <Image source={{ uri: item.image }} style={styles.itemImage} />
//                 <View style={styles.itemDetails}>
//                     <CustomText numberOfLines={1} variant='h8' fontFamily={Fonts.Medium} style={styles.itemName}>
//                         {item.name}
//                     </CustomText>
//                     <CustomText variant='h9' style={styles.itemPrice}>
//                         ₹{item.price}
//                     </CustomText>
//                 </View>
//                 <View style={styles.quantityContainer}>
//                     <TouchableOpacity
//                         style={styles.quantityButton}
//                         onPress={() => onQuantityChange(item.id, item.quantity - 1)}
//                     >
//                         <Icon name="remove" size={RFValue(14)} color="#000" /> {/* Changed color to black */}
//                     </TouchableOpacity>
//                     <CustomText fontFamily={Fonts.Medium} style={styles.quantityText}>
//                         {item.quantity}
//                     </CustomText>
//                     <TouchableOpacity
//                         style={styles.quantityButton}
//                         onPress={() => onQuantityChange(item.id, item.quantity + 1)}
//                     >
//                         <Icon name="add" size={RFValue(14)} color="#000" /> {/* Changed color to black */}
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     };

//     console.log("Cart Items in CartSummary:", cartItems); // Debugging line

//     return (
//         <View style={styles.container}>
//             {/* Summary Bar */}
//             <TouchableOpacity style={styles.summaryContainer} onPress={toggleExpansion}>
//                 <Image
//                     source={require('@assets/icons/bucket.png')} // Use a generic cart icon
//                     style={styles.image}
//                 />
//                 <CustomText fontFamily={Fonts.SemiBold} style={styles.cartCountText}>
//                     {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
//                 </CustomText>
//                 <Icon name={isExpanded ? 'arrow-drop-down' : 'arrow-drop-up'} color={Colors.secondary} size={RFValue(20)} />
//             </TouchableOpacity>

//             {/* Expanded List of Items */}
//             {isExpanded && (
//                 <FlatList
//                     data={cartItems}
//                     renderItem={renderItem}
//                     keyExtractor={item => item.id}
//                     style={styles.list}
//                     contentContainerStyle={styles.listContent}
//                 />
//             )}

//             {/* Next Button */}
//             <View style={styles.nextButtonContainer}>
//                 <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => navigate("ProductOrder")}>
//                     <CustomText style={styles.btnText} fontFamily={Fonts.Medium}>Next</CustomText>
//                     <Icon name="arrow-right" color="#fff" size={RFValue(16)} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: screenWidth * 0.03, // Reduced padding
//         paddingBottom: screenHeight * 0.005, // Reduced padding
//         paddingTop: screenHeight * 0.005, // Reduced padding
//         backgroundColor: '#fff',
//         borderTopWidth: 1,
//         borderTopColor: Colors.border,
//     },
//     summaryContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: screenWidth * 0.02, // Reduced gap
//         width: '100%',
//         paddingVertical: screenHeight * 0.005, // Reduced padding
//     },
//     image: {
//         width: screenWidth * 0.08, // Reduced size
//         height: screenWidth * 0.08, // Reduced size
//         borderRadius: screenWidth * 0.02, // Reduced border radius
//     },
//     cartCountText: {
//         fontSize: RFValue(12), // Smaller font size
//     },
//     list: {
//         width: '100%',
//         marginTop: screenHeight * 0.005, // Reduced margin
//         backgroundColor: '#5cb235',
//         borderRadius: 8, // Reduced border radius
//     },
//     listContent: {
//         paddingVertical: 5, // Reduced padding
//     },
//     itemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 8, // Reduced padding
//         paddingVertical: 6, // Reduced padding
//         borderBottomWidth: 0.5,
//         borderBottomColor: Colors.border,
//     },
//     itemImage: {
//         width: 30, // Reduced size
//         height: 30, // Reduced size
//         borderRadius: 8, // Reduced border radius
//     },
//     itemDetails: {
//         flex: 1,
//         marginLeft: 8, // Reduced margin
//     },
//     itemName: {
//         fontSize: RFValue(12), // Smaller font size
//     },
//     itemPrice: {
//         fontSize: RFValue(10), // Smaller font size
//         color: Colors.secondary,
//     },
//     quantityContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 6, // Reduced gap
//     },
//     quantityButton: {
//         borderWidth: 1, // Add border
//         borderColor: '#000', // Black border
//         borderRadius: 4, // Rounded corners
//         padding: 4, // Padding inside the button
//         backgroundColor: '#f0f0f0', // Light gray background for better contrast
//     },
//     quantityText: {
//         fontSize: RFValue(12), // Smaller font size
//         marginHorizontal: 6, // Space between buttons and text
//     },
//     nextButtonContainer: {
//         width: '25%', // Smaller width
//         alignSelf: 'flex-end',
//         marginTop: screenHeight * 0.005, // Reduced margin
//     },
//     btn: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: screenHeight * 0.006, // Reduced padding
//         borderRadius: screenWidth * 0.02, // Reduced border radius
//         backgroundColor: Colors.secondary,
//         paddingHorizontal: screenWidth * 0.03, // Reduced padding
//     },
//     btnText: {
//         marginLeft: screenWidth * 0.01, // Reduced margin
//         color: '#fff',
//         fontSize: RFValue(12), // Smaller font size
//     },
// });

// export default CartSummary;

import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '@utils/Scaling';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigate } from '@utils/NavigationUtils';

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

interface CartSummaryProps {
    cartCount: number;
    cartItems: CartItem[]; // Ensure cartItems is required
    onQuantityChange: (id: string, newQuantity: number) => void;
}

const CartSummary: FunctionComponent<CartSummaryProps> = ({ cartCount, cartItems, onQuantityChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        console.log("Toggle Expansion:", !isExpanded); // Debugging line
        setIsExpanded(!isExpanded);
    };

    const renderItem = ({ item }: { item: CartItem }) => {
        console.log("Rendering Item:", item); // Debugging line
        const itemTotalPrice = item.price * item.quantity; // Calculate price for the item

        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <CustomText numberOfLines={1} variant='h8' fontFamily={Fonts.Medium} style={styles.itemName}>
                        {item.name}
                    </CustomText>
                    <CustomText variant='h9' style={styles.itemPrice}>
                        ₹{item.price} {/* Display individual item price */}
                    </CustomText>
                    <CustomText variant='h9' style={styles.itemTotalPrice}>
                        ₹{itemTotalPrice.toFixed(2)} {/* Display total price for the item */}
                    </CustomText>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onQuantityChange(item.id, item.quantity - 1)}
                    >
                        <Icon name="remove" size={RFValue(14)} color="#000" /> {/* Changed color to black */}
                    </TouchableOpacity>
                    <CustomText fontFamily={Fonts.Medium} style={styles.quantityText}>
                        {item.quantity}
                    </CustomText>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onQuantityChange(item.id, item.quantity + 1)}
                    >
                        <Icon name="add" size={RFValue(14)} color="#000" /> {/* Changed color to black */}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    console.log("Cart Items in CartSummary:", cartItems); // Debugging line

    return (
        <View style={styles.container}>
            {/* Summary Bar */}
            <TouchableOpacity style={styles.summaryContainer} onPress={toggleExpansion}>
                <Image
                    source={require('@assets/icons/bucket.png')} // Use a generic cart icon
                    style={styles.image}
                />
                <CustomText fontFamily={Fonts.SemiBold} style={styles.cartCountText}>
                    {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
                </CustomText>
                <Icon name={isExpanded ? 'arrow-drop-down' : 'arrow-drop-up'} color={Colors.secondary} size={RFValue(20)} />
            </TouchableOpacity>

            {/* Expanded List of Items */}
            {isExpanded && (
                <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                />
            )}

            {/* Next Button */}
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => navigate("ProductOrder")}>
                    <CustomText style={styles.btnText} fontFamily={Fonts.Medium}>Next</CustomText>
                    <Icon name="arrow-right" color="#fff" size={RFValue(16)} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.03, // Reduced padding
        paddingBottom: screenHeight * 0.005, // Reduced padding
        paddingTop: screenHeight * 0.005, // Reduced padding
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    summaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: screenWidth * 0.02, // Reduced gap
        width: '100%',
        paddingVertical: screenHeight * 0.005, // Reduced padding
    },
    image: {
        width: screenWidth * 0.08, // Reduced size
        height: screenWidth * 0.08, // Reduced size
        borderRadius: screenWidth * 0.02, // Reduced border radius
    },
    cartCountText: {
        fontSize: RFValue(12), // Smaller font size
    },
    list: {
        width: '100%',
        marginTop: screenHeight * 0.005, // Reduced margin
        backgroundColor: '#78c75e',
        borderRadius: 8, // Reduced border radius
    },
    listContent: {
        paddingVertical: 5, // Reduced padding
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8, // Reduced padding
        paddingVertical: 6, // Reduced padding
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.border,
    },
    itemImage: {
        width: 30, // Reduced size
        height: 30, // Reduced size
        borderRadius: 8, // Reduced border radius
    },
    itemDetails: {
        flex: 1,
        marginLeft: 8, // Reduced margin
    },
    itemName: {
        fontSize: RFValue(12), // Smaller font size
    },
    itemPrice: {
        fontSize: RFValue(10), // Smaller font size
        color: Colors.secondary,
    },
    itemTotalPrice: {
        fontSize: RFValue(10), // Smaller font size
        color: Colors.primary, // Use a different color for the total price
        marginTop: 2, // Add some spacing
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6, // Reduced gap
    },
    quantityButton: {
        borderWidth: 1, // Add border
        borderColor: '#000', // Black border
        borderRadius: 4, // Rounded corners
        padding: 4, // Padding inside the button
        backgroundColor: '#f0f0f0', // Light gray background for better contrast
    },
    quantityText: {
        fontSize: RFValue(12), // Smaller font size
        marginHorizontal: 6, // Space between buttons and text
    },
    nextButtonContainer: {
        width: '25%', // Smaller width
        alignSelf: 'flex-end',
        marginTop: screenHeight * 0.005, // Reduced margin
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: screenHeight * 0.006, // Reduced padding
        borderRadius: screenWidth * 0.02, // Reduced border radius
        backgroundColor: Colors.secondary,
        paddingHorizontal: screenWidth * 0.03, // Reduced padding
    },
    btnText: {
        marginLeft: screenWidth * 0.01, // Reduced margin
        color: '#fff',
        fontSize: RFValue(12), // Smaller font size
    },
});

export default CartSummary;
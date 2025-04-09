// import { useCartStore } from "@state/cartStore";
// import { FunctionComponent } from "react";
// import { StyleSheet , View} from "react-native";
// import CartAnimationWrapper from "./CartAnimationWrapper";
// import CartSummary from "./CartSummary";


// const withCart=<P extends object>(WrappedComponent:React.ComponentType<P>):FunctionComponent<P>=>{
//     const WithCartComponent:FunctionComponent<P>= (props) => {
//         const cart=useCartStore(state=>state.cart)
//         const cartCount = cart.reduce((acc,item)=>acc+item.count, 0)
//         return(
//             <View style={styles.container}>
//                 <WrappedComponent {...props}  />
//                 <CartAnimationWrapper cartCount={cartCount}>
//                     <CartSummary 
//                     cartCount={cartCount}
//                     cartImage={cart![0]?.item?.image || null}
//                     />
//                 </CartAnimationWrapper>
//             </View>
//         )
//     }

//     return WithCartComponent
// }

// const styles=StyleSheet.create({
//     container:{
//         flex:1
//     }
// })

// export default withCart




import { useCartStore } from "@state/cartStore";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import CartAnimationWrapper from "./CartAnimationWrapper";
import CartSummary from "./CartSummary";

const withCart = <P extends object>(WrappedComponent: React.ComponentType<P>): FunctionComponent<P> => {
    const WithCartComponent: FunctionComponent<P> = (props) => {
        const cart = useCartStore((state) => state.cart);
        const addItem = useCartStore((state) => state.addItem); // Use addItem to increase quantity
        const removeItem = useCartStore((state) => state.removeItem); // Use removeItem to decrease quantity

        const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

        // Transform cart items to match the CartItem interface expected by CartSummary
        const cartItems = cart.map((cartItem) => {
            // Ensure cartItem._id exists before calling toString()
            const id = cartItem._id ? cartItem._id.toString() : Math.random().toString(); // Fallback to a random ID if _id is undefined
            return {
                id: id,
                name: cartItem.item.name,
                quantity: cartItem.count,
                price: cartItem.item.price,
                image: cartItem.item.image,
            };
        });

        const handleQuantityChange = (id: string, newQuantity: number) => {
            const item = cart.find((cartItem) => {
                const cartItemId = cartItem._id ? cartItem._id.toString() : ''; // Ensure cartItem._id exists
                return cartItemId === id;
            });
            if (item) {
                if (newQuantity > item.count) {
                    // Increase quantity
                    addItem(item.item);
                } else if (newQuantity < item.count) {
                    // Decrease quantity
                    removeItem(item._id);
                }
            }
        };

        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />
                <CartAnimationWrapper cartCount={cartCount}>
                    <CartSummary
                        cartCount={cartCount}
                        cartItems={cartItems} // Pass cartItems here
                        onQuantityChange={handleQuantityChange} // Pass onQuantityChange here
                    />
                </CartAnimationWrapper>
            </View>
        );
    };

    return WithCartComponent;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default withCart;
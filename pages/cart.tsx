import { removeItem } from '@/cartSlice';
import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const cart = () => {
    const { cartItems } = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    return (
        <div className="p-10">
            <div className="flex flex-wrap gap-2 justify-center">

                {cartItems?.length > 0 ? (
                    cartItems.map((item: any) => (
                        <div key={item.id} className="h-100 w-50 p-5 border-1 border-purple-400 relative" >
                            {item.thumbnail && (
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={200}
                                    height={200}
                                />
                            )}
                            <h1>{item.title}</h1>
                            <p>Brand: {item.brand}</p>
                            <p>User ID: {item.userId}</p>
                            <button
                                className="bg-blue-400 rounded-xl px-2 py-1 absolute left-5 bottom-5"
                                type="button"
                                onClick={() => {
                                    dispatch(removeItem(item.id));
                                    console.log("cart", cart);
                                }}
                            >
                                Remove from cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No todos found.</p>
                )}
            </div>
        </div>
    )
}

export default cart
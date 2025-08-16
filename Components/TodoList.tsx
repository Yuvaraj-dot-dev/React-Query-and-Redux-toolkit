import { addItem, removeItem } from "@/cartSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type TodoDetails = {
  todo: string;
  completed: boolean;
  userId: string;
};

const TodoList = () => {

  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  console.log('cart', cart);
  const [todo, setTodo] = useState<TodoDetails>({
    todo: "",
    completed: false,
    userId: "",
  });

  const queryClient = useQueryClient();

  // Fetch all todos
  const fetchProduct = async () => {
    const res = await fetch('https://dummyjson.com/products');
    if (!res.ok) return {};
    return res.json();
  };

  // Post a new todo
  // const postProduct = async (newTodo: TodoDetails) => {
  //   try {
  //     const res = await fetch("https://dummyjson.com/todos/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newTodo),
  //     });

  //     if (!res.ok) {
  //       toast.error("Failed to add todo");
  //       return null;
  //     }

  //     return await res.json();
  //   } catch (error) {
  //     console.error("Error posting todo:", error);
  //     return null;
  //   }
  // };

  // Query
  const { data, isFetching } = useQuery({
    queryKey: ["todo"],
    queryFn: fetchProduct,
  });

  // Mutation
  // const { mutate: PostTodo } = useMutation({
  //   mutationFn: postProduct,
  //   onSuccess: () => {
  //       toast.success("Todo added successfully");
  //       queryClient.invalidateQueries({ queryKey: ["todo"] });
  //     setTodo({
  //       todo: "",
  //       completed: false,
  //       userId: "",
  //     });
  //   },
  //   onError: () => {
  //     toast.error("An error occurred while adding todo");
  //   },
  // });

  if (isFetching) {
    return <div>...Loading</div>;
  }

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    if (!todo.todo || !todo.userId) {
      toast.error("Please fill all fields");
      return;
    }
    // PostTodo(todo);
  };

  console.log('data', data);

  const handleAddToCart = (id: number) => {
    console.log("id", id);
  }

  return (
    <div className="p-10">
      <div className="flex flex-wrap gap-2 justify-center">

        {data?.products?.length > 0 ? (
          data.products.map((item: any) => (
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
                className="bg-blue-400 rounded-xl px-2 py-1 absolute left-5 bottom-5 text-white"
                type="button"
                onClick={() => {
                  handleAddToCart(item.id)
                  const addAndRemove = cart.cartItems.filter((remove: any) => item.id === remove.id).length > 0;
                  if (addAndRemove) {
                    dispatch(removeItem(item.id));
                  } else {
                    dispatch(addItem(item))
                  }
                  console.log("cart", cart);
                }}
              >
                {cart.cartItems.filter((remove: any) => item.id === remove.id).length > 0 ? "Remove from cart" : "Add To Cart"}
              </button>
            </div>
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;

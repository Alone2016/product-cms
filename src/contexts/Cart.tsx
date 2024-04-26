import React, { useCallback, useMemo } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutateAsyncFunction,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { showMessageSuccess } from "@/utils/toast";

export interface CartProviderConfig<Cart = unknown, Error = unknown> {
  key?: string;
  loadCartFn: (data: any) => Promise<Cart>;
  addCartFn: (data: any) => Promise<Cart>;
  updateCartFn: (data: any) => Promise<Cart>;
  deleteCartFn: (id: any) => Promise<Cart>;
  waitInitial?: boolean;
  LoaderComponent?: () => JSX.Element;
  ErrorComponent?: ({ error }: { error: Error | null }) => JSX.Element;
}

export interface CartContextValue<Cart = unknown, Error = unknown> {
  cart: Cart | undefined;
  addCart: UseMutateAsyncFunction<any, any, void, any>;
  updateCart: UseMutateAsyncFunction<any, any, void, any>;
  deleteCart: UseMutateAsyncFunction<any, any, void, any>;
  refetchCart: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Cart, Error>>;
  error: Error | null;
}

export interface CartProviderProps {
  children: React.ReactNode;
}

export function initReactQueryCart<Cart = unknown, Error = unknown>(config: CartProviderConfig<Cart, Error>) {
  const CartContext = React.createContext<CartContextValue<Cart, Error> | null>(null);
  CartContext.displayName = "CartContext";

  const { loadCartFn, addCartFn, deleteCartFn, updateCartFn, key = ["cart-user"], waitInitial = true } = config;

  function CartProvider({ children }: CartProviderProps): JSX.Element {
    const queryClient = useQueryClient();

    const {
      data: cart,
      error,
      status,
      isLoading,
      isIdle,
      isSuccess,
      refetch,
    } = useQuery<Cart, Error>({
      queryKey: key,
      queryFn: loadCartFn,
    });

    const setCart = useCallback((data: Cart) => queryClient.setQueryData(key, data), [queryClient]);

    const addCartMutation = useMutation({
      mutationFn: addCartFn,
      onSuccess: () => {
        showMessageSuccess({
          content: "Sản phẩm đã được thêm vào giỏ hàng",
          config: {
            autoClose: 1000,
          },
        });
        refetch();
      },
    });

    const updateCartMutation = useMutation({
      mutationFn: updateCartFn,
      onSuccess: () => {
        refetch();
      },
    });

    const deleteCartMutation = useMutation({
      mutationFn: deleteCartFn,
      onSuccess: () => {
        refetch();
      },
    });

    const value = useMemo(
      () => ({
        cart,
        error,
        refetchCart: refetch,
        addCart: addCartMutation.mutateAsync,
        updateCart: updateCartMutation.mutateAsync,
        deleteCart: deleteCartMutation.mutateAsync,
      }),
      [
        cart,
        error,
        refetch,
        addCartMutation.mutateAsync,
        deleteCartMutation.mutateAsync,
        updateCartMutation.mutateAsync,
      ],
    );

    if (isSuccess || !waitInitial) {
      return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    }

    // if (isLoading || isIdle) {
    //   return <LoaderComponent />;
    // }

    // if (error) {
    //   return <ErrorComponent error={error} />;
    // }

    return <div></div>;
  }

  function useCart() {
    const context = React.useContext(CartContext);
    if (!context) {
      throw new Error(``);
    }
    return context;
  }

  return { CartProvider, CartConsumer: CartContext.Consumer, useCart };
}

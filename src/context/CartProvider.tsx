import React, { ReactElement, createContext, useMemo, useReducer } from 'react';

export type CartItemType = {
	sku: string;
	name: string;
	price: number;
	qty: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };
const Reducer_Action_Type = {
	Add: 'Add',
	Remove: 'Remove',
	Quantity: 'Quantity',
	Submit: 'Submit',
};

export type ReducerActionType = typeof Reducer_Action_Type;

export type ReducerAction = {
	type: string;
	payload?: CartItemType;
};

const reducer = (
	state: CartStateType,
	action: ReducerAction
): CartStateType => {
	switch (action.type) {
		case Reducer_Action_Type.Add: {
			if (!action.payload)
				throw new Error('action.payload missing in add');

			const { sku, name, price } = action.payload;
			const filteredCart: CartItemType[] = state.cart.filter(
				(item) => item.sku !== sku
			);
			const itemExists: CartItemType | undefined = state.cart.find(
				(item) => item.sku === sku
			);
			const qty: number = itemExists ? itemExists.qty + 1 : 1;
			return {
				...state,
				cart: [...filteredCart, { sku, name, price, qty }],
			};
		}
		case Reducer_Action_Type.Remove: {
			if (!action.payload)
				throw new Error('action.payload missing in remove');

			const { sku } = action.payload;
			const filteredCart: CartItemType[] = state.cart.filter(
				(item) => item.sku !== sku
			);

			return { ...state, cart: [...filteredCart] };
		}
		case Reducer_Action_Type.Quantity: {
			if (!action.payload)
				throw new Error('action.payload missing in quantity');

			const { sku, qty } = action.payload;
			const itemExists: CartItemType | undefined = state.cart.find(
				(item) => item.sku === sku
			);

			if (!itemExists)
				throw new Error('Item must exits in order to update quantity');

			const updatedItem: CartItemType = { ...itemExists, qty };
			const filteredCart: CartItemType[] = state.cart.filter(
				(item) => item.sku !== sku
			);

			return { ...state, cart: [...filteredCart, updatedItem] };
		}
		case Reducer_Action_Type.Submit: {
			return { ...state, cart: [] };
		}

		default:
			throw new Error('undefined reducer type');
	}
};

const useCartContext = (initCartState: CartStateType) => {
	const [state, dispatch] = useReducer(reducer, initCartState);

	const Reducer_Action = useMemo(() => {
		return Reducer_Action_Type;
	}, []);

	const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
		return previousValue + cartItem.qty;
	}, 0);

	const totalPrice = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(
		state.cart.reduce((previousValue, cartItem) => {
			return previousValue + (cartItem.qty + cartItem.price);
		}, 0)
	);
	const cart = state.cart.sort((a, b) => {
		const itemA = Number(a.sku.slice(-4));
		const itemB = Number(a.sku.slice(-4));

		return itemA - itemB;
	});

	return {
		dispatch,
		Reducer_Action,
		totalPrice,
		totalItems,
		cart,
	};
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
	dispatch: () => {},
	Reducer_Action: Reducer_Action_Type,
	totalItems: 0,
	totalPrice: '',
	cart: [],
};

export const CartContext =
	createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
	return (
		<CartContext.Provider value={useCartContext(initCartState)}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;

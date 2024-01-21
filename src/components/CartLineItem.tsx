import React, { ChangeEvent, ReactElement, memo } from 'react';
import { CartItemType } from '../context/CartProvider';
import { ReducerAction } from '../context/CartProvider';
import { ReducerActionType } from '../context/CartProvider';

type PropsType = {
	item: CartItemType;
	dispatch: React.Dispatch<ReducerAction>;
	Reducer_Action: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, Reducer_Action }: PropsType) => {
	const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
		.href;

	const lineTotal: number = item.qty * item.price;
	const highestQty: number = 20 > item.qty ? 20 : item.qty;
	const optionValues: number[] = [...Array(highestQty).keys()].map(
		(i) => i + 1
	);
	const options: ReactElement[] = optionValues.map((val) => (
		<option key={`opt${val}`} value={val}>
			{val}
		</option>
	));

	const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) =>
		dispatch({
			type: Reducer_Action.Quantity,
			payload: { ...item, qty: Number(e.target.value) },
		});

	const onRemoveFromCart = () =>
		dispatch({
			type: Reducer_Action.Remove,
			payload: item,
		});

	const content = (
		<li className='cart__item'>
			<img src={img} alt={item.name} className='cart__img' />
			<div aria-label='Item name'>{item.name}</div>
			<div aria-label='Price per item'>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(item.price)}
			</div>

			<label htmlFor='itemQty' className='offscreen'>
				Item Quantity
			</label>

			<select
				name='itemQty'
				id='itemQty'
				className='cart__select'
				value={item.qty}
				aria-label='Item Quantity'
				onChange={onChangeQty}
			>
				{options}
			</select>
			<div
				className='cart__item-subtotal'
				aria-label='Line item subtotal'
			>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(lineTotal)}
			</div>
			<button
				className='cart__button'
				aria-label='Remove item form cart'
				title='Remove item form cart'
				onClick={onRemoveFromCart}
			>
				❌
			</button>
		</li>
	);

	return content;
};

function arrItemsEqual(
	{ item: prevItem }: PropsType,
	{ item: nextItem }: PropsType
) {
	return Object.keys(prevItem).every(
		(key) =>
			prevItem[key as keyof CartItemType] ===
			nextItem[key as keyof CartItemType]
	);
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
	CartLineItem,
	arrItemsEqual
);

export default MemoizedCartLineItem;

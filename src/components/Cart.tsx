import React, { useState } from 'react';
import CartLineItem from './CartLineItem';
import useCart from '../hooks/useCart';

const Cart = () => {
	const [confirm, setConfirm] = useState<boolean>(false);
	const { dispatch, Reducer_Action, totalItems, totalPrice, cart } =
		useCart();

	const onSubmitOrder = () => {
		dispatch({ type: Reducer_Action.Submit });
		setConfirm(true);
	};

	const pageContent = confirm ? (
		<h2>Thanku for your order</h2>
	) : (
		<>
			<h2 className='offscreen'>Cart</h2>
			<ul className='cart'>
				{cart.map((item) => (
					<CartLineItem
						key={item.sku}
						item={item}
						dispatch={dispatch}
						Reducer_Action={Reducer_Action}
					/>
				))}
			</ul>
			<div className='cart__totals'>
				<p>Total Items: {totalItems}</p>
				<p>Total Price: {totalPrice}</p>
				<button
					className='cart__submit'
					disabled={!totalItems}
					onClick={onSubmitOrder}
				>
					Place order
				</button>
			</div>
		</>
	);

	const content = <main className='main main--cart'>{pageContent}</main>;

	return content;
};

export default Cart;

import React from 'react';

type PropsType = {
	viewCart: boolean;
	setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
	const button = viewCart ? (
		<button onClick={() => setViewCart(false)}>View products</button>
	) : (
		<button onClick={() => setViewCart(false)}>View Cart</button>
	);

	const content = <nav className='nav'>{button}</nav>;
	return <div>Nav</div>;
};

export default Nav;

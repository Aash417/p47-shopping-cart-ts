import Nav from './Nav';
import useCart from '../hooks/useCart';

type PropsType = {
	viewCart: boolean;
	setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
	const { totalItems, totalPrice } = useCart();

	const content = (
		<header className='header'>
			<div className='header__title-bar'>
				<h1>aash.io</h1>
				<div className='header__price-bar'>
					<p>Total items: {totalItems}</p>
					<p>Toal Price: {totalPrice}</p>
				</div>
			</div>
			<Nav viewCart={viewCart} setViewCart={setViewCart}></Nav>
		</header>
	);

	return content;
};

export default Header;

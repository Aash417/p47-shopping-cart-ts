import Nav from './Nav';

type PropsType = {
	viewCart: boolean;
	setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
	const content = (
		<header className='header'>
			<div className='header__title-bar'>
				<h1>aash.io</h1>
				<div className='header__title-bar'>
					<p>Total items: </p>
					<p>Toal Price: </p>
				</div>
			</div>
			<Nav viewCart={viewCart} setViewCart={setViewCart}></Nav>
		</header>
	);

	return content;
};

export default Header;

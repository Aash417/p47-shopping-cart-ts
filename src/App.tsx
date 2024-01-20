import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { useState } from 'react';
import Product from './components/Product';

const App = () => {
	const [viewCart, setViewCart] = useState<boolean>(false);
	const pagecontent = viewCart ? <Cart /> : <Product />;
	const content = (
		<>
			<Header viewCart={viewCart} setViewCart={setViewCart} />
			{pagecontent}
			<Footer viewCart={viewCart} />
		</>
	);

	return <div></div>;
};

export default App;

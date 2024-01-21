import { ProductType } from '../context/ProductsProvider';
import { ReducerActionType, ReducerAction } from '../context/CartProvider';

type PropsType = {
	product: ProductType;
	dispatch: React.Dispatch<ReducerAction>;
	Reducer_Action: ReducerActionType;
	inCart: boolean;
};

const Products = ({ product, dispatch, inCart, Reducer_Action }: PropsType) => {
	const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
		.href;

	const onAddToCart = () =>
		dispatch({
			type: Reducer_Action.Add,
			payload: {
				...product,
				qty: 1,
			},
		});

	const itemIncart = inCart ? '-> Item in cart: ' : null;
	const content = (
		<article>
			<h3>{product.name}</h3>
			<img src={img} alt={product.name} className='product__img' />
			<p>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(product.price)}
				{itemIncart}
			</p>
			<button onClick={onAddToCart}>Add to cart</button>
		</article>
	);

	return content;
};

export default Products;

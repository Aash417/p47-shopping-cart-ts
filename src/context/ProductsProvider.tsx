import React, { ReactElement, createContext, useState, useEffect } from 'react';

export type ProductType = {
	sku: string;
	name: string;
	price: number;
};

const initState: ProductType[] = [
	{
		sku: 'item0001',
		name: 'Widget',
		price: 9.99,
	},
	{
		sku: 'item0002',
		name: 'Premium Widget',
		price: 19.99,
	},
	{
		sku: 'item0003',
		name: 'Deluxe Widget',
		price: 29.99,
	},
];

export type UseProductsContextType = { products: ProductType[] };
const initContextState: UseProductsContextType = { products: [] };

export const ProductsContext =
	createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
	const [products, setProducts] = useState<ProductType[]>(initState);

	// useEffect(() => {
	// 	const fetProducts = async (): Promise<ProductType[]> => {
	// 		const data = await fetch('http://localhost:3600/products')
	// 			.then((res) => res.json())
	// 			.catch((err) => console.log(err));

	// 		return data;
	// 	};

	// 	fetProducts().then((Products) => setProducts(Products));
	// }, []);

	return (
		<ProductsContext.Provider value={{ products }}>
			{children}
		</ProductsContext.Provider>
	);
};

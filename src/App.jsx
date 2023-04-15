import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from './components/Header';
import Products from './components/Products';

import './index.css';

function App() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getProducts = async () => {
			const data = await axios.get('http://localhost:3001/products');

			setProducts(data.data.results);
			setLoading(false);
		};

		getProducts();
	}, []);

	return loading ? (
		<p>loading</p>
	) : (
		<main>
			<Header setLoading={setLoading} setProducts={setProducts} />
			<Products loading={loading} products={products} />
		</main>
	);
}

export default App;

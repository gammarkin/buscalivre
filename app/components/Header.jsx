import React from 'react';

import Dropdown from './Dropdown.jsx';
import SearchBar from './SearchBar.jsx';

import {product_category, product_from} from '../data/categories.js';

const Header = ({setProducts, setLoading}) => {
	return (
		<header>
			<Dropdown
				setLoading={setLoading}
				name="Web"
				options={product_from}
				setProducts={setProducts}
			/>
			<Dropdown
				setLoading={setLoading}
				name="Categorias"
				options={product_category}
				setProducts={setProducts}
			/>

			<SearchBar setLoading={setLoading} setProducts={setProducts} />
		</header>
	);
};

export default Header;

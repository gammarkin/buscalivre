import React from 'react';
import axios from 'axios';

const handleOnChange = async (event, setProducts, setLoading) => {
	event.preventDefault();

	const {
		target: {value},
	} = event;

	setLoading(true);

	if (value === 'Todos') {
		const products = await axios.get(`http://localhost:3001/products/`);

		console.log(products.data.results, 'drop');
		setLoading(false);

		return setProducts(products.data.results);
	}

	if (value === 'Buscapé' || value === 'Mercado Livre') {
		const products = await axios.get(`http://localhost:3001/products`);

		const filteredListBySite = products.data.results.filter(
			(product) => product.from === value
		);

		console.log(filteredListBySite, 'drop');

		setLoading(false);
		return setProducts(filteredListBySite);
	}

	const data = await axios.get(`http://localhost:3001/products/c/${value}`);

	setProducts(data.data.results);
	return setLoading(false);
};

const Dropdown = ({name, options, setProducts, setLoading}) => {
	return (
		<select
			name={name}
			onChange={(e) => handleOnChange(e, setProducts, setLoading)}
		>
			<option hidden>{name}</option>
			{options.map((option, index) => (
				<option key={index} value={option.name}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default Dropdown;

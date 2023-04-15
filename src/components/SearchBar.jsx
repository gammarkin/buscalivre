import React, {useState} from 'react';
import axios from 'axios';

const SearchBar = ({setProducts, setLoading}) => {
	const [searchText, setSearchText] = useState('');

	const handleChange = ({target: {value}}) => {
		return setSearchText(value);
	};

	const handleSubmit = async (event, setProducts, setLoading) => {
		event.preventDefault();

		setLoading(true);
		const data = await axios.get(
			`http://localhost:3001/products/c/${searchText}`
		);

		setLoading(false);
		return setProducts(data.data.results);
	};

	return (
		<form onSubmit={(e) => handleSubmit(e, setProducts, setLoading)}>
			<input type="text" value={searchText} onChange={handleChange} />
			<button
				onClick={(e) => handleSubmit(e, setProducts, setLoading)}
				type="submit"
			>
				Search
			</button>
		</form>
	);
};

export default SearchBar;

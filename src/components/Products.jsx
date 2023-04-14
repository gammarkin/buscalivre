import React from 'react';

export default function Products({products, loading}) {
	return loading ? (
		<p>loading...</p>
	) : (
		<section>
			{products.map((product, index) => (
				<div key={product._id + index}>
					<img src={product.img} alt={`imagem de ${product.name}`} />
					<p>{product.name}</p>
					<p>{product.category}</p>
					<p>{product.from}</p>
					<p>{product.price}</p>
				</div>
			))}
		</section>
	);
}

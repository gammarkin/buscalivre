import React from 'react';

export default function Products({products, loading}) {
	return loading ? (
		<p>loading...</p>
	) : (
		<section>
			{products.map((product, index) => (
				<div key={product._id + index}>
					<img src={product.img} alt={`imagem de ${product.name}`} />
					<div>
						<h1>{product.name}</h1>
						<h2>{product.category}</h2>
						<p>{product.from}</p>
						<h3>{product.price}</h3>
					</div>
				</div>
			))}
		</section>
	);
}

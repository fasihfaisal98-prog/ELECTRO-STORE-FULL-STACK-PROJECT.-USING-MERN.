import React from "react";

// Child component — receives product data purely through props
function ProductCard({ name, price, category, inStock, rating }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-5 shadow-sm bg-white flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-neutral-900">{name}</h2>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <p className="text-sm text-neutral-500">{category}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-bold text-neutral-900">${price}</span>
        <span className="text-sm text-amber-600">★ {rating}</span>
      </div>
    </div>
  );
}

// Parent component — owns the data, passes it down as props
export default function ProductInfo() {
  const products = [
    { id: 1, name: "Wireless Mouse", price: 19.99, category: "Electronics", inStock: true, rating: 4.5 },
    { id: 2, name: "Mechanical Keyboard", price: 59.99, category: "Electronics", inStock: true, rating: 4.8 },
    { id: 3, name: "Desk Lamp", price: 24.5, category: "Home Office", inStock: false, rating: 4.1 },
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <h1 className="text-2xl font-bold text-neutral-900 mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          // Each product object is spread/passed as props to the child
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
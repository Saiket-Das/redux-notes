import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../app/features/api/apiSlice";

import { toggle, toggleBrand } from "../../app/features/filter/filterSlice";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetProductsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const products = data?.data;

  const state = useSelector((state) => state);

  const { brands, stock } = state.filter;
  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (isLoading) content = "Loading...";
  if (isError) content = "Something went wrong";

  if (products?.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }

  if (products?.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCard key={product.model} product={product} />);
  }

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock && activeClass
          } `}
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold 
       ${brands.includes("amd") && activeClass}`}
          onClick={() => dispatch(toggleBrand("amd"))}
        >
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold  ${
            brands.includes("intel") && activeClass
          }`}
          onClick={() => dispatch(toggleBrand("intel"))}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
        {content}
      </div>
    </div>
  );
};

export default Home;

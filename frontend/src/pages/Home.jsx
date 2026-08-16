import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0,4));
      } catch (error) {
        console.log(error, "while fetching products in home.jsx");
      } finally{
        setLoading(false);
      }
    }
  })

  return (
    <div>
      <div>
        <h1>Welcome to ShopVerse</h1>
        <p>Discover the best products at unbeatable prices.</p>
      </div>
      <h2>Featured Products</h2>
      {loading? (
        <div>Loading...</div>
      ): (
        <div>
          {products.map((product) => {
            <ProductCard key={product._id} product={product}/>
          })}
        </div>
      )}
    </div>
  )
}

export default Home;
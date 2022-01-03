import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";


const Home = () => {
    //const { items, status } = useSelector(state => state.products) //구조분해로 데이터 가져오기
    const { items: products, status } = useSelector((state) => state.products);
    console.log('statu', status)
    const dispatch = useDispatch();
    const history = useHistory();

    const { data, error, isLoading } = useGetAllProductsQuery();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        history.push("/cart");
    };

    return (
        <div className="home-container">
            {status === "success" ? (
                <>
                    <h2>New Arrivals</h2>
                    <div className="products">
                        {data &&
                            data?.map((product) => (
                                <div key={product.id} className="product">
                                    <h3>{product.name}</h3>
                                    <img src={product.image} alt={product.name} />
                                    <div className="details">
                                        <span>{product.desc}</span>
                                        <span className="price">${product.price}</span>
                                    </div>
                                    <button onClick={() => handleAddToCart(product)}>
                                        Add To Cart
                                    </button>
                                </div>
                            ))}
                    </div>
                </>
            ) : status === "pending" ? (
                <p>Loading...</p>
            ) : (
                <p>Unexpected error occured...</p>
            )}
        </div>
    );
}

export default Home;
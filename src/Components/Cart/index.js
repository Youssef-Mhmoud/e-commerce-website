import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import Loader from "react-loaders";
import "./index.scss";
import { clear, total } from "../../redux/Slices/cartSlice";
import { useRef } from "react";

const Cart = () => {
  // Redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(total());
  }, [cart, dispatch]);

  const indexRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      indexRef.current.style.zIndex = '-1'
    }, 3500)
  })
  return (
    <>
      <div className="container main-cart">
        <div>
          {cart.cartItem.length === 0 ? (
            <div className="cart-empty">
              <p>Your Cart Is Currently Empty</p>
              <div className="start-shopping">
                <Link to="/">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="title">
                <h3 className="product-title">Product</h3>
                <h3 className="price">Price</h3>
                <h3 className="quantity">Quantity</h3>
                <h3 className="total">Total</h3>
              </div>
              <div className="cart-items">
                {cart.cartItem &&
                  cart.cartItem.map((product) => {
                    return <CartItem product={product} key={product.id} />;
                  })}
              </div>
              <div className="cart-summary">
                <button className="clear" onClick={() => dispatch(clear())}>
                  Clear Cart
                </button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span className="amount">${cart.cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  <button>Check Out</button>
                  <div className="continue-shopping">
                    <Link to="/">
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="loader-page" ref={indexRef}>
        <h1>
          <span className="logo-load">SHOPPIng</span>
        </h1>
        <br />
        <Loader type="ball-clip-rotate-multiple" innerClassName="load" />
      </div>
    </>
  );
};

export default Cart;

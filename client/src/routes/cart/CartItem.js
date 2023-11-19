import React from "react";
import CartProductInteraction from "./CartItemInteraction";
import ClearCartBtn from "./ClearCartBtn";

const CartItem = ({
  handleAddProduct,
  handleRemoveProduct,
  clearCart,
  cartItems }) => {

  return (
    <section className="cart-title-section" >
      {
        cartItems.map((cartItem, index) => {
          return (
            <article className="cart-item" key={index}>
              <img src={cartItem?.images?.[0]} alt={cartItem?.name} />
              <section className="cart-item-content">
                <section className="cart-item-info">
                  <section className="cart-item-title">
                    <h3>{cartItem?.name}</h3>
                    {/* {cartItem.userSelectedAttributes.length === 0 ? (
                    ) : (
                      <h3>
                        {cartItem.ItemName},{" "}
                        {cartItem.userSelectedAttributes.map((i, index) => {
                          return <span key={index}>{i.attributeValue}</span>;
                        })}
                      </h3>
                    )} */}
                  </section>
                  <section className="cart-item-ingredients">
                    <p>{cartItem?.description}</p>
                  </section>
                </section>

                <section className="cart-item-interaction">
                  <CartProductInteraction
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                    cartItem={cartItem}
                  />

                  <p className="cart-item-price">${cartItem?.salePrice || cartItem?.regularPrice}</p>
                </section>
              </section>
            </article>
          );
        })
      }
      <ClearCartBtn className="cart-clear-btn" clearCart={clearCart} />
    </section>
  );
}



export default CartItem;
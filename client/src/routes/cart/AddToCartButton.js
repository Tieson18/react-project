import React from "react";

const AddToCartButton = ({ singleProduct,
  handleAddProduct }) => {
  return (
    <button
      onClick={() => {
        handleAddProduct(singleProduct);
      }}
      className={`passive-button-style active-add-to-cart`}
    >
      Add to cart
    </button>
  );
}
export default AddToCartButton;
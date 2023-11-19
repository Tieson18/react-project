// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../cart/AddToCartButton';
// import Attribute from './Attribute';
import ResetLocation from "../../helpers/ResetLocation";

const MenuGridItem = ({ singleProduct, handleAddProduct, handleRemoveProduct }) => {
  // const [selectedAttributes, setSelectedAttributes] = useState([]);
  // const [targetAttribute, setTargetAttribute] = useState('');

  // const handleSelectedAttributes = (attributeId, attributeValue) => {
  //   setTargetAttribute(attributeValue);
  //   const newSelectedAttribute = { attributeId, attributeValue };
  //   setSelectedAttributes(prevAttributes => {
  //     const existingAttributeIndex = prevAttributes.findIndex(
  //       attribute => attribute.attributeId === newSelectedAttribute.attributeId
  //     );
  //     if (existingAttributeIndex !== -1) {
  //       const updatedAttributes = [...prevAttributes];
  //       updatedAttributes[existingAttributeIndex] = { ...newSelectedAttribute };
  //       return updatedAttributes;
  //     } else {
  //       return [...prevAttributes, newSelectedAttribute];
  //     }
  //   });
  // };


  return (
    <article className="menu-grid-item flex-container flex-column txt-white">
      <Link onClick={ResetLocation} to={`/menu/${singleProduct?._id}`} className="menu-item-link">
        <img src={singleProduct?.images?.[0]} alt={`${singleProduct?.name}`} />
      </Link>
      <h3>{singleProduct?.name}</h3>
      <p>{singleProduct?.description}</p>
      {/* {singleProduct.attributes.length === 0 ? null :
        singleProduct.attributes?.map(attribute => (
          <Attribute
            key={attribute.id}
            className="attributes"
            handleSelectedAttributes={handleSelectedAttributes}
            attribute={attribute}
            targetAttribute={targetAttribute}
          />
        ))
      } */}
      <div className="price">
        {singleProduct.salePrice ?
          <section className="sale-pricing">
            <p className="price-num-before"><span>$</span>{singleProduct.regularPrice}</p>
            <p className="price-num"><span>$</span>{singleProduct.salePrice}</p>
          </section>
          :
          <p className="price-num"><span>$</span>{singleProduct.regularPrice}</p>
        }
        <AddToCartButton
          handleAddProduct={handleAddProduct}
          singleProduct={singleProduct}/>
      </div>
    </article>
  );
};

export default MenuGridItem;

import React from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import ResetLocation from '../../helpers/ResetLocation'
// import pizzaMenuPreview from '../../../data/pizzaMenuPreview';
import { useSelector } from 'react-redux';



const PizzaMenuPreview = () => {
  
  const products = useSelector(state => state.contentStore.products)
  const featuredProducts = products?.filter(product =>product.isFeatured)

  return (
    <article className="section-4 flex-container flex-column" >

      <section className="section-4-info txt-center">
        <h2 className="pop-font txt-white">Featured Products</h2>
        <p className="section-description">
          lorem ipsum dolor sit amet, consectetur adip
        </p>
      </section>
      <section className="meals-grid flex-container flex-column" >
        {featuredProducts?.map((product, id) => (
          <motion.div
            key={id}
            className="meal-item flex-container"
            initial={{ opacity: 0, translateX: -300 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -300 }}
            transition={{ duration: 3 }}
          >
            <img
              src={product.images[0]}
              style={{
                objectFit:"cover",
                width:300,
              }}
              alt={product.name}
            />
            <section className="meal-item-details flex-container flex-column">
              <h3 className="txt-white">{product.name}</h3>
              <p>{product.description}</p>
              <section className="meal-item-order flex-container flex-row txt-center">
                <p>
                  <span>$</span>
                  {product.regularPice}
                </p>
              </section>
            </section>
          </motion.div>
        ))}
      </section>
      <Link
        onClick={ResetLocation}
        to="/menu"
        className="active-button-style txt-white"
      >
        More product
      </Link>
    </article>

  )
}

export default PizzaMenuPreview;
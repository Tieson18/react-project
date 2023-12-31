import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './routes/landing/Header.js';
import Footer from './components/footer/Footer';
import {
  About,
  Cart,
  Checkout,
  Contact,
  RootSection,
  Menu,
  Payment,
  Register,
  SingleItem,
} from './routes/index';
import CheckoutSummary from './routes/checkout/CheckoutSummary.js';
import CartTotals from './routes/cart/CartTotals.js';
import LoginModal from './components/LoginModal.js';
import CartItem from './routes/cart/CartItem.js';
import NotFound from './routes/not-found/NotFound.js';
// import Refunds from './routes/refunds/Refunds.js';
// import Terms from './routes/terms/Terms.js';
// import Privacy from './routes/privacy/Privacy.js';
import Profile from './routes/profile/Profile.js';
import ResetLocation from './helpers/ResetLocation.js';
import { useDispatch, useSelector } from 'react-redux'
// import { populate } from 'dotenv';
import { populateCategories, populateProducts } from './store/slice/contentSlice.redux.js';
import { getAllCategories } from './apis/category.api.js';
import { getAllProducts } from './apis/product.api.js';

function App() {
  const dispatch = useDispatch()
  const { categories, products } = useSelector(state => state.contentStore)

  const [allCategories, setAllCategories] = useState([categories]);

  const [activeCategory, setActiveCategory] = useState('Menu');
  const [cartItems, setCartItems] = useState([]);
  const [clearedCart, setClearedCart] = useState(false);

  const [allProducts, setAllProducts] = useState([products]);

  const [productsQuantity, setProductsQuantity] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [validLogin, setValidLogin] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [loginModalWindow, setLoginModalWindow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  const getUser = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${id}`);
      const body = await response.json();
      setCurrentUser(body.data[0]);
      const jsonUser = JSON.stringify(body.data[0]);
      sessionStorage.setItem('currentUser', jsonUser);
      if (response.status === 200) {
        return true;
      }
    }
    catch (err) {
      console.log(err.message)
      return false;
    }
  }

  const updateUser = async (id, user) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        // Assuming getUser is a function that retrieves user data
        // Make sure to handle this appropriately
        const update = await getUser(id);
        if (update) {
          return true;
        }
        return true;
      } else {
        console.log("Update failed with status:", response.status);
        return false;
      }
    } catch (err) {
      console.log("Fetch error:", err.message);
      return false;
    }
  }



  useEffect(() => {
    if (sessionStorage.getItem('currentUser') !== null) {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (validLogin && sessionStorage.getItem('validLogin') === null) {
      sessionStorage.setItem('validLogin', true);
    }
    if (sessionStorage.getItem('validLogin') !== null) {
      setValidLogin(sessionStorage.getItem('validLogin'))
    }
  }, [validLogin])



  const activateLoginModal = () => {
    hideMenu();
    setLoginModalWindow(!loginModalWindow);
  }

  const handleLogout = () => {
    setValidLogin(false);
    hideMenu();
    setCurrentUser({});
    ResetLocation();
    setCartItems([]);
    setProductsQuantity(0);
    sessionStorage.clear();
  };

  const findMenuItem = (e) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();
    const collectData = products.filter(product =>
      product.ItemName.toLowerCase().includes(inputValue)
    );

    if (collectData.length > 0) {
      setAllProducts(collectData);
    } else {
      setAllProducts([]);
    }
  };

  const showModal = () => {
    setIsModalActive(!isModalActive);
  };
  const hideMenu = () => {
    setIsModalActive(false);
  };


  // GET ALL CATEGORIES FROM API
  const handleGetAllCategories = async () => {
    const result = await getAllCategories()
    if (!result.success) return
    dispatch(populateCategories(result.data))
    setAllCategories(result.data);
  };

  // GET ALL PRODUCTS FROM API
  const handleGetAllProducts = async () => {
    const result = await getAllProducts()
    if (!result.success) return
    dispatch(populateProducts(result.data))
    setAllProducts(result.data);
  };

  useEffect(() => {
    setAllCategories(categories)
  }, [categories])
  useEffect(() => {
    setAllProducts(products)
  }, [products])
  // CART LOGIC
  /*******************************************************/

  const CheckRepeatableProducts = (cartItems, targetProduct) => {
    let product = cartItems.find((item) => item._id === targetProduct._id);
    return product;
  };


  // const MatchingAttributes = (userSelectedAttributes, targetProduct) => {

  //   const attributesMatch = (groupOne, groupTwo) => {
  //     return Object.values(groupOne)[1] === Object.values(groupTwo)[1];
  //   };

  //   let truthyValuesCounter = 0;
  //   let i = 0;
  //   while (i < userSelectedAttributes.length) {
  //     if (
  //       attributesMatch(
  //         userSelectedAttributes[i],
  //         targetProduct?.userSelectedAttributes[i]
  //       )
  //     ) {
  //       truthyValuesCounter += 1;
  //     }
  //     i += 1;
  //   }

  //   return truthyValuesCounter === userSelectedAttributes?.length;
  // };

  const updateCartQuantity = (actionToPerfrom, productAlreadyInCart, userSelectedAttributes) => {
    const repeatableProduct = CheckRepeatableProducts(cartItems, productAlreadyInCart, userSelectedAttributes);
    const indexOfRepeatableProduct = cartItems.indexOf(repeatableProduct);

    const currentProductList = [...cartItems];
    if (actionToPerfrom === 'addProduct') {
      currentProductList[indexOfRepeatableProduct].quantity += 1;
    } else {
      currentProductList[indexOfRepeatableProduct].quantity -= 1;
    }

    return currentProductList;
  };
  const handleAddProduct = (targetProduct,) => {

    const productAlreadyInCart = CheckRepeatableProducts(
      cartItems,
      targetProduct,
    );

    let currentCartItems = [...cartItems];
    let newQuantity;
    //if product doesn't exists yet 
    if (productAlreadyInCart === undefined) {
      const itemToAdd = targetProduct;
      newQuantity = 1;
      currentCartItems.push({
        ...itemToAdd,
        quantity: newQuantity,
      });


    }
    //if product already exists
    else {
      let index = cartItems.findIndex(item => item._id === targetProduct._id);

      // console.log(userSelectedAttributes);
      if (index !== -1) {
        newQuantity = cartItems[index].quantity;

        currentCartItems[index] = {
          ...cartItems[index],
          quantity: newQuantity + 1,
        };

      }
    }

    const totalCartQuantity = currentCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const jsonUser = JSON.stringify(currentCartItems);
    sessionStorage.setItem('cartItems', jsonUser);
    setCartItems(currentCartItems);
    sessionStorage.setItem('cartQuantity', totalCartQuantity);
    setProductsQuantity(totalCartQuantity);
    successMsg();
  };

  useEffect(() => {
    if (sessionStorage.getItem('cartItems') !== null) {
      const jsonCartItems = sessionStorage.getItem('cartItems')
      const cartItems = JSON.parse(jsonCartItems);
      setCartItems(cartItems);
    };
    if (sessionStorage.getItem('cartQuantity') !== null) {
      setProductsQuantity(sessionStorage.getItem('cartQuantity'));
    };
  }, []);

  const handleRemoveProduct = (targetProduct, userSelectedAttributes) => {
    let updatedProductList;
    let repeatableProduct = CheckRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );

    if (repeatableProduct.quantity > 1) {
      updatedProductList = updateCartQuantity(
        'removeProduct',
        repeatableProduct,
        userSelectedAttributes
      );
    } else {
      const products = [...cartItems];
      const indexOfProduct = products.indexOf(repeatableProduct);
      products.splice(indexOfProduct, 1);
      updatedProductList = products;
    }

    setCartItems(updatedProductList);
    const jsonUser = JSON.stringify(updatedProductList);
    sessionStorage.setItem('cartItems', jsonUser);

    if (updatedProductList.length <= 1) {
      setProductsQuantity(updatedProductList[0]?.quantity || 0);
    } else {
      const productListArray = updatedProductList.map(item => item.quantity);
      const sum = productListArray.reduce((a, b) => a + b, 0);
      sessionStorage.setItem('cartQuantity', sum);
      setProductsQuantity(sum);
    }

    if (updatedProductList.length === 0) {
      sessionStorage.setItem('cartQuantity', 0);
      setProductsQuantity(0);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setClearedCart(true);
  };

  const getTotalPrice = (cartItems) => {
    let totalPayment = 0;
    let totalPrice = 0;

    for (let item of cartItems) {
      const correctPrice = item.ItemPrice;
      totalPrice += correctPrice * item.quantity;
    }

    totalPayment = parseFloat(totalPrice.toFixed(2));

    setTotalPayment(totalPayment);
    setTaxes(((totalPayment * 10) / 100).toFixed(2));
  };

  const successMsg = () => {
    const alertMessage = document.querySelector('.success-msg')
    alertMessage.classList.add('visible')
    setTimeout(() => {
      alertMessage.classList.remove('visible')
    }, 1000)
  };


  // Other
  /*******************************************************/
  const getProductsByCategory = (category) => {
    let separateCategoriesByname = []
    //Separate arrays by category names
    const separateCategories = products.reduce(function (
      singleCategory,
      singleItem,
    ) {
      separateCategoriesByname = Object.keys(singleCategory)

      if (!singleCategory[singleItem.Category])
        singleCategory[singleItem.Category] = singleItem
      else
        singleCategory[singleItem.Category] = Array.isArray(
          singleCategory[singleItem.Category],
        )
          ? singleCategory[singleItem.Category].concat(singleItem)
          : [singleCategory[singleItem.Category]].concat(singleItem)
      return singleCategory
    },
      {})

    const result = Object.keys(separateCategories).map(
      (e) => separateCategories[e],
    )

    let singleCategoryArray = []
    result.map((categories) => {
      return singleCategoryArray.push(categories)
    })
    //Change products by category
    separateCategoriesByname.forEach((cate) => {
      if (cate === category) {
        return setAllProducts(separateCategories[category])
      }
      if (category === 'Menu') {
        return setAllProducts(products)
      }
    })
  }

  useEffect(() => {
    handleGetAllCategories();
    handleGetAllProducts();
  }, [])
  useEffect(() => {
    getProductsByCategory(activeCategory);
    getTotalPrice(cartItems);
  }, [activeCategory, cartItems]);

  const changeCategory = (newCategory) => {
    setActiveCategory(newCategory);
    getProductsByCategory(newCategory);
  };

  useEffect(() => {
    const handleUpdate = (nextState) => {
      const { cartItems: nextCartItems, clearedCart: nextClearedCart, validLogin: nextValidLogin } = nextState;

      if (cartItems !== nextCartItems) {
        getTotalPrice(nextCartItems);
      }
      if (nextClearedCart) {
        clearCart();
      }
    };

    handleUpdate({
      cartItems,
      clearedCart,
      validLogin
    });
  }, [cartItems, clearedCart, validLogin]);

  return (
    <BrowserRouter>
      <Header
        loginModal={
          <LoginModal
            validLogin={validLogin}
            setValidLogin={setValidLogin}
            setLoginModalWindow={setLoginModalWindow}
            loginModalWindow={loginModalWindow}
            hideMenu={hideMenu}
            getUser={getUser}
            setCurrentUser={setCurrentUser}
          />
        }
        activateLoginModal={activateLoginModal}
        showModal={showModal}
        isModalActive={isModalActive}
        hideMenu={hideMenu}
        handleLogout={handleLogout}
        validLogin={validLogin}
        productsQuantity={productsQuantity}
      />
      <Routes>
        <Route path="/" element={<RootSection />} />

        <Route
          path="/cart"
          element={
            <Cart
              CartItem={
                <CartItem
                  clearCart={clearCart}
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                />
              }
              cartTotals={
                <CartTotals
                  className="cart-carttotals"
                  totalPayment={totalPayment}
                  productsQuantity={productsQuantity}
                  taxes={taxes}
                  validLogin={validLogin}
                  showModal={showModal}
                  isModalActive={isModalActive}
                  activateLoginModal={activateLoginModal}
                />
              }
              cartItems={cartItems}
              clearedCart={clearedCart}
            />
          }
        />

        <Route
          exact path="/menu"
          element={
            <Menu
              findMenuItem={findMenuItem}
              allProducts={allProducts}
              allCategories={allCategories}
              changeCategory={changeCategory}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              activeCategory={activeCategory}
            />
          }
        />
        <Route
          path="/menu/:name"
          element={
            <SingleItem
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={validLogin ? <NotFound /> : <Register activateLoginModal={activateLoginModal} />} />
        <Route path="/profile" element={!validLogin ? <NotFound /> : <Profile currentUser={currentUser} getUser={getUser} handleLogout={handleLogout} updateUser={updateUser} />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              checkoutSummary={
                <CheckoutSummary
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                />
              }
              totalPayment={totalPayment}
              cartItems={cartItems}
              productsQuantity={productsQuantity}
              taxes={taxes}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <Payment
              cartItems={cartItems}
              totalPayment={totalPayment}
              currentUser={currentUser}
            />
          }
        />
        {/* <Route path="/careers" element={<Careers />} /> */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/refunds" element={<Refunds />} /> */}
        {/* <Route path="/terms" element={<Terms />} /> */}
        {/* <Route path="/privacy" element={<Privacy />} /> */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

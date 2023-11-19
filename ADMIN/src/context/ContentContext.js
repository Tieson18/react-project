import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory, addProduct } from "../store/slice/contents";
import { getAllCategories } from "../apis/category.api";
import { useSelector } from "react-redux";
import { getAllProducts } from "../apis/product.api";

const ContentContext = createContext({});

const ContentContextProvider = ({ children }) => {
  const [stateName, setStateName] = useState();

  const dispatch = useDispatch();

  const handlePopulateCategory = async () => {
    const result = await getAllCategories();
    if (result && !result?.success) return;
    dispatch(addCategory(result.data));
  };

  const handlePopulateProduct = async () => {
    const result = await getAllProducts();
    console.log("PRODUCTS:", result);

    //UPDATING THE PRODUCTS IN REDUX REDUX STORE023
    if (result && !result?.success) return;
    dispatch(addProduct(result.data));
  };

  useEffect(() => {
    handlePopulateCategory();
    handlePopulateProduct();
  }, []);
  return (
    <ContentContext.Provider
      value={{
        stateName,
        setStateName,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContextProvider;

export const useContentContext = () => useContext(ContentContext);

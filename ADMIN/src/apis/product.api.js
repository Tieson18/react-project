import { PRODUCT_ENDPOINT, TOKEN, UPLOAD_ENDPOINT } from "./index.api";

export const getAllProducts = async (data) => {
  try {
    const request = await fetch(PRODUCT_ENDPOINT);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};

export const uploadFile = async (data) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(UPLOAD_ENDPOINT, options);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};

export const handleAddProduct = async (data) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(PRODUCT_ENDPOINT, options);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};

export const handleDeleteProduct = async (id) => {
  try {
    const option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json","authorization": `Bearer ${TOKEN}` },
    };
    const request = await fetch(PRODUCT_ENDPOINT + `/${id}`,option);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};
export const handleUpdateProduct = async (id, data) => {
  try {
    const options = {
      method: "PATCH",
      body: JSON.stringify( data ),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(PRODUCT_ENDPOINT + `/${id}`, options);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};
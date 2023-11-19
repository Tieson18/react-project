import { CATEGORY_ENDPOINT } from "./index.api";

export const createCategory = async (data) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(CATEGORY_ENDPOINT, options);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};

export const getAllCategories = async (data) => {
  try {
    const request = await fetch(CATEGORY_ENDPOINT);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};
export const updateCategory = async (id, name) => {
  try {
    const options = {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(CATEGORY_ENDPOINT + `/${id}`, options);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};
export const handleDeleteCategory = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(CATEGORY_ENDPOINT + `/${id}`, options);
    const response = await request.json();
    return response;
  } catch (e) {
    return {
      message: e.message,
      success: false,
    };
  }
};

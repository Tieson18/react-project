import React, { useState, useEffect } from "react";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
  RSelect,
  PreviewAltCard,
} from "../../../../components/Component";
import { DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge, Spinner } from "reactstrap";
// import { productData, categoryOptions } from "./ProductData";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../../images/product/h.png";
// import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { createCategory, handleDeleteCategory, updateCategory } from "../../../../apis/category.api";
import { toast } from "react-toastify";
import { toastStyle } from "../../../../utils/Constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../../store/slice/contents";
import { type } from "@testing-library/user-event/dist/type";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.content.categories);
  const [data, setData] = useState(categories);
  const [sm, updateSm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [isLoading, setIsLoading] = useState(false);
  // const [files, setFiles] = useState([]);

  // POPULATE THE DATA WHEN THE CATEGORIES CHANGES
  useEffect(() => {
    setData(categories);
  }, [categories]);
  
  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return item?.name?.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...categories]);
    }
  }, [onSearchText]);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
    });
    reset({});
  };

  const onFormSubmit = async (form) => {
    // API
    setIsLoading(true);
    const result = await createCategory(form);
    console.log("RESULT:", result);
    if (result && !result?.success) {
      toast(result.message, {
        ...toastStyle,
        type: "error",
      });
      setIsLoading(false);
      return;
    }
    toast(result.message, {
      ...toastStyle,
      type: "success",
    });
    const newData = [result.data, ...data];
    dispatch(addCategory(newData));
    setData(newData);
    setIsLoading(false);
    setView({ open: false });
    resetForm();
  };

  const onEditSubmit = async () => {
    let submittedData;
    setIsLoading(true);

    // UPDATE CATEGORY NAME IN DB
    const result = await updateCategory(editId, formData.name);
    if (result && !result.success) {
      toast("Error updating category!", {
        ...toastStyle,
        type: "error",
      });
      console.log("RESULT: ", result);
      setIsLoading(false);
      return;
    }
    // SHOW MESSAGE
    toast(result.success, {
      ...toastStyle,
      type: "success",
    });
    let newItems = [...data];
    console.log("NEW ITEMS:", newItems);
    let index = newItems.findIndex((item) => item._id === editId);

    newItems.forEach((item) => {
      if (item._id === editId) {
        submittedData = {
          name: formData.name,
        };
      }
    });
    // console.log("INDEX", index, "EDIT ID", editId);
    // setIsLoading(false);
    // return
    newItems[index] = submittedData;

    // UPDATE REDUX STATE
    dispatch(addCategory(newItems));

    //CLOSE MODEL AND RESET FORM
    setIsLoading(false);
    setData(newItems);
    resetForm();
    setView({ edit: false, add: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item._id === id) {
        setFormData({
          name: item.name,
        });
      }
    });
    setEditedId(id);
    // setFiles([]);
    setView({ add: false, edit: true });
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // selects all the products
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to delete a product
  const deleteCategory = async (id) => {
    let defaultData = data;
    setIsLoading(true);

    // DELETE CATEGORY
    const result = await handleDeleteCategory(id);
    if (result && !result.success) {
      toast("Error deleting category!", {
        ...toastStyle,
        type: "error",
      });
      console.log("RESULT: ", result);
      setIsLoading(false);
      return;
    }
    // SHOW MESSAGE
    toast(result.message, {
      ...toastStyle,
      type: "success",
    });
    defaultData = defaultData.filter((item) => item._id !== id);
    // UPDATE REDUX STATE
    dispatch(addCategory(defaultData));
    setIsLoading(false);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteCategory = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Categories</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Quick search by Name"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>

                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Category</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="uid_1"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="uid_1"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span>Name</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li className="me-n1">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        href="#toggle"
                        onClick={(ev) => ev.preventDefault()}
                        className="dropdown-toggle btn btn-icon btn-trigger"
                      >
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <DropdownItem tag="a" href="#edit" onClick={(ev) => ev.preventDefault()}>
                              <Icon name="edit"></Icon>
                              <span>Edit Selected</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#remove"
                              onClick={(ev) => {
                                ev.preventDefault();
                                selectorDeleteCategory();
                              }}
                            >
                              <Icon name="trash"></Icon>
                              <span>Remove Selected</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem tag="a" href="#stock" onClick={(ev) => ev.preventDefault()}>
                              <Icon name="bar-c"></Icon>
                              <span>Update Stock</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem tag="a" href="#price" onClick={(ev) => ev.preventDefault()}>
                              <Icon name="invest"></Icon>
                              <span>Update Price</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>
            {currentItems.length > 0
              ? currentItems.map((item) => {
                  return (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            defaultChecked={item.check}
                            id={item.id + "uid1"}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <span className="tb-product">
                          {/* <img src={item.img ? item.img : ProductH} alt="product" className="thumb" /> */}
                          <span className="title">{item.name}</span>
                        </span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1 my-n1">
                          <li className="me-n1">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                tag="a"
                                href="#more"
                                onClick={(ev) => ev.preventDefault()}
                                className="dropdown-toggle btn btn-icon btn-trigger"
                              >
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu end>
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#edit"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onEditClick(item._id);
                                        toggle("edit");
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>Edit Category</span>
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#view"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onEditClick(item._id);
                                        toggle("details");
                                      }}
                                    >
                                      <Icon name="eye"></Icon>
                                      <span>View Category</span>
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#remove"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        deleteCategory(item._id);
                                      }}
                                    >
                                      <Icon name="trash"></Icon>
                                      <span>Remove Category</span>
                                    </DropdownItem>
                                  </li>
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
              : null}
          </div>
          <PreviewAltCard>
            {data.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No categories found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Product</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Category Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            {...register("name", {
                              required: "This field is required",
                            })}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                          {errors.name && <span className="invalid">{errors.name.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" disabled={isLoading} type="submit">
                        {isLoading ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          <>
                            <Icon className="plus"></Icon>
                            <span>Update Category</span>
                          </>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">
                Category <small className="text-primary">#{formData?.sku}</small>
              </h4>
              <img src={formData.img} alt="" />
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Category Name</span>
                  <span className="caption-text">{formData.name}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Category</BlockTitle>
              <BlockDes>
                <p>Add information or update category.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Category Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        {...register("name", {
                          required: "This field is required",
                        })}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <Button color="primary" disabled={isLoading} type="submit">
                    {isLoading ? (
                      <Spinner size="sm" color="light" />
                    ) : (
                      <>
                        <Icon className="plus"></Icon>
                        <span>Add Category</span>
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default CategoryList;

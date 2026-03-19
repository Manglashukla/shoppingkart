// frontend/src/pages/AdminProducts.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct, deleteProduct, clearErrors } from "../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import "./AdminProducts.css";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: "DELETE_PRODUCT_RESET" });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <div className="adminProducts">
      <div className="adminProductsContainer">
        <h1 id="productListHeading">ALL PRODUCTS</h1>

        <table className="productListTable">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <Link to={`/admin/product/${item._id}`}>Edit</Link>
                    <button onClick={() => deleteProductHandler(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;

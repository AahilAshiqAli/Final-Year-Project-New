import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import PolicySidebar from "../components/policy-sidebar";
import { usePolicy } from "./PolicyContext"; // Import the custom hook
import "./perils.css"; // Custom CSS for this screen

export const Perils = () => {
  const navigate = useNavigate();
  const { updatePolicyData } = usePolicy(); // Access the updatePolicy function from context

  // State to store the list of products
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // State for quote and discount
  const [showTable, setShowTable] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState(30000); // Default quote amount
  const [discount, setDiscount] = useState(5000); // Default discount
  const [remainingAmount, setRemainingAmount] = useState(quoteAmount - discount);

  // Fetch products from the backend API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzg5ODQ2NiwiZXhwIjoxNzM3NDk4NDY2fQ.4W_qeUbok_4qNGIsi0WY7NbBA4M8YNManoHJk2GY6Wo";

        const response = await axios.get("http://localhost:3000/api/product", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as Bearer in the Authorization header
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product selection
  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setShowTable(true); // Show the quote table when a product is selected

    // Update policy context with selected product and quote details
    //ismey sirf final_quote ko nahi updaet karein ?
    updatePolicyData({
        productId,
        quoteAmount,
        discount,
        remainingAmount: quoteAmount - discount,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/policy-creation/pre-inspection");
  };

  return (
    <div className="body">
      <Navbar />
      <PolicySidebar />
      <div className="package-container">
        <div className="content-container">
          <h2 className="heading font-psemibold text-primary">
            Choose Your Plan
          </h2>

          {/* Display products dynamically */}
          <div className="package-grid">
            {products.map((product) => (
              <div
                key={product.product_id}
                className="package-card"
                onClick={() => handleProductClick(product.product_id)}
              >
                <div className="package-icon">
                  <i className="fas fa-box"></i>
                </div>
                <h3 className="package-title">{product.product_name}</h3>
              </div>
            ))}
          </div>

          {/* Quote Table Section */}
          {showTable && (
            <div className="quote-section">
              <table className="quote-table">
                <tbody>
                  <tr>
                    <td>Generated Quote</td>
                    <td>Rs {quoteAmount}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>Rs {discount}</td>
                  </tr>
                  <tr>
                    <td>Remaining</td>
                    <td>Rs {remainingAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-16">
          <button
            type="submit"
            className="py-4 px-10 bg-primary text-white font-psemibold rounded-md hover:bg-secondary transition duration-300"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perils;

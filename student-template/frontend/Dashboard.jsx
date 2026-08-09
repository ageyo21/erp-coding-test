import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/inventory/alerts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch inventory alerts');
        }
        return response.json();
      })
      .then((data) => {
        setInventoryData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (inventoryData.length === 0) {
    return <p>All inventory levels are healthy.</p>;
  }

  return (
    <div>
      <h2>Inventory Alerts</h2>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Reorder Level</th>
          </tr>
        </thead>

        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.reorder_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

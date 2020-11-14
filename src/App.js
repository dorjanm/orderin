import React, { useState } from "react";
import { Input, Typography, Modal } from "antd";
import "antd/dist/antd.css";

import "./App.css";
import SampleData from "./SampleData.json";
import Restaurant from "./components/Restaurant/Restaurant";
import { getFitleredRestaurants } from "./common/utils";
import OrderList from "./components/OrderList/OrderList";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  const { Search } = Input;
  const { Title } = Typography;

  const jsonData = JSON.parse(JSON.stringify(SampleData));

  const total = selectedMenuItems.length
    ? selectedMenuItems
        .map(({ Price }) => Price)
        .reduce((accumulator, current) => {
          return current + accumulator;
        })
    : 0;

  const productSubTitle = product ? `${product} restaurants` : "";
  const citySubTitle = location ? ` in ${location}` : "";
  const searchTitle = restaurants.length
    ? productSubTitle + citySubTitle
    : "No result.";

  const onSearch = (value) => {
    if (value) {
      const {
        productSearched,
        locationSearched,
        filteredRestaurants,
      } = getFitleredRestaurants(value, jsonData);

      const sortedRestaurants = filteredRestaurants.sort((a, b) =>
        b.Rank < a.Rank ? 1 : -1
      );

      setRestaurants(sortedRestaurants);
      setProduct(productSearched);
      setLocation(locationSearched);
    } else {
      resetState();
    }
  };

  const handleSelectMenuItem = (checked, selectedItem) => {
    const selectedItems = checked
      ? [...selectedMenuItems, selectedItem]
      : selectedMenuItems.filter(({ Id }) => Id !== selectedItem.Id);

    setSelectedMenuItems(selectedItems);
  };

  const handleNewOrder = () => {
    // Initiate new api call..
    renderModal();
  };

  const renderModal = () =>
    Modal.success({
      title: "Success",
      content: (
        <div>
          <p>Your order has been places!</p>
          <p>The rest you leave to us and the chefs!</p>
        </div>
      ),
      onOk() {
        resetState();
      },
    });

  const resetState = () => {
    setRestaurants([]);
    setProduct("");
    setLocation("");
    setSelectedMenuItems([]);
  };

  return (
    <div className="App">
      <div style={{ flex: "auto" }}>
        <Search
          placeholder="Search product or restaurant"
          onSearch={onSearch}
          enterButton
          style={{ width: "300px" }}
          size="medium"
          allowClear
        />
      </div>

      <div style={{ margin: "40px" }}>
        {product && <Title level={5}>{searchTitle}</Title>}
      </div>
      <div style={{ flex: "auto" }}>
        {restaurants.map((restaurant) => (
          <Restaurant
            restaurant={restaurant}
            key={restaurant.Id}
            selectMenuItem={handleSelectMenuItem}
          />
        ))}
      </div>
      <OrderList
        items={selectedMenuItems}
        total={total}
        onOrder={handleNewOrder}
      />
    </div>
  );
}

export default App;

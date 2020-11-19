import React, { useState } from "react";
import { Input, Typography, Modal, Radio } from "antd";
import "antd/dist/antd.css";

import "./App.css";
import SampleData from "./SampleData.json";
import Restaurant from "./components/Restaurant/Restaurant";
import { getFitleredRestaurants, getSortedRestaurants } from "./common/utils";
import OrderList from "./components/OrderList/OrderList";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [sortMethod, setSortMethod] = useState("rank");

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

  const resetState = () => {
    setRestaurants([]);
    setProduct("");
    setLocation("");
    setSelectedMenuItems([]);
  };

  // handlers
  const handleSearch = (value) => {
    if (value) {
      const {
        productSearched,
        locationSearched,
        filteredRestaurants,
      } = getFitleredRestaurants(value, jsonData);

      getSortedRestaurants(sortMethod, filteredRestaurants);

      setRestaurants(filteredRestaurants);
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

  const handleSortChange = (e) => {
    const sort = e.target.value;

    setSortMethod(sort);
    getSortedRestaurants(sort, restaurants);
  };

  // renders
  const renderSearchBar = () => (
    <Search
      placeholder="Search product or restaurant"
      onSearch={handleSearch}
      enterButton
      style={{ width: "300px" }}
      size="medium"
      allowClear
    />
  );

  const renderSortMenu = () => {
    return restaurants.length ? (
      <>
        <b style={{ marginLeft: 20 }}> Sort by: </b>
        <Radio.Group
          onChange={handleSortChange}
          value={sortMethod}
          style={{ marginBottom: 8 }}
        >
          <Radio.Button value="rank">Rank</Radio.Button>
          <Radio.Button value="relevance">Relevance</Radio.Button>
        </Radio.Group>
      </>
    ) : null;
  };

  const renderOrderList = () => (
    <OrderList
      items={selectedMenuItems}
      total={total}
      onOrder={handleNewOrder}
    />
  );

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

  return (
    <div className="App">
      <div style={{ flex: "auto" }}>
        {renderSearchBar()}
        {renderSortMenu()}
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
      {renderOrderList()}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Input, Typography } from "antd";
import "antd/dist/antd.css";

import "./App.css";
import SampleData from "./SampleData.json";
import Restaurant from "./components/Restaurant/Restaurant";
import { getFitleredRestaurants } from "./common/utils";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");

  const { Search } = Input;
  const { Title } = Typography;

  const jsonData = JSON.parse(JSON.stringify(SampleData));

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

      console.log("Filtered restaurants:", sortedRestaurants);
    } else {
      setRestaurants([]);
      setProduct("");
      setLocation("");
    }
  };

  const productSubTitle = product ? `${product} restaurants` : "";
  const citySubTitle = location ? ` in ${location}` : "";
  const searchTitle = restaurants.length
    ? productSubTitle + citySubTitle
    : "No result.";

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
        {restaurants.map((restaurant, i) => (
          <Restaurant restaurant={restaurant} key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Typography, Image } from "antd";

import MenuList from "../MenuList/MenuList";

function Restaurant({ restaurant, ...props }) {
  const { Title } = Typography;

  const { Name, Suburb, Rank, LogoPath, Categories, MenuItems } = restaurant;

  const title = `${Name} - ${Suburb} - rated #${Rank}`;
  const logo = `./${LogoPath}`;

  return (
    <div style={{ marginTop: "45px" }}>
      <Image width={200} src={logo} />
      <Title style={{ color: "grey" }} level={4}>
        {title}
      </Title>

      {Categories.map((category, i) => (
        <MenuList
          items={category.MenuItems}
          category={category}
          key={i}
          {...props}
        />
      ))}

      <MenuList items={MenuItems} {...props} />
    </div>
  );
}

export default Restaurant;

import { Checkbox, Row, Typography } from "antd";

function MenuList({ items, category }) {
  const { Title } = Typography;

  return (
    <div>
      {category && (
        <Row justify="center">
          <Row style={{ width: "300px" }} justify="start">
            <Title style={{ color: "Green" }} level={5}>
              {category.Name}
            </Title>
          </Row>
        </Row>
      )}
      <div
        className="ant-checkbox-group"
        style={{ display: "block", marginRight: 0 }}
      >
        {items.map((item) => (
          <Row justify="center">
            <Row style={{ width: "300px" }} justify="start">
              <Checkbox onChange={() => console.log("selected: ", item.Name)}>
                {item.Name}
              </Checkbox>
            </Row>
          </Row>
        ))}
      </div>
    </div>
  );
}

export default MenuList;

import { Button, Row, Typography } from "antd";

function OrderList({ items, total, onOrder }) {
  const { Text } = Typography;

  return (
    <div style={{ marginTop: "30px" }}>
      {items.map((item) => (
        <Row justify="center" key={item.Id}>
          <Row style={{ width: "300px" }} justify="center">
            <Text style={{ color: "green" }}>
              {`${item.Name} - ${item.Price}`}
            </Text>
          </Row>
        </Row>
      ))}

      {total > 0 && (
        <Row justify="center">
          <Row style={{ width: "300px" }} justify="center">
            <Text style={{ color: "red" }}>{`Total: ${total}`}</Text>
          </Row>
        </Row>
      )}

      {total > 0 && (
        <Button type="primary" style={{ marginTop: "15px" }} onClick={onOrder}>
          Order
        </Button>
      )}
    </div>
  );
}

export default OrderList;

import { Container, Typography } from "@mui/material";
import { useStateValue } from "../StateProvider";
import Items from "./Items";

const Cart = () => {
  const [{ cart }, dispatch] = useStateValue();

  const calculateTotal = () => {
    let total = 0;
    Object.values(cart).forEach(({ price, quantity }) => {
      total += price * quantity;
    });
    return total;
  };

  return (
    <div>
      {Object.keys(cart).length === 0 && <Typography>Cart is empty</Typography>}
      {Object.keys(cart).map((id, key) => {
        const { imgURL, name, price, quantity } = cart[id];
        return (
          <Items key={key} {...{ imgURL, name, price, quantity, id }} isCart />
        );
      })}
      <Container style={{ marginTop: "2vh", marginBottom: "2vh" }}>
        <Typography>Total Cart value is ₹{calculateTotal()}</Typography>
      </Container>
    </div>
  );
};

export default Cart;

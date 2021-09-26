import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";

const Items = ({ imgURL, name, price, isCart, id, quantity: cartQuantity }) => {
  const [quantity, setQuantity] = useState(cartQuantity);
  const [{ cart }, dispatch] = useStateValue();

  //   useEffect(() => {
  //     let tmpCart = cart;
  //     tmpCart[id].quantity = quantity;
  //     dispatch({ type: "SET_CART", cart: tmpCart });
  //   }, [quantity]);

  const addToCart = () => {
    dispatch({
      type: "SET_CART",
      cart: { ...cart, [id]: { quantity: 1, price, name, imgURL } },
    });
  };

  const removeFromCart = () => {
    let tmpCart = cart;
    delete tmpCart[id];
    dispatch({ type: "SET_CART", cart: tmpCart });
  };

  return (
    <Container maxWidth="lg">
      <Card style={{ marginTop: "2vh", padding: 8 }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flex: "0.2",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                maxHeight: "90%",
                maxWidth: "90%",
                paddingLeft: "2vw",
                width: "90%",
              }}
              src={imgURL}
              alt={name}
            />
          </div>
          <div style={{ flex: "0.8" }}>
            <CardContent>
              <Typography>{name}</Typography>
              <Typography>₹{price}</Typography>
              {!isCart && (
                <>
                  {cart[id]?.quantity > 0 ? (
                    <Button onClick={removeFromCart}>Remove From Cart</Button>
                  ) : (
                    <Button onClick={addToCart}>Add To Cart</Button>
                  )}
                </>
              )}
              {isCart && (
                <>
                  <div
                    style={{
                      display: "flex",
                      //   justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        if (quantity === 1) {
                          removeFromCart();
                        } else {
                          setQuantity((prev) => prev - 1);
                          let tmpCart = cart;
                          tmpCart[id].quantity = quantity - 1;
                          dispatch({ type: "SET_CART", cart: tmpCart });
                        }
                      }}
                    >
                      -
                    </Button>
                    <Typography>{quantity}</Typography>
                    <Button
                      onClick={() => {
                        setQuantity((prev) => prev + 1);
                        let tmpCart = cart;
                        tmpCart[id].quantity = quantity + 1;
                        dispatch({ type: "SET_CART", cart: tmpCart });
                      }}
                    >
                      +
                    </Button>
                  </div>
                  <Typography>Total: {quantity * price}</Typography>
                </>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Items;

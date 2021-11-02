import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PaypalButton from "../PaypalButton";
import EmptyCart from "../../assets/img/emptycart.png";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  increaseQuantity,
  decreaseQuantity,
  removeCart,
} from "../../features/cart/cartSlice";
import {
  increase,
  decrease,
  decreaseByRemove,
} from "../../features/counter/counterSlice";
import VnpPayment from "../VnpPayment";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const cartList = useSelector((state) => state.cart);
  const count = useSelector((state) => state.counter.value);

  useEffect(() => {
    totalPrice();
  }, cartList);

  const totalPrice = () => {
    let totalVal = 0;
    for (let i = 0; i < cartList.length; i++) {
      totalVal += cartList[i].price * cartList[i].quantity;
    }
    setTotal(totalVal);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant="h4" style={{ marginTop: "15vh" }}>
          Cart
        </Typography>
        <Typography variant="h6">
          You have {count} item(s) in your cart
        </Typography>
        {count === 0 ? (
          <img src={EmptyCart} alt="empty cart" />
        ) : (
          cartList &&
          cartList.map((item, i) => <CartItem item={item} key={i} />)
        )}
        {count === 0 ? (
          <></>
        ) : (
          <>
            <Typography
              variant="h6"
              style={{ textAlign: "right", marginRight: "15vh" }}
            >
              Total: {total}$
            </Typography>
            <PaypalButton total={total} />
            <VnpPayment />
            {/* <BaoKimButton /> */}
          </>
        )}
      </Container>
    </div>
  );
}

function CartItem(props) {
  const dispatch = useDispatch();

  return (
    <Grid
      container
      alignItems="center"
      style={{ borderBottom: "1px solid #eee", marginBottom: 10 }}
    >
      <Grid item xs={4} sm={4}>
        <img src={props.item.img} alt="cart" style={{ height: "10vh" }} />
        <Typography>{props.item.name}</Typography>
      </Grid>
      <Grid item xs={3} sm={3}>
        <Typography>{props.item.price}$</Typography>
      </Grid>
      <Grid item xs={3} sm={3}>
        <Grid container alignItems="center">
          <Button
            onClick={() => {
              dispatch(increaseQuantity(props.item));
              dispatch(increase());
            }}
          >
            +
          </Button>
          <Typography>{props.item.quantity}</Typography>
          {props.item.quantity === 0 ? (
            <Button disabled>-</Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(decreaseQuantity(props.item));
                dispatch(decrease());
              }}
            >
              -
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item xs={2} sm={2}>
        <Button
          onClick={() => {
            dispatch(removeCart(props.item));
            dispatch(decreaseByRemove(props.item.quantity));
          }}
        >
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

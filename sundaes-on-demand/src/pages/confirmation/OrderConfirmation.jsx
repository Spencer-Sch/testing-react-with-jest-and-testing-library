import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlertBanner from '../common/AlertBanner';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((error) => {
        setError(true);
      });
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (error) {
    // @ts-ignore
    return (
      <AlertBanner message="An unexpected error occured. Please try again later." />
    );
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;

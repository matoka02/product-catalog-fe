/* eslint-disable max-len */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FiChevronsLeft } from 'react-icons/fi';

import { clearCart, useAppDispatch, useAppSelector } from '../redux';
import { getTotalProductsCost } from '../utils/getTotalCost';
import { getTotalItemsCount } from '../utils/getTotalItemsCount';
import { Button } from '../components/Button';
import { CartItem } from '../components/CartItem';
import { CheckoutModal } from '../components/CheckoutModal';

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const { items: cartItems } = useAppSelector((state) => state.cart);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handlePaymentSuccess = () => {
    localStorage.removeItem('cart-items');
    dispatch(clearCart());

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const totalCost = getTotalProductsCost(cartItems);
  const totalItemsCount = getTotalItemsCount(cartItems);

  return (
    <>
      {showModal && (
        <CheckoutModal showModal={showModal} onCloseModal={handleCloseModal} />
      )}

      <main
        className={classNames(
          'container mx-auto flex flex-col px-4 py-6 tablet:px-6 desktop:w-[1200px] desktop:px-8',
          { 'blur pointer-events-none': showModal },
        )}
      >
        <span
          onClick={() => navigate(-1)}
          className="select-none cursor-pointer flex items-center gap-1"
        >
          <FiChevronsLeft /> Back
        </span>

        <div className="mb-8">
          <h1 className="mb-2 text-[32px] font-extrabold leading-[41px] tracking-[0.32px] tablet:mt-10 tablet:text-5xl">
            Cart
          </h1>
        </div>

        {cartItems.length ? (
          <div className="flex flex-col desktop:flex-row desktop:items-start gap-4">
            <div className="flex flex-col gap-4 w-full">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="box-border flex flex-col mx-auto desktop:mx-0 items-center rounded-lg p-6 w-full border border-elements bg-hover-bg desktop:w-[368px]">
              <h3 className="select-none text-center text-primary text-[32px] font-extrabold leading-[41px]">
                {`${totalCost}$`}
              </h3>
              <div className="text-center text-secondary text-sm font-semibold leading-[21px] mb-4">
                {`Total for ${totalItemsCount} items`}
              </div>
              <span className="w-full h-[0px] border text-elements mb-4"></span>
              <Button onClick={handlePaymentSuccess}>Checkout</Button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="mb-2">Your cart is empty</h3>
            <NavLink to="/phones" className="cursor-pointer font-bold w-fit">
              Start shopping now!
            </NavLink>
          </>
        )}
      </main>
    </>
  );
};

export default CartPage;

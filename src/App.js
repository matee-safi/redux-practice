import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal'

function App() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const { cartItems, isLoading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  
    useEffect(() => {
      dispatch(calculateTotals());
    }, [cartItems, dispatch]);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='loading'>
        <h1>Something went wrong...</h1>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className='loading'>
        <h1>Cart is empty</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
  </main>
  );
}

export default App;
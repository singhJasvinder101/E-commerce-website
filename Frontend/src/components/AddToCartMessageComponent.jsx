import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function AddToCartMessageComponent({ showCartMessage, setShowCartMessage }) {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }


  return (
    <Alert
      style={{position: 'absolute', width: '100%', zIndex: 1}}
      show={showCartMessage}
      variant="success"
      onClose={() => setShowCartMessage(false)}
      dismissible>
      <h5 className='d-flex justify-content-between flex-wrap'>Product added to your cart!
        <span>
          <button onClick={goBack} className='btn btn-success'>Go back</button>
          <Link to="/cart" className='mx-3 btn btn-danger'>Go to cart</Link>
        </span>
      </h5>
    </Alert>
  );
  // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AddToCartMessageComponent;
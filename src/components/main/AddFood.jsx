import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addFood } from "../../store/features/foodSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function AddFood() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const [foods, setFoods] = useState({
    name: '',
    history: '',
    ingredients: '',
    description: '',
    images: '',

  });
  function handleInput(e) {
    const { name, value } = e.target
    setFoods(
      {
        ...foods,
        [name]: value
      }
    )
  }
  function newFood(e) {
    e.preventDefault()
    handleClose();
    dispatch(addFood(foods))
    setFoods({...foods,
      name: '',
      history: '',
      ingredients: '',
      description: '',
      images: '',
    })
  }
  return (
    <>
      <Button variant="warning" className="text-white" onClick={handleShow}>
        Add food +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Control type="text" placeholder="Food *" value={foods.name} name="name" onChange={handleInput} />
            <Form.Control type="text" placeholder="Category *" value={foods.category}   name="history" onChange={handleInput} />
            <Form.Control type="text" placeholder="Ingredients*" value={foods.ingredients} name="ingredients" onChange={handleInput} />
            <Form.Control type="text" placeholder="Description *" value={foods.description} name="description" onChange={handleInput} />
            <Form.Control type="text" placeholder="Photo *" value={foods.images} name="images" onChange={handleInput} />


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={newFood}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFood;

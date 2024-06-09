import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from 'react-bootstrap/Toast';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import foodSlice from "../../store/features/foodSlice";
import FoodList from "./FoodList";
import { delFood, editFood} from "../../store/features/foodSlice";
import { useDispatch } from "react-redux";

export default function FoodCard({ food }) {
  /*   console.log(food); */
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);

  const [showA, setShowA] = useState(false);
  const dispatch = useDispatch()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 

  const [items, setItems] = useState({
    id:food._id,
    name: food.name,
    history: food.history,
    ingredients: food.ingredients,
    description: food.description,
    images: food.images,
  });

  function handleInput(e) {
    const { name, value } = e.target
    setItems(
      {
        ...items,
        [name]: value
      }
    )
  }

  function deleteFood(e) {
    e.preventDefault()
    setShowA(prev => !prev)
    dispatch(delFood(food._id));
  }
  function modFood() {

    handleClose()
    dispatch(editFood(items));
  }




  return (
    <>
      <Card style={{ width: "12rem" }}>
        <Card.Img
          variant="top"
          src={food.images[0]}
        />
        <Card.Body>
          <Card.Title>{food.name}</Card.Title>
          <Card.Text> {food.description}</Card.Text>
          <Card.Text> {food.price} </Card.Text>
          <div className="manage">
            <div>
              <MdEdit onClick={handleShow} />
              <MdDelete onClick={() => setShowA(prev => !prev)} style={{ color: "red" }} />
            </div>
            {active ? (
              <FaAngleUp onClick={() => setActive((prev) => !prev)} />
            ) : (
              <FaAngleDown onClick={() => setActive((prev) => !prev)} />
            )}
          </div>
          <div className={active ? "details active" : "details"}>
            <Card.Text>
              {" "}
              {food.history}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" name="name" onChange={handleInput} value={items.name} placeholder="Food *" autoFocus />
            <Form.Control type="text" name="category" onChange={handleInput} value={items.category} placeholder="Category *" />
            <Form.Control type="text" name="price" onChange={handleInput} value={items.price} placeholder="Price *" />
            <Form.Control type="text" name="description" onChange={handleInput} value={items.description} placeholder="Description *" />
            <Form.Control type="text" name="images" onChange={handleInput} value={items.images} placeholder="Photo *" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={modFood}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered={true} show={showA} onHide={() => setShowA(prev => !prev)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Food</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={() => setShowA(prev => !prev)}>
            Cancel
          </Button>
          <Button variant="success" onClick={deleteFood}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
}

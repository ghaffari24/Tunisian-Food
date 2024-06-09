import FoodCard from "./FoodCard";
import { getFood, data, loading } from "../../store/features/foodSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';


export default function FoodList() {
  const dispatch = useDispatch();

  const load = useSelector(loading);
  const foods = useSelector(data);

  console.log(load);
  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

  return (
    <section>
      {
        load ?
        <Spinner animation="border" />
          :
          foods.map((food) => (
            <FoodCard key={food._id} food={food} />))

      }
    </section>
  )
}

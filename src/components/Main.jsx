import { Container } from "react-bootstrap";
import AddFood from "./main/AddFood";
import FoodList from "./main/FoodList";


export default function Main() {
 
  return (
      <main>
        <FoodList />
        <AddFood />
      </main>
  
  );
}

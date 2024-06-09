import Navbar from "react-bootstrap/Navbar";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Header() {
  return (
    <header>
      <Navbar expand="lg" className="bg-warning">
        <RxHamburgerMenu className="burger"/>
        <Navbar.Brand href="#">TUNISIAN FOOD 3W</Navbar.Brand>
      </Navbar>
    </header>
  );
}

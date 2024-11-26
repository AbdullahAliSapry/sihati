import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import PersonalData from "./components/PersonalData";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
const { searchStyle, styleImg } = styles;

function NavBar() {
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const myElementRef = useRef<HTMLInputElement>(null);
  const searchElement = useRef<HTMLElement>(null);
  const handleInputChange = () => {
    setShowSearchIcon(false);
  };
  const handleInputBlur = () => {
    if (!myElementRef.current?.value) {
      setShowSearchIcon(true);
    }
  };
  const { user, userConfirmationDoctor } = useSelector(
    (state: RootState) => state.Auth
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary" variant="light" dir="rtl">
      <Container>
        <Navbar.Brand as="div" className="p-0 ">
          <img
            className={styleImg}
            src="https://t4.ftcdn.net/jpg/01/22/04/45/360_F_122044550_CjRVM90rIus8RcB2B3jVe5DX0myf6DF8.jpg"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-around">
          <Nav
            className="my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Nav.Link as={NavLink} to={"/"}>
              الرئيسة
            </Nav.Link>
            {user && (
              <Nav.Link as={NavLink} to={`/user-profile/${user.data.user._id}`}>
                حسابك
              </Nav.Link>
            )}
            <NavDropdown title="المحافظات" id="navbarScrollingDropdown">
              <NavDropdown.Item as={"span"}>سوهاج</NavDropdown.Item>
              <NavDropdown.Item as={"span"}>منيا</NavDropdown.Item>
              <NavDropdown.Item as={"span"}>القاهره</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to={"/about-us"}>
              من نحن
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/contact-us"}>
              {" "}
              تواصل معنا
            </Nav.Link>
          </Nav>
          <Form className="d-flex" noValidate>
            <div className={searchStyle}>
              <Form.Control
                type="search"
                ref={myElementRef}
                placeholder="بحث"
                className="me-2"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              {showSearchIcon && (
                <i ref={searchElement} className={`bi bi-search-heart`}></i>
              )}
            </div>
          </Form>
          <div>
            <PersonalData />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

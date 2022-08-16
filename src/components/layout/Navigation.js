import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/ImgLogin/logo3nav.png";
import "../../Styles/GeneralStyles.css";
import Swal from 'sweetalert2'

const Navigation = () => {

  let session = JSON.parse(sessionStorage.getItem("stateSession") || false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (session) {
      session = false;
      sessionStorage.setItem("stateSession", JSON.stringify(session));

      let timerInterval;
      Swal.fire({
        title: "Cerrando sesión",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div>
      <Navbar className="navbar" expand="lg">
        <Container>
          <Navbar.Brand className="logo" href="/">
            Vet Rolling
            <img className="imglogo px-4" src={logo} />
            {" "}
          </Navbar.Brand>
          <Navbar.Toggle className="bg-warning mb-2" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto">
              {session ? (
                <>
                  <Nav.Link className="nav-link na mx-4  text-decoration-none text-center" href="/">Home</Nav.Link>
                  <Nav.Link className="nav-link na mx-4  text-decoration-none text-center" href="/SobreNosotros">Sobre Nosotros</Nav.Link>
                  <Nav.Link className="nav-link na mx-4  text-decoration-none text-center" href="/Contacto">Contacto</Nav.Link>
                  <NavDropdown title=" Administrador" id="basic-nav-dropdown"  href="/PagAdmin" className=" mx-4  text-decoration-none text-center" >
                    <NavDropdown.Item  href="/PagAdmin"> 👤 Perfil </NavDropdown.Item>
                    <NavDropdown.Item href="*"> ⚙️ Configuracion </NavDropdown.Item>
                    <NavDropdown.Item href="*"> ✉️ Mensaje</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Nav.Link onClick={handleLogOut}
                    className="nav-link na mx-3  text-decoration-none text-center" >Cerrar Sesión</Nav.Link>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link className="nav-link na mx-4  text-decoration-none text-center" href="/">Home</Nav.Link>
                  <Nav.Link className="nav-link na mx-4  text-decoration-none text-center" href="/SobreNosotros">Sobre Nosotros</Nav.Link>
                  <Nav.Link className="nav-link na mx-4  text-decoration-none text-center" href="/Contacto">Contacto</Nav.Link>
                  <Nav.Link className="btn-registro na mx-4  text-decoration-none text-center" href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;

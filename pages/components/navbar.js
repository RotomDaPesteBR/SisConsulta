import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function MainNavbar() {
    return (
        <Navbar style={stylesheet} bg="dark" variant='dark'>
        <Container>
          <Navbar.Brand href="./">SisConsulta</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="./">Início</Nav.Link>
              <Nav.Link href="./consultas">Consultas</Nav.Link>
              <Nav.Link href="./pacientes">Pacientes</Nav.Link>
              <Nav.Link href="./medicos">Médicos</Nav.Link>
              <Nav.Link href="./convenios">Convênios</Nav.Link>
              <Nav.Link href="./relatorios">Relatórios</Nav.Link>
            </Nav>
          </Navbar.Collapse>  
        </Container>
      </Navbar>
        )
}

const stylesheet = {
    position: "fixed",
    top: "0",
    height: "65px",
    zIndex: "10",
    width: "100%"
}

import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">My Portfolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <header className="hero-section">
        <Container className="text-center">
          <Row>
            <Col>
              <h1 className="display-3 text-light">Welcome to My Portfolio</h1>
              <p className="lead text-light">
                I'm a passionate web developer creating cool websites!
              </p>
              <Button variant="primary" href="#about">Learn More</Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* About Section */}
      <section id="about" className="py-5">
        <Container>
          <Row>
            <Col md={6}>
              <h2>About Me</h2>
              <p>
                I'm a full-stack developer with a focus on front-end technologies like React, JavaScript, and CSS.
                I have a passion for building user-friendly websites and applications.
              </p>
            </Col>
            <Col md={6}>
              <img src="your-image.jpg" alt="Your Image" className="img-fluid rounded-circle" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-light py-5">
        <Container>
          <Row>
            <Col>
              <h2>My Skills</h2>
              <p>Here are some technologies I've worked with:</p>
              <ul>
                <li>React</li>
                <li>Node.js</li>
                <li>JavaScript</li>
                <li>HTML & CSS</li>
                <li>Git & GitHub</li>
                <li>Bootstrap</li>
                {/* Add more skills as needed */}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3" id="contact">
        <Container>
          <p>&copy; 2024 Your Name | All rights reserved.</p>
          <p>Contact me at: <a href="mailto:youremail@example.com" className="text-white">youremail@example.com</a></p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;


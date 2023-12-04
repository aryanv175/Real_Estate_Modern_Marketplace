import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css'; // Import your custom CSS

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <Navbar bg="purdue-black" variant="dark" expand="lg" className="shadow-md">
      <Navbar.Brand as={Link} to="/" className="text-purdue-gold" style={{ fontWeight: 'bold' , marginLeft: '10px'}}>
        AYA Estate
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="text-purdue-gold" >
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="text-purdue-gold">
            About
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={handleSubmit} className="flex ml-3">
          <FormControl
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-light" type="submit">
            <FaSearch />
          </Button>
        </Form>
        <Nav className="ml-auto">
          {currentUser ? (
            <Nav.Link as={Link} to="/profile">
              <div
                className="max-w-[200px] text-purdue-gold"
                style={{ marginRight: '20px' }}
              > Profile </div>
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/sign-in" className="text-purdue-gold">
              Sign in
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

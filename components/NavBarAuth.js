/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar id="navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="nav">
            <Link passHref href="/">
              <Nav.Link id="logo">YOURWARDROBE</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>GENERATE</Nav.Link>
            </Link>
            <Link passHref href="/items">
              <Nav.Link>PIECES</Nav.Link>
            </Link>
            <Link passHref href="/outfits">
              <Nav.Link>OUTFITS</Nav.Link>
            </Link>
            <Button id="sign-out" onClick={signOut}>SIGN OUT</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

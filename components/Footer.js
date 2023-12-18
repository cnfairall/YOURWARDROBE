import React from 'react';
import { Navbar } from 'react-bootstrap';

export default function PageFooter() {
  return (
    <>
      <Navbar
        style={{
          color: 'white', padding: '20px', marginBottom: '-50px', height: '60px', width: '100%', backgroundColor: 'black',
        }}
      >
        ©CNF 2023
      </Navbar>
    </>
  );
}

import React from 'react';
import { Navbar } from 'react-bootstrap';

export default function PageFooter() {
  return (
    <>
      <Navbar
        fixed="bottom"
        style={{
          height: '40px', width: '100%', backgroundColor: 'black',
        }}
      >
        ©CNF
      </Navbar>
    </>
  );
}

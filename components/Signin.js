/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Frame } from 'react95';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vh',
        backgroundColor: 'black',
      }}
      id="sign-in"
    >
      <Frame
        id="box"
        style={{
          padding: '30px',
          margin: '0 auto',
        }}
      >
        <h1>YOURWARDROBE</h1>
        <Button className="save" onClick={signIn}>
          Sign In
        </Button>
      </Frame>
    </div>
  );
}

export default Signin;

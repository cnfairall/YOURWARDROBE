/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      style={{
        padding: '30px',
        margin: '0 auto',
        height: '100vh',
      }}
      id="sign-in"
    >
      <img className="hanger" alt="hanger" src="/assets/flip.jpg" />
      <div
        style={{
          padding: '30px',
          margin: '0 auto',
          height: '50vh',
        }}
        className="text-center d-flex flex-column justify-content-center align-content-center jello-diagonal-1"
      >
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;

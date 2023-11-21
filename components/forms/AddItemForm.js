/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createItem, updateItem } from '../../api/itemData';

const initialState = {
  name: '',
  brand: '',
  imageUrl: '',
  isTop: false,
};

export default function ItemForm({ itemObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (itemObj.firebaseKey) setFormInput(itemObj);
  }, [itemObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (itemObj.firebaseKey) {
      updateItem(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateItem(patchPayload).then(() => router.push('/'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div>
          <h1>{itemObj.firebaseKey ? 'UPDATE' : 'ADD'} PIECE</h1>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="enter image URL"
              name="imageUrl"
              value={formInput.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>BRAND</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={formInput.brand}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="name"
              placeholder="e.g. Long Sleeve Crew Neck Sweater"
              value={formInput.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">{itemObj.firebaseKey ? 'Update' : 'Create'} Piece
          </Button>
        </div>
        <img src={formInput.imageUrl} alt={formInput.name} />

      </Form>
    </>
  );
}

ItemForm.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    brand: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  itemObj: initialState,
};

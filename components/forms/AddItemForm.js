/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { StyledButton, Frame } from 'react95';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { createItem, updateItem } from '../../api/itemData';
import { storage } from '../../utils/client';

const initialState = {
  name: '',
  brand: '',
  imageUrl: '',
  isTop: false,
};

export default function ItemForm({ itemObj }) {
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setFormInput(initialState);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (itemObj.firebaseKey) setFormInput(itemObj);
  }, [itemObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const uploadFiles = (file) => {
    const uploadTask = storage.ref(`files/${user.uid}/${file.name}`).put(file);
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(prog);
    }, (error) => console.log(error),
    () => {
      storage.ref(`files/${user.uid}`).child(file.name).getDownloadURL().then((url) => {
        setImgUrl(url);
        setFormInput((prevState) => ({
          ...prevState,
          imageUrl: imgUrl,
        }));
      });
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    uploadFiles(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (itemObj.firebaseKey) {
      updateItem(formInput).then(() => {
        handleShow();
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateItem(patchPayload).then(() => {
          handleShow();
        });
      });
    }
  };

  return (
    <>
      <Frame>
        <h1>{itemObj.firebaseKey ? 'UPDATE' : 'ADD'} PIECE</h1>
        <div>
          <Form onSubmit={handleUpload} className="form">
            <input type="file" />
            <button type="submit">Upload</button>
          </Form>
          {!imgUrl && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progress}%` }}>{progress}%</div>
          </div>
          )}
          {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
        </div>
        <Form id="add" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="imageUrl"
              value={formInput.imageUrl}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              className="mb-3"
              type="switch"
              id="top"
              name="top"
              label="top?"
              checked={formInput.isTop}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  isTop: e.target.checked,
                }));
              }}
            />
            {/* <ToggleButtonGroup
                name="toggle-type"
                // type="radio"
              >
                <ToggleButton
                  id="toggle-top"
                  value="top"
                  checked={formInput.isTop}
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      isTop: e.target.checked,
                    }));
                  }}
                >TOP
                </ToggleButton>
                <br />
                <ToggleButton
                  id="toggle-bottom"
                  value="bottom"
                >BOTTOM
                </ToggleButton>
              </ToggleButtonGroup> */}
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
          <Button className="save" type="submit">{itemObj.firebaseKey ? 'Update' : 'Create'} Piece
          </Button>

        </Form>
      </Frame>

      <Modal show={show} onHide={handleClose}>
        <Frame>
          <Modal.Header closeButton>
            <Modal.Title>TOTALLY BITCHIN!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You {itemObj.firebaseKey ? 'updated' : 'added'} a piece {itemObj.firebaseKey ? 'in' : 'to'} your wardrobe!</p>
            <div className="btn-grp">
              {itemObj.firebaseKey
                ? (
                  <Link passHref href="/items">
                    <StyledButton className="black m-2">
                      EDIT ANOTHER
                    </StyledButton>
                  </Link>
                )
                : (
                  <StyledButton className="black m-2" onClick={handleClose}>
                    ADD ANOTHER
                  </StyledButton>
                )}
              <Link passHref href="/">
                <StyledButton className="pink m-2">
                  MAKE OUTFITS
                </StyledButton>
              </Link>
            </div>
          </Modal.Body>
        </Frame>
      </Modal>
    </>
  );
}

ItemForm.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
    brand: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  itemObj: initialState,
};

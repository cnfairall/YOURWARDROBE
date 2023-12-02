/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import {
  Form, Modal, Button, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
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
  fileName: '',
  isTop: false,
};

export default function ItemForm({ itemObj }) {
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setFormInput(initialState);
    setImgUrl('');
    setProgress(0);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (itemObj.firebaseKey) {
      setFormInput(itemObj);
      setImgUrl(itemObj.imageUrl);
    }
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
          imageUrl: url,
          fileName: file.name,
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
      <Frame id="frame">
        <h1 style={{ border: '2px dotted black' }}>{itemObj.firebaseKey ? 'UPDATE' : 'ADD'} PIECE</h1>
        <div id="form-top">
          <div
            className="column"
            style={{ width: '100%' }}
          >
            <Form
              id="upload"
              onSubmit={handleUpload}
              className="form"
            >
              <input type="file" />
              <button type="submit">Upload</button>
            </Form>
            {!imgUrl && (
            <div className="outerbar">
              <div className="innerbar" style={{ width: `${progress}%` }}>{progress}%</div>
            </div>
            )}
          </div>
        </div>
        <Form id="add" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              style={{ display: 'none' }}
              type="text"
              name="imageUrl"
              value={formInput.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <div id="form-mid">
            <div className="column wide">
              <ToggleButtonGroup
                id="toggle"
                name="isTop"
                type="radio"

              >
                <ToggleButton
                  className="styled"
                  id="toggle-top"
                  value="foo"
                  style={{ marginRight: '5px' }}
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      isTop: Boolean(e.target.value),
                    }));
                  }}
                >TOP
                </ToggleButton>

                <ToggleButton
                  className="styled"
                  id="toggle-bottom"
                  value=""
                  style={{ marginLeft: '5px' }}
                  onChange={(e) => {
                    setFormInput((prevState) => ({
                      ...prevState,
                      isTop: Boolean(e.target.value),
                    }));
                  }}
                >BOTTOM
                </ToggleButton>
              </ToggleButtonGroup>
              <Form.Group className="mb-3">
                <Form.Label>BRAND</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={formInput.brand}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            {imgUrl && <img src={imgUrl} alt="uploaded file" width={150} height={200} />}
          </div>
          <div id="form-btm">
            <Form.Group
              className="wide"
            >
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
            <Button id="add-item-btn" className="save" type="submit">{itemObj.firebaseKey ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      </Frame>

      <Modal show={show} onHide={handleClose}>
        <Frame>
          <Modal.Header closeButton>
            <Modal.Title>TOTALLY BITCHIN!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="row">
              <div>You {itemObj.firebaseKey ? 'updated' : 'added'} a piece {itemObj.firebaseKey ? 'in' : 'to'} your wardrobe!</div>
              <img id="pen" className="rock" src="/assets/pen.png" alt="fluffy pen animation" style={{ height: '70px' }} />
            </div>
            <div className="btn-grp">
              {itemObj.firebaseKey
                ? (
                  <Link passHref href="/items">
                    <StyledButton primary className="m-2">
                      EDIT ANOTHER
                    </StyledButton>
                  </Link>
                )
                : (
                  <StyledButton primary className="m-2" onClick={handleClose}>
                    ADD ANOTHER
                  </StyledButton>
                )}
              <Link passHref href="/">
                <StyledButton primary className="black m-2">
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
    fileName: PropTypes.string,
    firebaseKey: PropTypes.string,
    brand: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  itemObj: initialState,
};

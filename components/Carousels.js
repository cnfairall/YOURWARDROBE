/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  Stack,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../api/itemData';
import { createOutfit, updateOutfit } from '../api/outfitData';

const initialState = {
  name: '',
  topId: '',
  bottomId: '',
};

export default function ItemCarousels({ outfitObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const [items, setItems] = useState([]);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  const handleTopSelect = (selectedIndex) => {
    setTopIndex(selectedIndex);
  };

  const handleBottomSelect = (selectedIndex) => {
    setBottomIndex(selectedIndex);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // .then((prevState) => {
  //   const top = items.tops?.find((item) => item.firebaseKey === formInput.topId);
  //   console.warn('here', top);
  //   console.warn('hi', prevState);
  // });

  useEffect(() => {
    getItems(user.uid).then(setItems);
    if (outfitObj.firebaseKey) setFormInput(outfitObj);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTop = items.tops[topIndex];
    const selectedBottom = items.bottoms[bottomIndex];
    const payload = {
      ...formInput,
      uid: user.uid,
      topId: selectedTop.firebaseKey,
      bottomId: selectedBottom.firebaseKey,
    };
    if (outfitObj.firebaseKey) {
      updateOutfit(payload).then(() => router.push('/outfits'));
    } else {
      createOutfit(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateOutfit(patchPayload).then(() => router.push('/outfits'));
      });
    }
  };
  // find((key) => item[key] === formInput.topId).

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Stack direction="horizontal" gap={3}>
            <Carousel interval={null} activeIndex={topIndex} onSelect={handleTopSelect}>
              {items.tops?.map((item) => (
                <Carousel.Item
                  as="img"
                  key={item.firebaseKey}
                  src={formInput.firebaseKey ? (
                    Object.values(item).map((i) => i.imageUrl)) : item.imageUrl}
                  // alt={}
                />
              ))}
              {/* {outfitObj.firebaseKey
                ? (<Carousel.Item as="img" key={editTop.firebaseKey} src={editTop.imageUrl} alt={editTop.name} />)
                : (items.tops?.map((item) => (
                  <Carousel.Item as="img" key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
                ))
                )}
              {outfitObj.firebaseKey
                ? (items.tops?.map((item) => (
                  <Carousel.Item as="img" key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
                )))
                : <></>} */}
            </Carousel>
          </Stack>
          <br />
          <Stack direction="horizontal" gap={3}>
            <Carousel interval={null} activeIndex={bottomIndex} onSelect={handleBottomSelect}>
              {/* {outfitObj.firebaseKey
                ? (<Carousel.Item as="img" key={editBottom.firebaseKey} src={editBottom.imageUrl} alt={editBottom.name} />)
                : (items.bottoms?.map((item) => (
                  <Carousel.Item as="img" key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
                ))
                )} */}
            </Carousel>
          </Stack>
        </Stack>
        <Button onClick={handleShow}>SAVE OUTFIT</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>CONFIRM SAVE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="name"
              >
                <Form.Label>Enter description (optional):</Form.Label>
                <Form.Control
                  name="name"
                  value={formInput.name}
                  as="textarea"
                  rows={3}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              CANCEL
            </Button>
            <Button onClick={handleSubmit}>
              SAVE
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}

ItemCarousels.propTypes = {
  outfitObj: PropTypes.shape({
    name: PropTypes.string,
    topId: PropTypes.string,
    bottomId: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

ItemCarousels.defaultProps = {
  outfitObj: initialState,

};

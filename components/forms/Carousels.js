/* eslint-disable no-param-reassign */
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
import { StyledButton, Frame } from 'react95';
import { useAuth } from '../../utils/context/authContext';
import { getItems } from '../../api/itemData';
import { createOutfit, updateOutfit } from '../../api/outfitData';

const initialState = {
  name: '',
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

  useEffect(() => {
    getItems(user.uid).then(setItems);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (outfitObj.firebaseKey) {
      updateOutfit(formInput).then(() => router.push('/outfits'));
    } else {
      const selectedTop = items.tops[topIndex];
      const selectedBottom = items.bottoms[bottomIndex];
      const payload = {
        ...formInput,
        uid: user.uid,
        topId: selectedTop.firebaseKey,
        bottomId: selectedBottom.firebaseKey,
      };
      createOutfit(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateOutfit(patchPayload).then(() => router.push('/outfits'));
      });
    }
  };

  return (
    <>
      <Frame style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Form id="generator" onSubmit={handleSubmit}>
          <Stack id="stack" gap={1}>
            <Stack direction="horizontal" gap={3}>
              {items.tops?.length === 0 ? (<div>Click PIECES to build your wardrobe!</div>)

                : (
                  <Carousel variant="dark" slide={null} interval={null} activeIndex={topIndex} onSelect={handleTopSelect}>
                    {items.tops?.map((item) => (
                      <Carousel.Item as="img" key={item.firebaseKey} src={item.imageUrl} alt={item.name} style={{ margin: '0 50px', width: '150px', height: '200px' }} />
                    ))}
                  </Carousel>
                )}
            </Stack>
            <Stack direction="horizontal" gap={3}>
              {items.bottoms?.length === 0 ? (<div>Click PIECES to build your wardrobe!</div>)
                : (
                  <Carousel variant="dark" slide={null} interval={null} activeIndex={bottomIndex} onSelect={handleBottomSelect}>
                    {items.bottoms?.map((item) => (
                      <Carousel.Item as="img" key={item.firebaseKey} src={item.imageUrl} alt={item.name} style={{ width: '250px', height: '300px' }} />
                    ))}
                  </Carousel>
                )}
            </Stack>
          </Stack>
          <Button style={{ margin: '20px' }} className="save" onClick={handleShow}>SAVE OUTFIT</Button>
          <Modal show={show} onHide={handleClose}>
            <Frame>
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
              <Modal.Footer className="btn-grp">
                <StyledButton className="black m-2" onClick={handleClose}>
                  CANCEL
                </StyledButton>
                <StyledButton className="pink m-2" onClick={handleSubmit}>
                  SAVE
                </StyledButton>
              </Modal.Footer>
            </Frame>
          </Modal>
        </Form>
      </Frame>
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

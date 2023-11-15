/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  Stack,
  Form,
  Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../api/itemData';

const initialState = {
  topId: '',
  bottomId: '',
};

export default function ItemCarousels() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  const handleTopSelect = (selectedIndex) => {
    setTopIndex(selectedIndex);
  };

  const handleBottomSelect = (selectedIndex) => {
    setBottomIndex(selectedIndex);
  };

  useEffect(() => {
    getItems(user.uid).then(setItems);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (memberObj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/members'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => router.push('/members'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Stack direction="horizontal" gap={3}>
            <Carousel interval={null} activeIndex={topIndex} onSelect={handleTopSelect}>
              {items.tops?.map((item) => (
                <Carousel.Item as="img" key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
              ))}
            </Carousel>
          </Stack>
          <br />
          <Stack direction="horizontal" gap={3}>
            <Carousel interval={null} activeIndex={bottomIndex} onSelect={handleBottomSelect}>
              {items.bottoms?.map((item) => (
                <Carousel.Item as="img" key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
              ))}
            </Carousel>
          </Stack>
          <Button>SAVE OUTFIT</Button>
        </Stack>
      </Form>
    </>
  );
}

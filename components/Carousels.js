/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Carousel, Stack, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../api/itemData';

export default function ItemCarousels() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  const handleTopSelect = (selectedIndex) => {
    setTopIndex(selectedIndex);
  };

  const handleBottomSelect = (selectedIndex) => {
    setBottomIndex(selectedIndex);
  };

  const sortItems = () => {
    getItems(user.uid).then(setItems);
  };

  useEffect(() => {
    sortItems();
  }, []);

  return (
    <>
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
      </Stack>
    </>
  );
}

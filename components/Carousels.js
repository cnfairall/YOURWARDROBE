/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../api/itemData';

function TopCarousel() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [tops, setTops] = useState([]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const sortItems = () => {
    getItems(user.uid).then(setItems);
    setTops(items.filter((item) => (item.isTop === true)));
  };

  useEffect(() => {
    sortItems();
  }, []);

  return (
    <>
      <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
        {tops.map((item) => (
          <Carousel.Item>
            <img key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

function BottomCarousel() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [bottoms, setBottoms] = useState([]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const sortItems = () => {
    getItems(user.uid).then(setItems);
    setBottoms(items.filter((item) => (item.isTop === false)));
  };

  useEffect(() => {
    sortItems();
  }, []);

  return (
    <>
      <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
        {bottoms.map((item) => (
          <Carousel.Item>
            <img key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export { TopCarousel, BottomCarousel };

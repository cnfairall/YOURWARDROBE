/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../api/itemData';

export default function ItemCarousels() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const sortItems = () => {
    getItems(user.uid).then(setItems);
    setTops(items.filter((item) => (item.isTop === true)));
    setBottoms(items.filter((item) => (item.isTop === false)));
  };

  useEffect(() => {
    sortItems();
  }, []);

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {tops.map((item) => (
          <Carousel.Item>
            <img key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {bottoms.map((item) => (
          <Carousel.Item>
            <img key={item.firebaseKey} src={item.imageUrl} alt={item.name} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

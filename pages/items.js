import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../api/itemData';
import ItemCard from '../components/ItemCard';

export default function ShowItems() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const getAllItems = () => {
    getItems(user.uid).then(setItems);
  };
  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/item/new" passHref>
          <Button className="save">ADD PIECE</Button>
        </Link>
        <h1 className="white">TOPS</h1>
        <div id="top-container" className="flex-row">
          {items.tops?.map((item) => (
            <ItemCard key={item.firebaseKey} itemObj={item} onUpdate={getAllItems} />
          ))}
        </div>
        <h1 className="white">BOTTOMS</h1>
        <div className="flex-row">
          {items.bottoms?.map((item) => (
            <ItemCard key={item.firebaseKey} itemObj={item} onUpdate={getAllItems} />
          ))}
        </div>
      </div>
    </>
  );
}

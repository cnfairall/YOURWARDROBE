import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StyledButton } from 'react95';
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
          <StyledButton className="pink">ADD PIECE</StyledButton>
        </Link>
        <h1>TOPS</h1>
        <div id="top-container">
          {items.tops?.map((item) => (
            <ItemCard key={item.firebaseKey} itemObj={item} onUpdate={getAllItems} />
          ))}
        </div>
        <h2>BOTTOMS</h2>
        <div id="bottom-container">
          {items.bottoms?.map((item) => (
            <ItemCard key={item.firebaseKey} itemObj={item} onUpdate={getAllItems} />
          ))}
        </div>
      </div>
    </>
  );
}

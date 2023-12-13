/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { getOutfits } from '../api/outfitData';
import { useAuth } from '../utils/context/authContext';
import OutfitCard from '../components/OutfitCard';

export default function ShowOutfits() {
  const [outfits, setOutfits] = useState([]);
  const { user } = useAuth();
  const getAllOutfits = () => {
    getOutfits(user.uid).then(setOutfits);
  };
  useEffect(() => {
    getAllOutfits();
  }, []);

  return (
    <>
      {outfits?.length === 0 ? (
        <div className="column">
          <h2 className="pink" style={{ padding: '20px' }}>
            You have no outfits saved!
          </h2>
          <div id="makeover-gif" />
        </div>
      )
        : (

          <div className="text-center my-4 flex-row">
            {outfits.map((outfit) => (
              <OutfitCard key={outfit.firebaseKey} outfitObj={outfit} onUpdate={getAllOutfits} />
            ))}
          </div>
        )}
    </>

  );
}

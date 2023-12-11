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
      <div className="text-center my-4 flex-row">
        {outfits.map((outfit) => (
          <OutfitCard key={outfit.firebaseKey} outfitObj={outfit} onUpdate={getAllOutfits} />
        ))}
      </div>
    </>
  );
}

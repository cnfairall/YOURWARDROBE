import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemCarousels from '../../../components/Carousels';
import { getSingleOutfit } from '../../../api/outfitData';

export default function EditOutfit() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleOutfit(firebaseKey).then(setEditItem);
  }, []);

  return (
    <>
      <ItemCarousels outfitObj={editItem} />
    </>
  );
}

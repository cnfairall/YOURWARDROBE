import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemCarousels from '../../../components/Carousels';
import { getSingleOutfit } from '../../../api/outfitData';
import { getSingleItem } from '../../../api/itemData';

export default function EditOutfit() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [editTop, setEditTop] = useState({});
  const [editBottom, setEditBottom] = useState({});

  useEffect(() => {
    getSingleOutfit(firebaseKey).then((outfit) => {
      getSingleItem(outfit.topId).then(setEditTop);
      getSingleItem(outfit.bottomId).then(setEditBottom);
      setEditItem(outfit);
    }, [firebaseKey]);
  });

  return (
    <>
      <ItemCarousels outfitObj={editItem} editTop={editTop} editBottom={editBottom} />
    </>
  );
}

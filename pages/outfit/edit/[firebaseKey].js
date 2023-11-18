import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemCarousels from '../../../components/Carousels';
import { getSingleOutfit } from '../../../api/outfitData';
import { getSingleItem } from '../../../api/itemData';

// const initialState = {
//   name: '',
//   topId: '',
//   bottomId: '',
//   firebaseKey: '',
// };

export default function EditOutfit() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [editTop, setEditTop] = useState({});
  const [editBottom, setEditBottom] = useState({});

  const setTopAndBottom = (outfit) => {
    getSingleItem(outfit.topId).then(setEditTop);
    getSingleItem(outfit.bottomId).then(setEditBottom);
  };

  useEffect(() => {
    getSingleOutfit(firebaseKey).then((outfit) => {
      setEditItem(outfit);
      setTopAndBottom(outfit);
    }, []);
  });

  return (
    <>
      <ItemCarousels outfitObj={editItem} editTop={editTop} editBottom={editBottom} />
    </>
  );
}

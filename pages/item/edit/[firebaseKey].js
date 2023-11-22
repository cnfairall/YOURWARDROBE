import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleItem } from '../../../api/itemData';
import ItemForm from '../../../components/forms/AddItemForm';

export default function EditItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleItem(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<ItemForm itemObj={editItem} />);
}

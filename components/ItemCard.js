import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteBottomOutfits, deleteTopOutfits } from '../api/mergedData';

export default function ItemCard({ itemObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAnItem = () => {
    if (itemObj.isTop === true) {
      deleteTopOutfits(itemObj.firebaseKey).then(() => onUpdate());
    } else {
      deleteBottomOutfits(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '10rem', margin: '10px' }}>
        <Card.Body>
          <Card.Img src={itemObj.imageUrl} alt={itemObj.name} className="item" />
          <Link href={`/item/edit/${itemObj.firebaseKey}`} passHref>
            <Button>EDIT</Button>
          </Link>
          <Button variant="danger" className="m-2" onClick={handleShow}>
            DELETE
          </Button>
        </Card.Body>

      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE ITEM?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this item from your wardrobe?</p>
          <Button onClick={handleClose}>
            CANCEL
          </Button>
          <Button onClick={deleteAnItem}>
            DELETE
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    brand: PropTypes.string,
    imageUrl: PropTypes.string,
    isTop: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};

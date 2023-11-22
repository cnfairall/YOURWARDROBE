import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Card, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleItem } from '../api/itemData';
import { deleteOutfit } from '../api/outfitData';

export default function OutfitCard({ outfitObj, onUpdate }) {
  const [topObj, setTopObj] = useState({});
  const [bottomObj, setBottomObj] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAnOutfit = () => {
    deleteOutfit(outfitObj.firebaseKey).then(() => onUpdate());
  };

  const getTopAndBottom = () => {
    getSingleItem(outfitObj.topId).then(setTopObj);
    getSingleItem(outfitObj.bottomId).then(setBottomObj);
  };

  useEffect(() => {
    getTopAndBottom();
  }, []);

  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Img src={topObj?.imageUrl} alt={topObj?.name} className="outfitTop" />
          <Card.Img src={bottomObj?.imageUrl} alt={bottomObj?.name} className="outfitBottom" />
          {/* <Link href={`/outfit/edit/${outfitObj.firebaseKey}`} passHref>
          <Button>EDIT</Button>
        </Link> */}
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
          <Button onClick={deleteAnOutfit}>
            DELETE
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

OutfitCard.propTypes = {
  outfitObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    topId: PropTypes.string,
    bottomId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};

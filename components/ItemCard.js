import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Frame, StyledButton } from 'react95';
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
      <Frame className="item-card">
        <Card style={{ width: '10rem', margin: '10px' }}>
          <Card.Body className="item">
            <Card.Img style={{ height: '200px', width: '150px' }} src={itemObj.imageUrl} alt={itemObj.name} className="item" />
            <div className="btn-grp">
              <Link href={`/item/edit/${itemObj.firebaseKey}`} passHref>
                <StyledButton primary className="m-2">EDIT</StyledButton>
              </Link>
              <StyledButton primary className="black m-2" onClick={handleShow}>
                DELETE
              </StyledButton>
            </div>
          </Card.Body>
        </Card>
      </Frame>
      <Modal show={show} onHide={handleClose}>
        <Frame>
          <Modal.Header closeButton>
            <Modal.Title>DELETE ITEM?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this item from your wardrobe?</p>
            <div className="btn-grp">
              <StyledButton primary className="m-2" onClick={handleClose}>
                CANCEL
              </StyledButton>
              <StyledButton primary className="black m-2" onClick={deleteAnItem}>
                DELETE
              </StyledButton>
            </div>
          </Modal.Body>
        </Frame>
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

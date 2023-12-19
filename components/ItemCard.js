import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Frame, StyledButton } from 'react95';
import { deleteBottomOutfits, deleteTopOutfits } from '../api/mergedData';
import { storage } from '../utils/client';
import { useAuth } from '../utils/context/authContext';

export default function ItemCard({ itemObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();

  const deleteImg = () => {
    const url = `gs://wardrobe-c1d45.appspot.com/files/${user.uid}/${itemObj.fileName}`;
    const imgRef = storage.refFromURL(url);

    imgRef.delete().then(() => {
    })
      .catch((error) => {
        console.log(error);
      });
  };
  const [details, setDetails] = useState(false);
  const handleDetails = () => {
    if (details === true) {
      setDetails(false);
    } else {
      setDetails(true);
    }
  };

  const deleteAnItem = () => {
    if (itemObj.isTop === true) {
      deleteTopOutfits(itemObj.firebaseKey).then(() => onUpdate());
    } else {
      deleteBottomOutfits(itemObj.firebaseKey).then(() => onUpdate());
    }
    deleteImg();
  };

  return (
    <>
      <Frame className="item-card">
        <Card style={{ width: '10rem', margin: '10px' }}>
          <Card.Body>
            <Card.Img style={{ height: '200px', width: '150px' }} src={itemObj.imageUrl} alt={itemObj.name} className="item" />
            {details
              && (
                <div className="deets">
                  <div>BRAND: {itemObj.brand}</div>
                  <div>DESCRIPTION: {itemObj.name}</div>
                </div>
              )}
            <div className="btn-grp">
              <StyledButton primary onClick={handleDetails}>
                VIEW
              </StyledButton>
              <Link href={`/item/edit/${itemObj.firebaseKey}`} passHref>
                <StyledButton primary className="edit">EDIT</StyledButton>
              </Link>
              <StyledButton primary className="black" onClick={handleShow}>
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
            <p className="vt323">Are you sure you want to remove this item from your wardrobe?</p>
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
    fileName: PropTypes.string,
    isTop: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};

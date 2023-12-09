import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Card, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Frame, StyledButton } from 'react95';
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
      <Card className="styled" style={{ width: '15rem', margin: '10px' }}>
        <Card.Body>
          <div>
            <Card.Img style={{ height: '200px', objectFit: 'fit' }} src={topObj?.imageUrl} alt={topObj?.name} className="outfitTop" />
            <Card.Img style={{ height: '250px', objectFit: 'fit' }} src={bottomObj?.imageUrl} alt={bottomObj?.name} className="outfitBottom" />
            <p style={{ textAlign: 'center' }}>{outfitObj.name}</p>
          </div>
          <div>
            <StyledButton id="delete-outfit" primary className="black" onClick={handleShow}>
              DELETE
            </StyledButton>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Frame>
          <Modal.Header closeButton>
            <Modal.Title>DELETE ITEM?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this outfit from your wardrobe?</p>
            <div className="btn-grp">
              <StyledButton className="m-2" primary onClick={handleClose}>
                CANCEL
              </StyledButton>
              <StyledButton primary className="black m-2" onClick={deleteAnOutfit}>
                DELETE
              </StyledButton>
            </div>
          </Modal.Body>
        </Frame>
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

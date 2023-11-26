import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { Card, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MenuList, StyledButton } from 'react95';
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
        <MenuList>
          <Card.Body>
            <Card.Img style={{ height: '150px', objectFit: 'fit' }} src={topObj?.imageUrl} alt={topObj?.name} className="outfitTop" />
            <Card.Img style={{ height: '250px', objectFit: 'fit' }} src={bottomObj?.imageUrl} alt={bottomObj?.name} className="outfitBottom" />
            {/* <Link href={`/outfit/edit/${outfitObj.firebaseKey}`} passHref>
          <Button>EDIT</Button>
        </Link> */}
            <div>
              <StyledButton className="black m-2" onClick={handleShow}>
                DELETE
              </StyledButton>
            </div>
          </Card.Body>
        </MenuList>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <MenuList>
          <Modal.Header closeButton>
            <Modal.Title>DELETE ITEM?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this outfit from your wardrobe?</p>
            <StyledButton onClick={handleClose}>
              CANCEL
            </StyledButton>
            <StyledButton className="black" onClick={deleteAnOutfit}>
              DELETE
            </StyledButton>
          </Modal.Body>
        </MenuList>
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

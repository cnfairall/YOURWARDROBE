import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleItem } from '../api/itemData';

export default function OutfitCard({ outfitObj }) {
  const [topObj, setTopObj] = useState({});
  const [bottomObj, setBottomObj] = useState({});

  const getTopAndBottom = () => {
    getSingleItem(outfitObj.topId).then(setTopObj);
    getSingleItem(outfitObj.bottomId).then(setBottomObj);
  };

  useEffect(() => {
    getTopAndBottom();
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px', border: '3px solid gold' }}>
      <Card.Body>
        <Card.Img src={topObj.imageUrl} alt={topObj.name} className="outfitTop" />
        <Card.Img src={bottomObj.imageUrl} alt={bottomObj.name} className="outfitBottom" />
      </Card.Body>

    </Card>
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

};

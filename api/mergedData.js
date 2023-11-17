import { getSingleItem } from './itemData';
import { getSingleOutfit } from './outfitData';

const getSingleImage = (itemFirebaseKey) => new Promise((resolve, reject) => {
  getSingleItem(itemFirebaseKey).then((item) => {
    resolve({ itemImage: item.imageUrl });
  })
    .catch((error) => reject(error));
});

// const getTopAndBottomPics = (firebaseKey) => new Promise((resolve, reject) => {
//   const outfit = getSingleOutfit(firebaseKey);
//   const topPic = getSingleImage(outfit.topId);
//   const bottomPic = getSingleImage(outfit.bottomId);

//   resolve({ topPic, bottomPic })

//   .catch((error) => reject(error));
// });

const getTopAndBottom = async (firebaseKey) => {
  const outfit = await getSingleOutfit(firebaseKey);
  const top = await getSingleItem(outfit.topId);
  const bottom = await getSingleItem(outfit.bottomId);

  return { top, bottom };
};

export { getTopAndBottom, getSingleImage };

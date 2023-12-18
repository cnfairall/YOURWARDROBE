import { deleteOutfit, getOutfitsWithBottom, getOutfitsWithTop } from './outfitData';
import { deleteItem } from './itemData';

// delete all outfits with top, delete top
const deleteTopOutfits = (itemId) => new Promise((resolve, reject) => {
  getOutfitsWithTop(itemId).then((outfitArray) => {
    const deleteOutfitPromises = outfitArray.map((outfit) => deleteOutfit(outfit.firebaseKey));

    Promise.all(deleteOutfitPromises).then(() => {
      deleteItem(itemId).then(resolve);
    });
  }).catch((error) => reject(error));
});

// delete all outfits with bottom, delete bottom
const deleteBottomOutfits = (itemId) => new Promise((resolve, reject) => {
  getOutfitsWithBottom(itemId).then((outfitArray) => {
    const deleteOutfitPromises = outfitArray.map((outfit) => deleteOutfit(outfit.firebaseKey));

    Promise.all(deleteOutfitPromises).then(() => {
      deleteItem(itemId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { deleteTopOutfits, deleteBottomOutfits };

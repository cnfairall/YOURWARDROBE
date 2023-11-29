import { deleteOutfit, getOutfitsWithBottom, getOutfitsWithTop } from './outfitData';
import { deleteItem } from './itemData';

const deleteTopOutfits = (itemId) => new Promise((resolve, reject) => {
  getOutfitsWithTop(itemId).then((outfitArray) => {
    const deleteOutfitPromises = outfitArray.map((outfit) => deleteOutfit(outfit.firebaseKey));

    Promise.all(deleteOutfitPromises).then(() => {
      deleteItem(itemId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteBottomOutfits = (itemId) => new Promise((resolve, reject) => {
  getOutfitsWithBottom(itemId).then((outfitArray) => {
    const deleteOutfitPromises = outfitArray.map((outfit) => deleteOutfit(outfit.firebaseKey));

    Promise.all(deleteOutfitPromises).then(() => {
      deleteItem(itemId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { deleteTopOutfits, deleteBottomOutfits };

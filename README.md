# YOURWARDROBE  [![Netlify Status](https://api.netlify.com/api/v1/badges/fe7072bb-f499-4b35-b67c-2ffbd1e4de63/deploy-status)](https://app.netlify.com/sites/monumental-boba-0bee52/deploys)

Remember the 90s movie Clueless, where rich-girl-with-heart-of-gold Cher clicks through her clothes and assembles bitchin' outfits on her computer? Aspire no more, because now you can create your own digital wardrobe and generate outfits you can save!

[View App](https://yourwardrobe.netlify.app/)

## About the User
- You: a fashionista who has amazing pieces in your closet but who suffers from the "out of sight, out of mind" dilemma and ends up wearing the same athleisure all the time.
- You want to get new styling ideas for clothes you already have, so you can avoid buying new things but still feel a total Betty.
- YOURWARDROBE allows you to catalogue your wardrobe and generate random outfits you can change, save and make notes on, providing both a visual reminder of your closet treasures and styling inspiration!

## Features
- YOURWARDROBE is user-specific, utilizing Firebase authentication. User-generated data is only viewable when signed in.
- The user can add pieces to their wardrobe on the PIECES page, where they select an image file to upload, select TOP or BOTTOM, and input more information like brand and description.
- The added pieces appear on the PIECES page, in the TOPS or BOTTOMS container as selected. Each piece appears on a card that allows the user to view details, edit details, or delete the piece. When a piece is deleted, any outfits made with that piece are also deleted.
- The GENERATE page features the outfit generator carousels, which display one top and one bottom at a time. When pieces are fetched, a Durstenfeld shuffle randomizes their arrangement so that a different top and bottom will be paired on each load.
- The user can change the generated outfit by clicking next and previous controls, and save the outfit by clicking the save button.
- The save button opens a modal that allows a description or note to be added to the outfit, and then submits the outfit to the database.
- The user can view all of their saved outfits on the OUTFITS page, and delete those no longer wanted.

## Video Walkthrough of YOURWARDROBE
https://www.loom.com/share/34f7be53ae3f431880ec4d45e75f4f3d

## Code Snippet
Creating the outfit object with the item carousel/generator form:

```
const handleSubmit = (e) => {
    e.preventDefault();
    if (outfitObj.firebaseKey) {
      updateOutfit(formInput).then(() => router.push('/outfits'));
    } else {
      const selectedTop = items.tops[topIndex];
      const selectedBottom = items.bottoms[bottomIndex];
      const payload = {
        ...formInput,
        uid: user.uid,
        topId: selectedTop.firebaseKey,
        bottomId: selectedBottom.firebaseKey,
      };
      createOutfit(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateOutfit(patchPayload).then(() => router.push('/outfits'));
      });
    }
  };

```

## Relevant Links
- [Check out the deployed site](https://yourwardrobe.netlify.app/)
- [Wireframes](https://www.figma.com/file/99ZqMmpb5zE9t6spYkFj5E/YOURWARDROBE?type=design&node-id=0-1&mode=design&t=cNCh5kz5necI8dAP-0)
- [Project Board](https://github.com/users/cnfairall/projects/4/views/1)

## Project Screenshots
<img width="1148" alt="index/generator page" src="/public/assets/generator.png">
<img width="1148" alt="outfits page" src="/public/assets/outfits.png">
<img width="1148" alt="add piece form" src="/public/assets/add.png">
<img width="1148" alt="pieces page" src="/public/assets/pieces.png">
<img width="1148" alt="piece details" src="/public/assets/view.png">
<img width="1148" alt="edit piece form" src="/public/assets/edit.png">


## Contributors
- [Courtney Nuding Fairall](https://github.com/cnfairall)

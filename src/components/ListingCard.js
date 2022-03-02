import React from "react";

function ListingCard({ listing, handleFavoriteClick, handleDeletedListing }) {
  const { id, image, description, location, isFavorited } = listing;

  const onFavoriteClick = () => {
    handleFavoriteClick(id, !isFavorited);
  }

  const onDeleteClick = () => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "DELETE"
    })
    .then(handleDeletedListing(id));
  }
  
  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={description} />
      </div>
      <div className="details">
        {isFavorited ? (
          <button className="emoji-button favorite active" onClick={() => onFavoriteClick()}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={() => onFavoriteClick()}>☆</button>
        )}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={() => onDeleteClick()}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;

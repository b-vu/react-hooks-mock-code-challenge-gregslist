import { React, useState, useEffect } from "react";
import ListingCard from "./ListingCard"

function ListingsContainer({ search }) {
  const [listings, setListings] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    image: "",
    location: ""
  });

  useEffect(() => {
    fetch("http://localhost:6001/listings")
    .then(res => res.json())
    .then(data => {
      const newListings = data.map(listing => {
        return {
          ...listing,
          isFavorited: false
        }
      });
      setListings(newListings);
    });
  }, []);

  const handleFavoriteClick = (id, isFavoritedBoolean) => {
    const updatedArray = listings.map(listing => {
      if(listing.id === id){
        return {
          ...listing,
          "isFavorited": isFavoritedBoolean
        };
      }
      else{
        return listing;
      }
    });
    setListings(updatedArray);
  }

  const handleDeletedListing = listingId => {
    const updatedArray = listings.filter(listing => listing.id !== listingId);
    setListings(updatedArray);
  }

  const renderListings = searchTerm => {
    const searchedListings = listings.filter(listing => listing.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    if(isSorted){
      searchedListings.sort((a, b) => a.location.localeCompare(b.location));
    }
    return searchedListings;
  }

  const handleFormChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleFormSubmit = event => {
    event.preventDefault();

    fetch("http://localhost:6001/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      setListings([...listings, data]);
      setFormData({
        description: "",
        image: "",
        location: ""
      })
    });
  }

  console.log(listings);

  return (
    <main>
      <br></br>
      <button onClick={() => setIsSorted(!isSorted)}>Sort Alphabetically By Location</button>
      <h1>Add item</h1>
      <form onSubmit={handleFormSubmit}>
        <input placeholder="Description" name="description" value={formData.description} onChange={handleFormChange}></input>
        <input placeholder="Image" name="image" value={formData.image} onChange={handleFormChange}></input>
        <input placeholder="Location" name="location" value={formData.location} onChange={handleFormChange}></input>
        <button>Add Item</button>
      </form>
      <ul className="cards">
        {renderListings(search).map(listing => <ListingCard key={listing.id} listing={listing} handleFavoriteClick={handleFavoriteClick} handleDeletedListing={handleDeletedListing}></ListingCard>)}
      </ul>
    </main>
  );
}

export default ListingsContainer;

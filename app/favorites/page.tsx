import getCurrentUser from "@/actions/getCurrentUser";
import getFavoritesListings from "@/actions/getFavoritesListings";
import EmptyState from "@/components/EmptyState";
import React from "react";
import FavoritesClient from "./favoritesClient";

const ListingPage = async () => {
  const listings = await getFavoritesListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites listings"
      />
    );
  }

  return (
    <FavoritesClient 
    listings={listings}
    currentUser={currentUser}
    />
  )
};

export default ListingPage;

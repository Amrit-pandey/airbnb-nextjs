import getCurrentUser from "@/actions/getCurrentUser"
import getListingById from "@/actions/getListingById"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/actions/getReservations"

interface IParams {
  listingId?: string
}

const ListingPage = async({params}: {params: IParams}) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = getCurrentUser()

  if(!listing) {
    return(
      <EmptyState />
    )
  }
  return (
    <div>
      <ListingClient 
      listing={listing}
      reservations={reservations}
      currentUser = {currentUser}
      />
    </div>
  )
}

export default ListingPage
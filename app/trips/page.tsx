import getCurrentUser from "@/actions/getCurrentUser"
import EmptyState from "@/components/EmptyState"

const tripsPage = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return(
            <EmptyState 
            title="unauthorized"
            subtitle="Please login"
            />
        )
    }
}
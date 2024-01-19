import getCurrentUser from "./getCurrentUser";
import prisma from '@/libs/prismadb'

export default async function getFavoritesListings() {
    try{
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })

        return favorites
    }catch(error: any) {
        throw new Error(error)
    }
}
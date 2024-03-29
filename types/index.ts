import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
User,
'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createAt: string;
    updatedAt: string;
    emailVerified: string | null
}

export type SafeListing = Omit<Listing, 'createdAt'> & {
createdAt: string
}

export type SafeReservation = Omit<Reservation, 'createdAt' | 'startDate' | 'endDate' | 'Listing'> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: SafeListing
}
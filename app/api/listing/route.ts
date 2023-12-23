import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    price,
    location,
  } = body;
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      roomCount,
      bathroomCount,
      price: parseInt(price, 10),
      guestCount,
      category,
      locationValue: location.value,
      userId: currentUser.id,
    },
  });

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      throw NextResponse.error();
    }
  });

  return NextResponse.json(listing);
}

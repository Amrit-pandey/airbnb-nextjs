'use client'
import useCountries from '@/hooks/useCountry';
import useSearchModal from '@/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiSearch} from 'react-icons/bi'

const Search = () => {
    const searchModal = useSearchModal()
    const params = useSearchParams()
    const {getByValue} = useCountries()

    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationLabel = useMemo(() => {
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }

        return 'Anywhere'
    }, [getByValue, locationValue])

    const durationLabel = useMemo(() => {
        if(startDate && endDate) {
            const start = new Date(startDate as string)
            const end = new Date(endDate as string)
            let diff = differenceInDays(end, start)

            if(diff === 0){
                diff = 1
            }

            return `${diff} Days`
        }

        return 'Any week'
    }, [startDate, endDate])

    const guestLabel = useMemo(() => {
        if(guestCount) {
            return `${guestCount} Guests`
        }

        return 'Add Guests'
    }, [guestCount])


    return(
        <div onClick={searchModal.onOpen} className="border-[1px] rounded-full shadow-sm hover:shadow-md transition cursor-pointer py-2">
            <div className="flex flex-row justify-between items-center">
                <div className="text-sm font-semibold px-6">
                   {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold border-x-[1px] flex-1 text-center px-6">
                   {durationLabel}
                </div>
                <div className="text-sm font-semibold pl-6 pr-2 text-neutral-500 gap-5 flex flex-row items-center">
                    <div className="hidden md:block">
                        {guestLabel}
                    </div>
                    <div className='bg-rose-500 text-white rounded-full p-2'>
                       <BiSearch/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;
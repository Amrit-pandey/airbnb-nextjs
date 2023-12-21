import {BiSearch} from 'react-icons/bi'

const Search = () => {
    return(
        <div className="border-[1px] rounded-full shadow-sm hover:shadow-md transition cursor-pointer py-2">
            <div className="flex flex-row justify-between items-center">
                <div className="text-sm font-semibold px-6">
                    Anywhere
                </div>
                <div className="hidden sm:block text-sm font-semibold border-x-[1px] flex-1 text-center px-6">
                    Anyweek
                </div>
                <div className="text-sm font-semibold pl-6 pr-2 text-neutral-500 gap-5 flex flex-row items-center">
                    <div className="hidden md:block">
                        Add Guests
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
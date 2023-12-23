'use client'

import useRentModal from "@/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter()
    const rentModal = useRentModal()
    const [steps, setSteps] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount  = watch('bathroomCount')
    const imageSrc = watch('imageSrc')


    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setSteps((value) => value - 1);
      }
    
      const onNext = () => {
        setSteps((value) => value + 1);
      }

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(steps !== STEPS.PRICE){
            return onNext()
        }

        setIsLoading(true)

        axios.post('/api/listing', data)
        .then(() => {
            toast.success('Listing Created')
            router.refresh()
            reset()
            setSteps(STEPS.CATEGORY)
            rentModal.onClose()
        })
        .catch((err) => {
            toast.error('Something went wrong')
        })
        .finally(() => {
            setIsLoading(false)
        })
      }

    const actionLabel = useMemo(() => {
       if(steps === STEPS.PRICE) {
        return 'Create'
       }

       return 'Next'
    }, [steps])

    const secendoryActionLabel = useMemo(() => {
        if(steps === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [steps])

     let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title="which of these best describe your place?"
            subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div className="col-span-1" key={item.label}>
                        <CategoryInput 
                        onClick = {(category) => setCustomValue('category', category)}
                        selected={category === item.label}
                        label={item.label}
                        icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
     )

     if(steps === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="where is your location?"
                subtitle="Help guests to find you"
                />
                <CountrySelect 
                value={location}
                onChange={(value) => setCustomValue('location', value)}
                />
                <Map 
                center={location?.latlng}
                />
            </div>
        )
     }
     
     if(steps === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Share some basics about your place"
                subtitle="What amenities do you have"
                />
                <Counter 
                title="Guests"
                value={guestCount}
                subtitle="How many guests do you allowed?"
                onChange={(value) => setCustomValue("guestCount", value)}
                />
                <hr />
                <Counter 
                title="Rooms"
                value={roomCount}
                subtitle="How many rooms do you have?"
                onChange={(value) => setCustomValue("roomCount", value)}
                />
                 <hr />
                <Counter 
                title="bathroomCount"
                value={bathroomCount}
                subtitle="How many bathrooms do you want?"
                onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        )
     }

     if(steps === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Add a photo of your place"
                subtitle="Show guests what your place looks like"
                />
                <ImageUpload 
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
     }

     if(steps === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="How would you describe your place?"
                subtitle="Short and sweet work best!"
                />
                <Input 
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr />
                 <Input 
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
     }

     if(steps === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Now, set your price"
                subtitle="How much do you charge per night?"
                />
                <Input 
                id="price"
                label="Price"
                disabled={isLoading}
                register={register}
                errors={errors}
                formatPrice
                type="Number"
                />
            </div>
        )
     }

  return (
    <Modal 
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secendoryActionLabel={secendoryActionLabel}
    secendoryAction={steps === STEPS.CATEGORY ? undefined : onBack}
    title="Airbnb your home"
    body={bodyContent}
    />
  )
}

export default RentModal
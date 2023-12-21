'use client'

import useRentModal from "@/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import Map from "../Map"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal()
    const [steps, setSteps] = useState(STEPS.CATEGORY)

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

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setSteps((value) => value - 1)
    }

    const onNext = () => {
        setSteps((value) => value + 1)
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
                <Map />
            </div>
        )
     }

  return (
    <Modal 
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={onNext}
    actionLabel={actionLabel}
    secendoryActionLabel={secendoryActionLabel}
    secendoryAction={steps === STEPS.CATEGORY ? undefined : onBack}
    title="Airbnb your home"
    body={bodyContent}
    />
  )
}

export default RentModal
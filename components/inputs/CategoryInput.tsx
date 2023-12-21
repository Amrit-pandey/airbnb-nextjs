import { IconType } from "react-icons"

interface CategoryInputProps {
    onClick: (value: string) => void
    label: string
    selected? : boolean
    icon: IconType
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    label,
    selected,
    icon: Icon
}) => {
  return (
    <div onClick={() => onClick(label)}
    className={`
    rounded-xl
    border-2
    p-4
    flex
    flex-col
    hover:border-black
    gap-3
    transition
    cursor-pointer
    ${selected ? 'border-black' : 'border-neutral-200'}
    `}
    >
    <Icon size={30}/>
    <div className="font-semibold">
        {label}
    </div>
    </div>
  )
}

export default CategoryInput
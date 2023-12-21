import Container from "../container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types";

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return(
        <div className="fixed z-10 bg-white w-full shadow-sm">
            <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex flex-row justify-between items-center gap-3 md:gap-0 cursor-pointer">
                <Logo />
                <Search />
                <UserMenu currentUser={currentUser}/>
                </div>
            </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar;
import LowerNav from "./lower_nav";
import UpperNav from "./upper_nav";

export default function Header() {
    return (
        <header className='shadow'>
            <UpperNav />
            <LowerNav />
        </header>
    )
}

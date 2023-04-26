import { Link } from "react-router-dom";
const Header = () => {
    return(
        <>
            <ul>
                <li>
                    <Link to="/todolist">TodoList</Link>
                </li>
                <li>
                    <Link to="/counter">Counter</Link>
                </li>
            </ul>
        </>
    )
}

export default Header;
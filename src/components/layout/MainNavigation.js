import {NavLink} from "react-router-dom";

import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
    return <div className={styles.header}>
        <div className={styles.logo}>
            Great quotes
        </div>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink activeClassName={styles.active} to='/quotes'>All quotes</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to='/add-quote'>Add new quote</NavLink>
                </li>
            </ul>
        </nav>
    </div>
}

export default MainNavigation;

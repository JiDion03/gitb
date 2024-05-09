import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="menu">
            <ol>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/orders">Recent Orders</Link></li>
            </ol>
        </div>
    );
}

export default Sidebar;

import {NavLink, useLocation} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar,faCog,faSun, faBasketball,faCalendar, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import './mainNavigation.css'

export const MainNavigation = () => {
    return (
        <div className='d-flex flex-column justify-content-center' style={{borderBottom:'3px groove whitesmoke',marginBottom:'20px'}}>
            <h3 style={{color:'#7e91dc',textAlign:'center'}}>To-Do List</h3>
            {
                useLocation().pathname !== '/' && <div className='d-flex justify-content-center'>
                    <NavLink to={'/'} className='link' style={{color:'goldenrod'}}>
                        {' '}
                        <FontAwesomeIcon icon={faCog} className='icon'/><span>Manage Tasks</span>
                    </NavLink>
                </div>
            }
            <div className='d-flex justify-content-center'>
                <NavLink to={'/projects'} className='link' style={{color:'hotpink'}}>
                    {' '}
                    <FontAwesomeIcon icon={faCog} className='icon'/><span>Manage Projects</span>
                </NavLink>
            </div>
            <div className='d-flex justify-content-center'>
                <NavLink to={'/favourite'} className='link' style={{color:'coral'}}>
                    {' '}
                    <FontAwesomeIcon icon={faStar} className='icon'/><span>Favourites</span>
                </NavLink>
            </div>
            <div className='d-flex justify-content-center'>
                <NavLink to={'/myday'} className='link' style={{color:'lightpink'}}>
                    {' '}
                    <FontAwesomeIcon icon={faSun} className='icon'/><span>My Day</span>
                </NavLink>
            </div>
            <div className='d-flex justify-content-center'>
                <NavLink to={'/myweek'} className='link' style={{color:'dodgerblue'}}>
                    {' '}
                    <FontAwesomeIcon icon={faBasketball} className='icon'/><span>My Week</span>
                </NavLink>
            </div>
            <div className='d-flex justify-content-center'>
                <NavLink to={'/mymonth'} className='link' style={{color:'firebrick'}}>
                    {' '}
                    <FontAwesomeIcon icon={faCalendar} className='icon'/><span>My Month</span>
                </NavLink>
            </div>
            <div className='d-flex justify-content-center'>
                <NavLink to={'/search'} className='link' style={{color:'peachpuff'}}>
                    {' '}
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon'/><span>Search</span>
                </NavLink>
            </div>
        </div>
    );
}
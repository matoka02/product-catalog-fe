import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import classNames from 'classnames';
import {
  FiHeart,
  FiMenu,
  FiShoppingBag,
  FiUser,
  FiUserMinus,
  FiX,
} from 'react-icons/fi';

import BurgerMenu from '../pages/BurgerMenu';
import logo from '../assets/images/logo.svg';
import { useAppSelector } from '../redux';
import { ItemCounter } from './ItemCounter';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { favoriteItems } = useAppSelector((state) => state.favorites);
  const { items } = useAppSelector((state) => state.cart);
  const iconColor = classNames('dark:text-primary-dark');

  const { t } = useTranslation();
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();

  const navLinks = [
    { name: t('Home'), path: '/' },
    { name: t('Phones'), path: 'phones' },
    { name: t('Tablets'), path: 'tablets' },
    { name: t('Accessories'), path: 'accessories' },
  ];

  const handleOpenMenu = () => setMenuIsOpen((prev) => !prev);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(
      'uppercase text-secondary-light dark:text-secondary-dark duration-150 hover:border-b-4 hover:border-primary-light dark:hover:border-primary-dark pb-6 font-extrabold text-xs hover:text-primary-light dark:hover:text-primary-dark relative active:text-primary-light dark:active:text-primary-dark focus:text-primary-light dark:focus:text-primary-dark font-Mont',
      {
        'text-primary-light dark:text-primary-dark border-b-4 border-primary-light dark:border-primary-dark':
          isActive,
      },
    );

  const handleSignIn = () => {
    if (isAuthenticated) {
      return logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      return loginWithPopup();
    }
  };

  useEffect(() => {
    setMenuIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky bg-white-light dark:bg-hover-bg-dark z-50 top-0 h-12 tablet:h-16 border-b border-elements-light dark:border-elements-dark pl-4 desktop:pl-6 flex justify-between items-center">
      <div className="flex justify-start gap-6">
        <NavLink to="/" className="flex">
          <img src={logo} className="object-cover" alt="Nice gadgets" />
        </NavLink>

        <nav className="hidden tablet:flex">
          <ul className="flex tablet:space-x-8 desktop:space-x-16 tablet:px-4 desktop:px-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink className={getLinkClass} to={`${link.path}`}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-end">
        <ThemeToggle />
        <LanguageSelector />

        <div className="border-l border-elements-light dark:border-elements-dark box-border">
          <span
            className="relative cursor-pointer hover:shadow-lg dark:hover:shadow-custom-dark duration-200 px-4 py-6 desktop:p-6 hidden tablet:flex"
            onClick={handleSignIn}
          >
            {isAuthenticated ? (
              <FiUserMinus className={iconColor} />
            ) : (
              <FiUser className={iconColor} />
            )}
          </span>
        </div>
        <div className="border-l border-elements-light dark:border-elements-dark box-border">
          <NavLink
            className="relative hover:shadow-lg dark:hover:shadow-custom-dark duration-200 px-4 py-6 desktop:p-6 hidden tablet:flex"
            to="/favorites"
          >
            <FiHeart className={iconColor} />
            <ItemCounter count={favoriteItems.length} />
          </NavLink>
        </div>
        <div className="border-l border-elements-light dark:border-elements-dark box-border mx-0">
          <NavLink
            className="relative hover:shadow-lg dark:hover:shadow-lg-dark duration-200 px-4 py-6 desktop:p-6 hidden tablet:flex justify-end"
            to="/cart"
          >
            <FiShoppingBag className={iconColor} />
            <ItemCounter count={items.length} />
          </NavLink>
          <span className="flex p-4 tablet:hidden">
            <input
              type="checkbox"
              id="nav__toggle"
              className="hidden peer/nav z-50"
              onChange={handleOpenMenu}
              checked={menuIsOpen}
            />
            <label htmlFor="nav__toggle">
              {menuIsOpen ? (
                <FiX className={iconColor} />
              ) : (
                <FiMenu className={iconColor} />
              )}
            </label>
            <BurgerMenu />
          </span>
        </div>
      </div>
      <BurgerMenu />
    </header>
  );
};

export default Header;

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

import { useAppSelector } from '../redux';
import { ItemCounter } from '../components/ItemCounter';

const BurgerMenu = () => {
  const { favoriteItems } = useAppSelector((state) => state.favorites);
  const { items } = useAppSelector((state) => state.cart);
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 top-12 z-50 bg-white-light dark:bg-white-dark -translate-x-full peer-checked/nav:-translate-x-0 duration-300 flex justify-between flex-col ">
      <main className="flex-grow mt-6">
        <NavLink
          to="/"
          className="block py-2 mt-4 leading-tight text-center text-secondary-light dark:text-secondary-dark text-xs uppercase tracking-widest transition-colors hover:text-primary-light dark:hover:text-primary-dark"
        >
          <p className="whitespace-nowrap">{t('home')}</p>
        </NavLink>
        <NavLink
          to="/phones"
          className="block py-2 mt-4 leading-tight text-center text-secondary-light dark:text-secondary-dark text-xs uppercase tracking-widest transition-colors hover:text-primary-light dark:hover:text-primary-dark"
        >
          <p className="whitespace-nowrap">{t('phones')}</p>
        </NavLink>
        <NavLink
          to="/tablets"
          className="block py-2 mt-4 leading-tight text-center text-secondary-light dark:text-secondary-dark text-xs uppercase tracking-widest transition-colors hover:text-primary-light dark:hover:text-primary-dark"
        >
          <p className="whitespace-nowrap">{t('tablets')}</p>
        </NavLink>
        <NavLink
          to="/accessories"
          className="block py-2 mt-4 leading-tight text-center text-secondary-light dark:text-secondary-dark text-xs uppercase tracking-widest transition-colors hover:text-primary-light dark:hover:text-primary-dark"
        >
          <p className="whitespace-nowrap">{t('accessories')}</p>
        </NavLink>
      </main>

      <footer className="flex justify-between">
        <NavLink
          to="/favorites"
          className="w-1/2 h-16 border border-elements-light dark:border-elements-dark flex items-center justify-center relative group transition-opacity duration-300"
        >
          <FiHeart className="dark:text-primary-dark" />
          <ItemCounter count={favoriteItems.length} />
          <span className="absolute w-full h-0.5 bg-primary-light dark:bg-primary-dark bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </NavLink>
        <NavLink
          to="/cart"
          className="w-1/2 h-16 border border-elements-light dark:border-elements-dark flex items-center justify-center relative group transition-opacity duration-300"
        >
          <FiShoppingBag className="dark:text-primary-dark" />
          <ItemCounter count={items.length} />
          <span className="absolute w-full h-0.5 bg-primary-light dark:bg-primary-dark bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </NavLink>
      </footer>
    </div>
  );
};

export default BurgerMenu;

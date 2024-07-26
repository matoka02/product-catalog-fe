import React from 'react';

import { useAppSelector } from '../redux';
import { Card } from '../components/Card';
import { BreadCrumb } from '../components/BreadCrumb';

const FavoritesPage: React.FC = () => {
  const { favoriteItems } = useAppSelector((state) => state.favorites);

  return (
    <main className="container mx-auto flex flex-col items-center tablet:items-start p-4 pb-6 tablet:px-6 desktop:w-[1200px]">
      <BreadCrumb />

      <header>
        <h1 className="mb-2 text-[32px] font-extrabold leading-[41px] tracking-[0.32px] tablet:mt-10 tablet:text-5xl">
          Favorites
        </h1>
      </header>
      {favoriteItems.length ? (
        <>
          <p className="text-sm mb-8 tablet:mb-9 font-semibold leading-[21px] text-secondary">
            {`${favoriteItems.length} items`}
          </p>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
            {favoriteItems.map((pr) => (
              <Card product={pr} key={pr._id} />
            ))}
          </div>
        </>
      ) : (
        <h3>You don't have favourite products</h3>
      )}
    </main>
  );
};

export default FavoritesPage;

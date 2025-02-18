import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useGetProductsByCategoryQuery } from '../redux/api/productAPI';

type Props = {
  type: string;
  image: string;
};

export const CategoryCard = ({ type, image }: Props) => {
  const { t } = useTranslation();
  const normalizedType = type.toLowerCase();
  const { data } = useGetProductsByCategoryQuery(normalizedType);
  const modelCounter =
    data?.totalProducts === 1
      ? `${data?.totalProducts} ${t('model')}`
      : `${data?.totalProducts} ${t('models')}`;

  return (
    <NavLink
      to={normalizedType}
      className="col-span-4 desktop:col-span-8 hover:scale-105 duration-300"
    >
      <img
        src={image}
        alt="phone-category"
        className="w-full h-4/5 border-0 box-border rounded-lg"
      />
      <p className="font-mont font-bold text-[22px] mt-[24px] text-primary-light dark:text-primary-dark">
        {t(normalizedType)}
      </p>
      <p className="font-mont font-semibold text-[14px] text-secondary dark:text-secondary-dark">
        {modelCounter}
      </p>
    </NavLink>
  );
};

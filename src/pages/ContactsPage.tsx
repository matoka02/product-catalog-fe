import { useTranslation } from 'react-i18next';

import { contacts } from '../utils/contacts';
import { BreadCrumb } from '../components/BreadCrumb';
import { ContactCard } from '../components/ContactCard';

const ContactsPage = () => {
  const { t } = useTranslation();

  return (
    <main
      className="container mx-auto flex flex-col items-center
        tablet:items-start p-4 pb-6 tablet:px-6 desktop:w-[1200px]"
    >
      <BreadCrumb />

      <div className="mb-8">
        <h1 className="mb-2 text-[32px] font-extrabold leading-[41px] tracking-[0.32px] tablet:mt-10 tablet:text-5xl">
          {t('ourTeam')}
        </h1>
      </div>

      <section className="grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </section>
    </main>
  );
};

export default ContactsPage;

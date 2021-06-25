import React from 'react';
// the hook
import { useTranslation } from 'react-i18next';
import { USER_MANAGEMENT } from '~@/api';
// project main page
const Home = () => {
  const { t } = useTranslation();
  USER_MANAGEMENT.userList({
    pageIndex: 1,
    pageSize: 10,
    sortKey: '',
    isAsc: false
  });
  return (
    <div>
      this is Home
      {t('home')}
    </div>
  );
};
export default Home;

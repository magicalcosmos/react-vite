import React from 'react';
import { observer } from 'mobx-react';
// the hook
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { useStores } from '~@/hooks';

const About = observer(() => {
  // get data from store
  const commonStore = useStores('commonStore');
  const { t } = useTranslation();
  return (
    <div>
      this is Home
      {t('about')}
      theme:
      {commonStore.theme}
      <Button type='primary' onClick={() => commonStore.setTheme('red')}>
        Button
      </Button>
    </div>
  );
});
export default About;

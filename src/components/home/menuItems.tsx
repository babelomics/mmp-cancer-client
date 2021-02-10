import React from 'react';
import { Assignment, ContactMail, Group, LocalPharmacy, SettingsApplications, DynamicFeed } from '@material-ui/icons';
import routes from '../router/routes';

interface IMenuItem {
  icon?: string | React.ReactNode | undefined;
  iconSize?: number | undefined;
  text: string;
  route: string;
  hidden?: boolean;
  notConfigured?: boolean;
}

const getMenuItems = (t: any): IMenuItem[] => [
  {
    icon: <Group />,
    text: t('usersManagement.title'),
    route: routes.PATH_USERS_MANAGEMENT,
    hidden: true,
    notConfigured: false
  },
  {
    icon: <ContactMail />,
    text: t('registrationManagement.title'),
    route: routes.PATH_REGISTRATION_MANAGEMENT,
    hidden: true,
    notConfigured: false
  },
  {
    icon: <Assignment />,
    text: 'Projects Management', // TODO: change this by a proper translation
    route: '/projects-management',
    notConfigured: false
  },
  {
    icon: <SettingsApplications />,
    text: t('appConfiguration.title'),
    route: routes.PATH_ADMIN_CONFIGURATION,
    hidden: true,
    notConfigured: true
  },
  {
    icon: <LocalPharmacy />,
    text: t('drugsManagement.title'),
    route: routes.PATH_DRUGS_MANAGEMENT,
    hidden: true,
    notConfigured: false
  },
  {
    icon: <DynamicFeed />,
    text: t('panelSetsManagement.title'),
    route: routes.PATH_PANEL_SETS_MANAGEMENT,
    hidden: true,
    notConfigured: false
  }
];

export default getMenuItems;

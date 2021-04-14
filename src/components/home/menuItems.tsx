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
  color?: string;
  darkColor?: string;
}

const getMenuItems = (t: any): IMenuItem[] => [
  {
    icon: <Group />,
    text: t('usersManagement.title'),
    route: routes.PATH_USERS_MANAGEMENT,
    hidden: true,
    notConfigured: false,
    color: '#F94144',
    darkColor: '#E33D41'
  },
  {
    icon: <ContactMail />,
    text: t('registrationManagement.title'),
    route: routes.PATH_REGISTRATION_MANAGEMENT,
    hidden: true,
    notConfigured: false,
    color: '#F3722C',
    darkColor: '#DD6A2B'
  },
  {
    icon: <Assignment />,
    text: 'Projects Management', // TODO: change this by a proper translation
    route: '/projects-management',
    notConfigured: false,
    color: '#F9C74F',
    darkColor: '#E2B649'
  },
  {
    icon: <SettingsApplications />,
    text: t('appConfiguration.title'),
    route: routes.PATH_ADMIN_CONFIGURATION,
    hidden: true,
    notConfigured: true,
    color: '#577590',
    darkColor: '#526C85'
  },
  {
    icon: <LocalPharmacy />,
    text: t('drugsManagement.title'),
    route: routes.PATH_DRUGS_MANAGEMENT,
    hidden: true,
    notConfigured: false,
    color: '#90BE6D',
    darkColor: '#85AF67'
  },
  {
    icon: <DynamicFeed />,
    text: t('panelSetsManagement.title'),
    route: routes.PATH_PANEL_SETS_MANAGEMENT,
    hidden: true,
    notConfigured: false,
    color: '#43AA8B',
    darkColor: '#3E9B80'
  }
];

export default getMenuItems;

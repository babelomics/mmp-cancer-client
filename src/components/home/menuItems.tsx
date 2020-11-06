import React from 'react';
import { Assignment, ContactMail, Group } from '@material-ui/icons';
import routes from '../router/routes';

interface IMenuItem {
  icon?: string | React.ReactNode | undefined;
  iconSize?: number | undefined;
  text: string;
  route: string;
  hidden?: boolean;
}

const getMenuItems = (t: any): IMenuItem[] => [
  {
    icon: <Group />,
    text: t('usersManagement.title'),
    route: routes.PATH_USERS_MANAGEMENT,
    hidden: true
  },
  {
    icon: <ContactMail />,
    text: t('registrationManagement.title'),
    route: routes.PATH_REGISTRATION_MANAGEMENT,
    hidden: true
  },
  {
    icon: <Assignment />,
    text: 'Projects Management', // TODO: change this by a proper translation
    route: '/projects-management' // TODO: change this by routes var
  }
];

export default getMenuItems;

import moment from 'moment';

export const doDateFormat = (date: Date | string | null, format?: string): string | null => {
  if (!date) {
    return null;
  }

  if (typeof date === 'string' && date.includes('/')) {
    const split = date.split('/');
    return moment(`${split[1]}/${split[0]}/${split[2]}`).format(format ?? 'DD/MM/YYYY');
  }
  return moment(date).format(format ?? 'DD/MM/YYYY');
};

export const dateStrToDate = (date: string): Date => {
  return moment(date, 'DD/MM/YYYY').toDate();
};

export const decodeJwt = <T>(token: string): T => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

import { ITableData } from './interfaces';

export const TABLE_COLUMNS = [
  {
    title: 'Identificador',
    field: 'identifier'
  },
  {
    title: 'Nombre',
    field: 'name',
    render: (rowData: ITableData) => `${rowData.firstName} ${rowData.lastName}`
  },
  {
    title: 'Correo',
    field: 'email'
  },
  {
    title: 'Organización',
    field: 'organization'
  },
  {
    title: 'Fecha de creación',
    field: 'dateCreated',
    type: 'date'
  },
  {
    title: 'Tipo de usuario',
    field: 'userType'
  },
  {
    title: 'Fecha de ultimo acceso',
    field: 'dateLastAccess',
    type: 'date'
  }
];

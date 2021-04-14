import _ from 'lodash';

export class ArrayUtils {
  static sortByProperty<T>(array: T[], propName: keyof T, order: 'ASC' | 'DESC' | string): T[] {
    const sortedArr = array.sort((a, b) => {
      const aValue = _.get(a, propName) || '';
      const bValue = _.get(b, propName) || '';

      if (aValue < bValue) {
        return 1;
      }

      if (aValue > bValue) {
        return -1;
      }
      return 0;
    });

    if (order === 'DESC') {
      sortedArr.reverse();
    }

    return sortedArr;
  }

  static filterByText(array: any[], searchText: string): any[] {
    return array.filter((o) =>
      Object.keys(o).some((k) => {
        if (!o[k]) return false;

        if (Array.isArray(o[k])) {
          return o[k].filter((x: any) => x.toString().toLowerCase().includes(searchText.toLowerCase())).length > 0;
        }

        return o[k].toString().toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }
}

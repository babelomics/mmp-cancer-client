export class ArrayUtils {
  static sortByProperty<T>(array: T[], propName: keyof T, order: 'ASC' | 'DESC' | string): T[] {
    const sortedArr = array.sort((a, b) => {
      if (a[propName] < b[propName]) {
        return 1;
      }

      if (a[propName] > b[propName]) {
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

        return o[k].toString().toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }
}

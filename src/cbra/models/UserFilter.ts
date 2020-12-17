import SortDirection from "./SortDirection";

interface UserFilter {
    searchText?: string;
    createdAfter?: Date;
    createdBefore?: Date;
    lastAccessAfter?: Date;
    lastAccessBefore?: Date;
    userType?: string;
    sortBy?: string;
    sortDirection?: SortDirection;
}


export default UserFilter;

interface User {
    identifier: string;
    firstName: string;
    lastName: string;
    accessType: string;
    email: string;
    organization?: string;
    dateCreated?: string;
    dateLastAccess?: string;
    userType: string;
    canCreateProjects?: boolean;
}


export default User;
type UserType = any;

export default {
    displayName(user: UserType): string {
        return `${user?.first_name} ${user?.last_name}`;
    }
}
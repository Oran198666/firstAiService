export type EmployeeModel = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        city: string;
        street: string;
    };
}
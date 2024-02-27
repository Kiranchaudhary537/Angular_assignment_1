// employee.model.ts
export interface Employee {
    id: number;
    name: string;
    contactNumber: string;
    email: string;
    gender: string;
    skills: { name: string, experience: string }[];
}

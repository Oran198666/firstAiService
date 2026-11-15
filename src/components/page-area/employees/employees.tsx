import { useEffect, useState } from "react";
import "./employees.css";
import { EmployeeModel } from "../../../models/employeesModel";
import { useForm } from "react-hook-form";
import { notify } from "../../../utils/notify";
import { employeesService } from "../../../services/employeesService";
import { Spinner } from "../spinner/spinner";

export function Employees() {
    const [employee, setEmployee] = useState<EmployeeModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<{ id: number }>();
    const [time, setTime] = useState(new Date());


    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer)
    }, [])

    async function send(data: { id: number }) {
        setLoading(true);
        try {
            const employee = await employeesService.getOneEmployees(data.id);
            setEmployee(employee)
        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="Employees">
            <h1>Employees</h1>

            <form onSubmit={handleSubmit(send)}>
                <label>Employee Id: </label>
                <input type="number" {...register("id",{valueAsNumber:true})} required />
                <button>Search</button>
            </form>

            {loading && <Spinner />}
            {employee && <div>
                <h1>Employee</h1>
                <p>{employee.name}</p>
                <p>{employee.username}</p>
                <p>{employee.email}</p>
                <p>{employee.address.city}</p>
                <p>{employee.address.street}</p>
            </div>}
            <p>{time.toLocaleTimeString()}</p>
        </div>
    );
}

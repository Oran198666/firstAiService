import axios from "axios";
import { EmployeeModel } from "../models/employeesModel";
import { appConfig } from "../utils/app-config";

class EmployeesService{
    public async getAllEmployees():Promise<EmployeeModel[]>{
        const {data} = await axios.get(appConfig.EmployeesUrl);
        return data;
    }

    public async getOneEmployees(id:number):Promise<EmployeeModel>{
        const {data} = await axios.get(`${appConfig.EmployeesUrl}/${id}`);
        return data;
    }

}

 export const employeesService = new EmployeesService();
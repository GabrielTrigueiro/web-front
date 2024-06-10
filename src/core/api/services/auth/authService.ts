import { log } from "console";
import { ILogin } from "../../../models/login";
import { LOGIN } from "../../../utils/constans";
import { noAuthAxiosInstance } from "../../axios/axiosInstance";

const login = async (data: ILogin): Promise<any> => {
    return await noAuthAxiosInstance
        .post(LOGIN, data)
        .then(async (response) => {
            localStorage.removeItem("@AuthData");
            console.log(response.data.data)
            return response.data.data;
        })
        .catch((err: any) => {
            console.log(err)
            return err;
        });
};

export const AuthService = {
    login,
};

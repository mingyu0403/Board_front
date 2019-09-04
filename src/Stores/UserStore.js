import {observable, action} from "mobx";
import axios from 'axios';

class UserStore {
    static __instance = null;
    static getInstance(){
        if(UserStore.__instance === null)
            UserStore.__instance = new UserStore();
        return UserStore.__instance;
    }
    constructor(){
        UserStore.__instance = this;
    }

    @observable user = null;
    @action loginUser = async (account, password) => {
        try {
            this.user = null;
            let data = {
                account,
                password
            };
            let response = await axios({
                url: `http://localhost:8080/loginUser`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(data)
            });
            if(response.status === 200){
                this.user = response.data;
                return true;
            }

        } catch (e) {
            alert(e.toLocaleString());
        }
        return false;
    }

    @observable editSuccess = false;
    @action editUser = async (user) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/editUser`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(user)
            });
            if(response.status === 200){
                this.user = response.data;
                return true;
            }
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }

    @action addUser = async (user) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/addUser`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(user)
            });
            return (response.status === 200);
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }

    @action existUser = async (account) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/getUserByAccount/${account}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200){
                return response.data;
            }
        } catch (e) {
            return null;
        }
    }

    @action uploadProfile = async (file) => {
        try {
            let formData = new FormData();
            formData.append('srcFile', file);
            let response = await axios({
                url: `http://localhost:8080/attachment/upload`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: formData
            });
            if(response.status == 200){
                return response.data._id;
            }
        } catch (e) {
            return null;
        }
    }

    @action logout = async () => {
        this.user = null;
    }
}

export default UserStore.getInstance();
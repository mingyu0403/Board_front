import {observable, action} from "mobx";
import axios from 'axios';

class CategoryStore {
    static __instance = null;
    static getInstance(){
        if(CategoryStore.__instance === null)
            CategoryStore.__instance = new CategoryStore();
        return CategoryStore.__instance;
    }
    constructor() {
        CategoryStore.__instance = this;
    }

    @observable items = null;
    @action fetchItems = async () => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/category/getAll',
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            console.log(response);
            if(response.status === 200)
                this.items = response.data;

        } catch (e) {
            alert(e.toLocaleString());
        }
    }
    @observable item = null;
    @action fetchItem = async (id) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/category/get/${id}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            console.log(response);
            if(response.status === 200)
                this.item = response.data;
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

}

export default CategoryStore.getInstance();
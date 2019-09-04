import {observable, action} from "mobx";
import axios from 'axios';

class BoardStore {
    static __instance = null;
    static getInstance(){
        if(BoardStore.__instance === null)
            BoardStore.__instance = new BoardStore();
        return BoardStore.__instance;
    }
    constructor(){
        BoardStore.__instance = this;
    }

    @observable items = null;
    @action fetchItems = async () => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/board/getAll',
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
    @action fetchItem = async (boardId) => {
        try {
            this.item = null;
            let response = await axios({
                url: `http://localhost:8080/board/get/${boardId}`,
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

    @observable itemByCategory = null;
    @action fetchItemOrderByCreated = async (categoryId) => {
        try {
            this.item = null;
            let response = await axios({
                url: `http://localhost:8080/board/getAllByCategoryId/created/${categoryId}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            console.log(response);
            if(response.status === 200)
                this.itemByCategory = response.data;
        } catch (e) {
            alert(e.toLocaleString());
        }
    }
    @action fetchItemOrderByRecommend = async (categoryId) => {
        try {
            this.item = null;
            let response = await axios({
                url: `http://localhost:8080/board/getAllByCategoryId/recommend/${categoryId}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            console.log(response);
            if(response.status === 200)
                this.itemByCategory = response.data;
        } catch (e) {
            alert(e.toLocaleString());
        }
    }
    @action fetchItemOrderByLookup = async (categoryId) => {
        try {
            this.item = null;
            let response = await axios({
                url: `http://localhost:8080/board/getAllByCategoryId/lookup/${categoryId}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            console.log(response);
            if(response.status === 200)
                this.itemByCategory = response.data;
        } catch (e) {
            alert(e.toLocaleString());
        }
    }

    @observable allRecCount = 1;
    @action allRecommendCount = async (userid) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/board/getSumRecommendCountByUserId/${userid}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200){
                this.allRecCount = response.data;
            }
        } catch (e) {
            return null;
        }
    }
    @action addRecommendCount = async (boardid) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/board/addRecommendCount/${boardid}`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200){
                return true;
            }
        } catch (e) {
            return null;
        }
    }
    @action addLookupCount = async (boardid) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/board/addLookupCount/${boardid}`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200){
                return true;
            }
        } catch (e) {
            return null;
        }
    }


    @action addNewBoard = async (board) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/board/add`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(board)
            });
            return (response.status === 200);
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }


    @action deleteBoard = async (boardid) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/board/delete/${boardid}`,
                method: 'delete',
                timeout: 3000
            });
            return (response.status === 200);
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }


    @action editBoard = async (board) => {
        console.log(board);
        try {
            let response = await axios({
                url: `http://localhost:8080/board/modify`,
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(board)
            });
            return (response.status === 200);
        } catch (e) {
            alert(e.toLocaleString());
            return false;
        }
    }
}

export default BoardStore.getInstance();
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import BoardList from "../Home/BoardList";
import {Link} from "react-router-dom";

@inject('stores')
@observer
class Category extends Component {

    state = {
        boardCount_ViewOnePage: '5',
        page: '1',
        pageLevel : '0'
    };

    componentDidMount() {
        this.props.stores.CategoryStore.fetchItem(this.props.match.params.categoryid);
        this.props.stores.BoardStore.fetchItemOrderByCreated(this.props.match.params.categoryid);
    }

    render() {
        let b = this.props.stores.BoardStore;
        let c = this.props.stores.CategoryStore;


        return (
            <div>
                {c.item && <h2>{c.item.name}</h2>}

                <div>
                    한 페이지에 나타나는 글의 수 :
                    <input
                        type='number'
                        min='1'
                        value={this.state.boardCount_ViewOnePage}
                        onChange={this.updateBoardCount}
                        name='boardCount_ViewOnePage'
                    />
                </div>
                <div>
                    <button onClick={this.onReload}>확인</button>
                </div>
                <hr />
                <div>
                    <button onClick={this.onOrderbyCreated}>최신 순</button>
                    <button onClick={this.onOrderbyRecommend}>추천 순</button>
                    <button onClick={this.onOrderbyLookup}>조회 순</button>
                </div>

                <div>
                    <fieldset>
                        <legend id='sort-name'>최신 순</legend>
                        {b.itemByCategory && <BoardList boardList={b.itemByCategory
                            .slice(
                                (this.state.page - 1) * this.state.boardCount_ViewOnePage,
                                (this.state.page - 1) * this.state.boardCount_ViewOnePage + this.state.boardCount_ViewOnePage,
                            )
                        }/>}
                    </fieldset>
                </div>

                <div>
                    <button value='-10' onClick={this.onDown}>&lt;</button>
                    <button value={10 * this.state.pageLevel + 1} onClick={this.onReload}>{10 * this.state.pageLevel + 1}</button>
                    <button value={10 * this.state.pageLevel + 2} onClick={this.onReload}>{10 * this.state.pageLevel + 2}</button>
                    <button value={10 * this.state.pageLevel + 3} onClick={this.onReload}>{10 * this.state.pageLevel + 3}</button>
                    <button value={10 * this.state.pageLevel + 4} onClick={this.onReload}>{10 * this.state.pageLevel + 4}</button>
                    <button value={10 * this.state.pageLevel + 5} onClick={this.onReload}>{10 * this.state.pageLevel + 5}</button>
                    <button value={10 * this.state.pageLevel + 6} onClick={this.onReload}>{10 * this.state.pageLevel + 6}</button>
                    <button value={10 * this.state.pageLevel + 7} onClick={this.onReload}>{10 * this.state.pageLevel + 7}</button>
                    <button value={10 * this.state.pageLevel + 8} onClick={this.onReload}>{10 * this.state.pageLevel + 8}</button>
                    <button value={10 * this.state.pageLevel + 9} onClick={this.onReload}>{10 * this.state.pageLevel + 9}</button>
                    <button value='10' onClick={this.onUp}>&gt;</button>
                </div>
            </div>
        );
    }

    onOrderbyCreated = async () => {
        document.getElementById('sort-name').innerHTML = '최신 순';
        await this.props.stores.BoardStore.fetchItemOrderByCreated(this.props.match.params.categoryid);
    }
    onOrderbyRecommend = async () => {
        document.getElementById('sort-name').innerHTML = '추천 순';
        await this.props.stores.BoardStore.fetchItemOrderByRecommend(this.props.match.params.categoryid);
    }
    onOrderbyLookup = async () => {
        document.getElementById('sort-name').innerHTML = '조회 순';
        await this.props.stores.BoardStore.fetchItemOrderByLookup(this.props.match.params.categoryid);
    }

    onReload = event => {
        this.setState({
            page: event.target.value
        });
    }

    onDown = () => {
        if(this.state.pageLevel <= 0){
            return;
        }
        this.setState({
            pageLevel: this.state.pageLevel - 1
        });
    }

    onUp = () => {
        this.setState({
            pageLevel: this.state.pageLevel + 1
        });
    }

    updateBoardCount = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
}

export default Category;
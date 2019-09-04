import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import {Link, Redirect} from "react-router-dom";

@inject('stores')
@observer
class BoardView extends Component {

    state = {
        recommendCount: 0,
        goToHome: false,
        goToEdit: false
    };


    async componentDidMount() {
        await this.props.stores.BoardStore.fetchItem(this.props.boardid);
        await this.props.stores.BoardStore.addLookupCount(this.props.boardid);

        this.setState({
            ...this.state,
            recommendCount: this.props.stores.BoardStore.item.recommendCount
        })
    }

    render() {
        if(this.state.goToHome)
            return <Redirect to={'/'}/>;

        if(this.state.goToEdit)
            return <Redirect to={`/board/edit/${this.props.boardid}`} />;

        let b = this.props.stores.BoardStore;
        if(! b.item)
            return <div />;
        let user = this.props.stores.UserStore.user;
        return (
            <div>
                <div>
                    번호: {b.item._id}
                </div>
                <hr />
                <div>
                    제목: {b.item.title}
                </div>
                <hr />
                <div>
                    내용: {b.item.content}
                </div>
                <hr />
                <div>
                    작성시간: {new Date(b.item.created).toLocaleString()}
                </div>
                <hr />
                <div>
                    추천 수: {this.state.recommendCount}
                    <button onClick={this.addRecommendCount}>추천하기</button>
                </div>
                <div>
                    조회 수: {b.item.lookupCount}
                </div>
                <hr />
                <div>
                    { user && user._id == b.item.userId && <button onClick={this.deletePost}>삭제</button>}
                    { user && user._id == b.item.userId && <button onClick={this.editPost}>수정</button> }
                </div>
            </div>
        );
    }
    addRecommendCount = async () => {
        if(window.confirm('추천하시겠습니까?') === false) return;

        let id = this.props.boardid;
        if(await this.props.stores.BoardStore.addRecommendCount(id)){
            alert('추천했습니다');
            this.setState({
                ...this.state,
                recommendCount: this.state.recommendCount + 1
            })
        }
    }

    editPost = () => this.setState({goToEdit: true});

    deletePost = async () => {
        if(window.confirm('삭제하시겠습니까?') === false) return;

        let id = this.props.boardid;
        if(!(this.props.stores.BoardStore.item.userId === this.props.stores.UserStore.user._id)) return;

        if(await this.props.stores.BoardStore.deleteBoard(id)){
            await this.props.stores.BoardStore.fetchItems();
            this.setState({
                ...this.state,
                goToHome: true
            })
        }
    }

}

export default BoardView;
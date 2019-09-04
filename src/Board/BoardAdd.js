import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class BoardAdd extends Component {

    state = {
        title: '',
        content: '',
        userId: this.props.stores.UserStore.user._id,
        categoryId: '1',
        recommendCount: 0,
        lookupCount: 0,
        writer: this.props.stores.UserStore.user.name,

        goToHome: false,
        goToBoard: false
    };

    constructor(props) {
        super(props);
        if (this.props.boardid && this.props.stores.BoardStore.item)
            this.state = {
                ...this.state,
                title: this.props.stores.BoardStore.item.title,
                content: this.props.stores.BoardStore.item.content,
                _id: this.props.stores.BoardStore.item._id,
                recommendCount: this.props.stores.BoardStore.item.recommendCount,
                lookupCount: this.props.stores.BoardStore.item.lookupCount
            }
    }

    render() {
        if(this.state.goToHome)
            return <Redirect to={`/`} />;
        if(this.state.goToBoard)
            return <Redirect to={`/board/view/${this.props.boardid}`}/>;

        return (
            <div>
                <div>
                    1학년
                    <input
                        type='radio'
                        name='categoryId'
                        value='1'
                        onChange={this.chooseCategory}
                    />
                    2학년
                    <input
                        type='radio'
                        name='categoryId'
                        value='2'
                        onChange={this.chooseCategory}
                    />
                    3학년
                    <input
                        type='radio'
                        name='categoryId'
                        value='3'
                        onChange={this.chooseCategory}
                    />
                </div>

                <div>
                    제목
                    <input
                        value={this.state.title}
                        onChange={this.updateInput}
                        name='title'
                        placeholder='제목'/>
                </div>
                <div>
                    내용
                    <input
                        value={this.state.content}
                        onChange={this.updateInput}
                        name='content'
                        placeholder='내용'/>
                </div>
                <button onClick={this.addNewBoard}>확인</button>
            </div>
        );
    }

    chooseCategory = categorRadioBtn => {
        this.setState({
            [categorRadioBtn.target.name]: categorRadioBtn.target.value
        });
    }

    addNewBoard = async () => {
        if(!(this.state.userId === this.props.stores.UserStore.user._id)) return;

        if(window.confirm('완료되었습니까?') === false) return;

        console.log(this.state);
        console.log(this.props.boardid);
        if(this.props.boardid && await this.props.stores.BoardStore.editBoard(this.state)){

            // 다시 리스트를 가져오게 함. (갱신)
            await this.props.stores.BoardStore.fetchItems();
            this.setState({
                ...this.state,
                goToBoard: true
            })
        } else if (await this.props.stores.BoardStore.addNewBoard(this.state)) {
            await this.props.stores.BoardStore.fetchItems();
            this.setState({
                ...this.state,
                goToHome: true
            });
        }
    }

    updateInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
}

export default BoardAdd;

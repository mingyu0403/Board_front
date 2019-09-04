import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import BoardAdd from "./BoardAdd";
import BoardView from "./BoardView";

@inject('stores')
@observer
class Board extends Component {

    componentDidMount() {
        this.props.stores.BoardStore.fetchItems();
    }

    render() {

        if(this.props.match && this.props.match.params.command === 'view')
            return <BoardView boardid={this.props.match.params.boardid}/>;

        if(this.props.match && this.props.match.params.command === 'add')
            return  <BoardAdd />

        if(this.props.match && this.props.match.params.command === 'edit')
            return <BoardAdd boardid={this.props.match.params.boardid} />;

        return <div>링크가 잘못되었습니다.</div>;
    }
}

export default Board;
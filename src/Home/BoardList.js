import React from 'react';
import BoardItem from "./BoardItem";

const BoardList = (props) => {
    return (
        <div>
            { props.boardList && props.boardList.map(board => <BoardItem key={board._id} item={board}/> )}
        </div>
    );
};

export default BoardList;
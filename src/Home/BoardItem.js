import React from 'react';
import {Link} from 'react-router-dom';

const BoardItem = (props) => {

    let { item } = props;

    if(!item) {
        return (
            <div>asd</div>
        );
    }

    let viewBoard = `/board/view/${item._id}`;

    return (
        <div>
            <Link to={viewBoard}>
                {item.title}
            </Link>
            작성자:{item.writer}
        </div>
    );
};

export default BoardItem;
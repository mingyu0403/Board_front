import React from 'react';
import BoardList from "./BoardList";
import {Link} from "react-router-dom";

const Preview = (props) => {
    return (
        <div>
            <h2>최신 글</h2>
            <div>
                {props.items.map((item, i) =>
                    <fieldset>
                        <legend><Link to={`/category/${item._id}`}>{item.name}</Link></legend>
                        <BoardList boardList={item.boardList}/>
                    </fieldset>
                )}
            </div>
        </div>
    );
};

export default Preview;
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Preview from "./Preview";

@inject('stores')
@observer
class Home extends Component {

    componentDidMount() {
        this.props.stores.CategoryStore.fetchItems();
    }

    render() {
        let c = this.props.stores.CategoryStore;

        if(!c) {
            return (
                <div></div>
            );
        }

        return (
            <div>
                {c.items && <Preview items={c.items} />}
            </div>
        );
    }
}

export default Home;
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Login from "./Login";
import Join from "./Join";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import Home from "../Home";

@inject('stores')
@observer
class User extends Component {
    render() {
        if(this.props.match && this.props.match.params.command === 'login') {
            return <Login/>;
        }

        if(this.props.match && this.props.match.params.command === 'join') {
            return <Join/>;
        }

        if(this.props.match && this.props.match.params.command === 'profileView') {
            let user = this.props.stores.UserStore.user;
            if(user){
                return <ProfileView/>;
            }
            return <Login/>;
        }

        if(this.props.match && this.props.match.params.command === 'profileEdit') {
            let user = this.props.stores.UserStore.user;
            if(user){
                return <ProfileEdit/>;
            }
            return <Home/>;
        }
    }
}

export default User;
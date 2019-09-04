import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';


@inject('stores')
@observer
class ProfileView extends Component {

    componentDidMount() {
        let user = this.props.stores.UserStore.user;
        this.props.stores.BoardStore.allRecommendCount(user._id);
    }

    render() {
        let user = this.props.stores.UserStore.user;

        let imageUrl = `http://localhost:8080/attachment/image/${user.attachmentId}`;

        return (
            <div>
                <fieldset>
                    <legend>개인 정보 확인</legend>

                    <div>이름 : {user.name}</div>
                    <div>계정 아이디 : {user.account}</div>
                    <div>비밀번호 : {"보안상 표시할 수 없음"}</div>
                    <div>성별 : {user.gender===0 ? "남":"여"}</div>
                    <div>나이 : {user.age}</div>

                    <div>프로필 사진 : <img src={imageUrl} height='300px'/></div>

                    <div>모든 게시글의 추천 수: {this.props.stores.BoardStore.allRecCount}</div>
                    <Link to='/user/profileEdit'>수정</Link>
                </fieldset>
            </div>
        );
    }
}

export default ProfileView;
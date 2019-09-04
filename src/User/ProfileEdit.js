import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class ProfileEdit extends Component {

    state = {
        goToProfileView: false,

        _id: this.props.stores.UserStore.user._id,
        account: this.props.stores.UserStore.user.account,
        password: '',
        name: this.props.stores.UserStore.user.name,
        age: this.props.stores.UserStore.user.age,
        gender: this.props.stores.UserStore.user.gender,
        attachmentId: this.props.stores.UserStore.user.attachmentId,
        profileFile: '',

        beforePassword: ''
    };


    render() {
        if(this.state.goToProfileView){
            return <Redirect to={'/user/profileView'}/>;
        }

        return (
            <div>
                <fieldset>
                    <legend><b>{this.props.stores.UserStore.user.name}</b>님의 정보 수정</legend>
                    <div>
                        <div>
                            아이디:
                            <input
                                placeholder='아이디'
                                value={this.state.account}
                                onChange={this.updateInput}
                                name='account'
                            />
                        </div>
                        <div>
                            희망패스워드:
                            <input
                                placeholder='비밀번호'
                                type='password'
                                value={this.state.password}
                                onChange={this.updateInput}
                                name='password'
                            />
                        </div>
                        <div>
                            이름:
                            <input
                                placeholder='이름'
                                value={this.state.name}
                                onChange={this.updateInput}
                                name='name'
                            />
                        </div>
                        <div>
                            나이:
                            <input
                                placeholder='나이'
                                type='number'
                                min='1'
                                value={this.state.age}
                                onChange={this.updateInput}
                                name='age'
                            />
                        </div>
                        <div>
                            남
                            <input
                                type='radio'
                                name='gender'
                                value='0'
                                onChange={this.chooseGender}
                            />
                            여
                            <input
                                type='radio'
                                name='gender'
                                value='1'
                                onChange={this.chooseGender}
                            />
                        </div>
                        <div>
                            프로필 사진
                            <input
                                type='file'
                                id='upload-file'
                                onChange={this.addProfile}
                            />
                        </div>
                        <div>
                            기존 비밀번호 (본인확인):
                            <input
                                placeholder='기존 비밀번호'
                                type='password'
                                value={this.state.beforePassword}
                                onChange={this.updateInput}
                                name='beforePassword'
                            />
                        </div>
                        <div>
                            <button onClick={this.onEdit}>완료</button>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }

    onEdit = async () => {

        let isUserLoginSuccess = await this.props.stores.UserStore.loginUser(this.state._id, this.state.beforePassword);
        if(!isUserLoginSuccess){
            window.alert("비밀번호가 맞지 않습니다.");
            return;
        }

        let attachId = await this.props.stores.UserStore.uploadProfile(this.state.profileFile);
        if(attachId){
            this.setState({
                ...this.state,
                attachmentId: attachId
            })
        }

        let isEdit = await this.props.stores.UserStore.editUser(this.state);
        if(isEdit){
            this.setState({
                ...this.state,
                goToProfileView: true
            })
            alert('회원 정보 수정을 완료했습니다.');
        } else {
            window.alert('회원 정보 수정이 되지 않았습니다.');
        }


    }

    chooseGender = genderBtn => {
        this.setState({
            [genderBtn.target.name]: genderBtn.target.value
        });
    }

    updateInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addProfile = async (e) => {
        this.setState({
            ...this.state,
            profileFile: e.target.files[0]
        });
    }
}

export default ProfileEdit;
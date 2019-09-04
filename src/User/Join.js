import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Join extends Component {

    state = {
        goToLogin: false,

        account: '',
        isSameIdCheckSuccess: false,
        password: '',
        passwordCheck: '',
        name: '',
        age: '',
        gender: '',
        attachmentId: '',
        profileFile: ''
    };

    render() {
        if(this.state.goToLogin)
            return <Redirect to={'/user/login'}/>;

        return (
            <div>
                <fieldset>
                    <legend>회원가입</legend>
                    <div>
                        <div>
                            희망아이디:
                            <input
                                placeholder='아이디'
                                value={this.state.account}
                                onChange={this.updateInput}
                                name='account'
                            />
                            <button onClick={this.onSameIdCheck}>중복 확인</button>
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
                            패스워드 확인:
                            <input
                                placeholder='비밀번호 확인'
                                type='password'
                                value={this.state.passwordCheck}
                                onChange={this.updateInput}
                                name='passwordCheck'
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
                                id="upload-file"
                                onChange={this.addProfile}
                            />
                        </div>
                        <div>
                            <button onClick={this.onJoin}>회원가입</button>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
    onSameIdCheck = async () => {
        if(!this.state.account) {
            window.alert("아이디를 입력해주세요.");
            return;
        }

        let user = await this.props.stores.UserStore.existUser(this.state.account);
        if(user){
            alert('해당 아이디가 중복됩니다.');
            this.setState({
                ...this.state,
                isSameIdCheckSuccess: false
            })
        } else {
            alert('해당 아이디를 사용할 수 있습니다.');
            this.setState({
                ...this.state,
                isSameIdCheckSuccess: true
            })
        }
    }

    onJoin = async () => {
        for(let input in this.state){
            if(!this.state[input] && input!=='goToLogin' && input!=='isSameIdCheckSuccess' && input!=='attachmentId') {
                window.alert(input + "을(를) 입력해주세요.");
                return;
            }
        }
        if(!this.state.isSameIdCheckSuccess){
            window.alert('아이디 중복 확인을 해주세요.');
            return;
        }

        if(this.state.password !== this.state.passwordCheck){
            window.alert('패스워드가 일치하지 않습니다.');
            return;
        }

        let attachId = await this.props.stores.UserStore.uploadProfile(this.state.profileFile);
        if(attachId){
            this.setState({
                ...this.state,
                attachmentId: attachId
            })
        }


        let isAdd = await this.props.stores.UserStore.addUser(this.state);
        console.log(this.state);
        if(isAdd){
            this.setState({
                ...this.state,
                goToLogin: true
            })
            alert('회원가입을 완료했습니다.');

        } else {
            window.alert('회원가입이 되지 않았습니다.');
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

export default Join;
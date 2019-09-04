import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class Login extends Component {
    state = {
        account: '',
        password: '',
        goToHome: false
    };

    render() {

        if(this.state.goToHome){
            return <Redirect to={'/'}/>;
        }

        return (
            <div>
                <fieldset>
                    <legend>로그인</legend>
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
                        비밀번호:
                        <input
                            placeholder='비밀번호'
                            value={this.state.password}
                            onChange={this.updateInput}
                            type='password'
                            name='password'
                        />
                    </div>
                    <div>
                        <button onClick={this.onLogin}>로그인</button>
                        <Link to='/user/join'>회원가입</Link>
                    </div>
                </fieldset>
            </div>
        );
    }

    onLogin = async () => {
        let isExistAccount = await this.props.stores.UserStore.existUser(this.state.account);
        if(!isExistAccount){
            alert('해당 아이디는 존재하지 않는 아이디입니다.');
            return;
        }

        await this.props.stores.UserStore.loginUser(this.state.account, this.state.password);
        if(this.props.stores.UserStore.user){
            this.setState({
                ...this.state,
                goToHome: true
            })
        } else {
            window.alert("비밀번호가 맞지 않습니다.");
        }
    }

    updateInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
}

export default Login;
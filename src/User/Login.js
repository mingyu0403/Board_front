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
        let isUserLoginSuccess = await this.props.stores.UserStore.loginUser(this.state.account, this.state.password);
        if(isUserLoginSuccess){
            this.setState({
                ...this.state,
                goToHome: true
            })
        } else {
            window.alert("아이디 또는 비밀번호가 맞지 않습니다.");
        }
    }

    updateInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
}

export default Login;
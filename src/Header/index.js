import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject('stores')
@observer
class Header extends Component {
    render() {
        if(!this.props.stores.UserStore.user){ // 로그인 안했을 때
            return (
                <div>
                    <div className='left-box'>
                        <ul className='link-button-list'>
                            <li className='link-button'><Link to='/'>★☆ 게시판</Link></li>
                        </ul>
                    </div>
                    <div className='right-box'>
                        <ul className='link-button-list'>
                            <li className='link-button'><Link to='/user/login'>로그인</Link></li>
                            <li className='link-button'><Link to='/user/join'>회원가입</Link></li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className='left-box'>
                        <ul className='link-button-list'>
                            <li className='link-button'><Link to='/'>게시판 만들기</Link></li>
                        </ul>
                    </div>
                    <div className='right-box'>
                        <ul className='link-button-list'>
                            <li className='link-button'><Link to='/board/add'>글 작성하기</Link></li>
                            <li className='link-button'><Link to='/user/profileView'>개인 정보 확인</Link></li>
                            <li className='link-button'><Link onClick={this.onLogout}>로그아웃</Link></li>
                        </ul>
                    </div>
                </div>
            );
        }

    }

    onLogout = () => {
        if(this.props.stores.UserStore.user){
            this.props.stores.UserStore.logout();
            alert('로그아웃 되었습니다.');

            this.setState({
                ...this.state
            })
        }
    }
}

export default Header;
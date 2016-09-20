import React from "react";
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { connect } from 'react-redux';
import {fetchUser, createUser, deleteUser, fetchOneUser, updateUser} from "../actions/userActions";

//连接react和redux
@connect((store) => {
    return {
        users: store.user.users,
        fetching: store.user.fetching,
        fetched: store.user.fetched,
        error: store.user.error,
        addUserStatus: store.user.addUserStatus,
        initState: store.user.initState,
        queryUser: store.user.queryUser,
        updateUserStatus: store.user.updateUserStatus
    }
})

export default class Users extends React.Component {
    constructor(props) {
      super(props);
    
      this.state = {
        showAddUser: false,
        showUpdateUser: false
      };
    }


    componentDidMount(){
        this.fetchUsers();
    }

    //获取用户列表
    fetchUsers(){
        this.props.dispatch(fetchUser());
    }

    //切换添加用户表单的显示与否
    showAddUser(){
        this.setState({
            showAddUser: !this.state.showAddUser
        })
    }

    //添加用户
    addUser(){
        this.props.dispatch(createUser(this.refs.userid.value, this.refs.username.value));
    }

    //删除用户
    delUser(userid){
        this.props.dispatch(deleteUser(userid));
    }

    //修改用户前获取用户信息
    getOneUser(userid){
        this.setState({showUpdateUser: true});
        this.props.dispatch(fetchOneUser(userid));
    }

    //修改用户操作
    upadteUserHandle(){
        this.props.dispatch(updateUser(this.refs.updateUserid.value, this.refs.updateUsername.value));
    }


	render(){
        const {users} = this.props;

        //加载过程图片显示
        var loadingHtml = '';
        if(this.props.fetching){
            loadingHtml = <div className="loading"><img src="img/loading.gif" /></div>;
        }

        //没有用户数据时显示
        if(!users.length && this.props.fetched && !this.props.error){
            return <p>没有内容</p>
        }

        //数据请求错误时
        if(this.props.error){
            return <p>网络连接错误</p>
        }

        //显示用户添加成功或失败提示信息
        var addUserStatusHtml = '';
        if(this.props.initState){
            addUserStatusHtml = '';
        }else{
            if(this.props.addUserStatus){
                addUserStatusHtml = <div className="addUserStatus">用户添加成功</div>
            }else{
                addUserStatusHtml = <div className="addUserStatus">用户添加失败</div>
            }
        }

        //显示用户修改成功或失败提示信息
        var updateUserStatusHtml = '';
        if(this.props.initState){
            updateUserStatusHtml = '';
        }else{
            if(this.props.updateUserStatus){
                updateUserStatusHtml = <div className="addUserStatus">用户修改成功</div>
            }else{
                updateUserStatusHtml = <div className="addUserStatus">用户修改失败</div>
            }
        }


		return (
            <div>
                <div className="usersList">
                    <ul>
                        {
                            users.map((user) => {
                                return (
                                    <li key={user.id}>
                                        <div>{user.id} - {user.name}</div>
                                        <div>
                                            <span onClick={this.getOneUser.bind(this, user.id)}>修改</span>
                                            <span onClick={this.delUser.bind(this, user.id)}>删除</span>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {loadingHtml}
                </div>

                <span className="addUserBtn" onClick={this.showAddUser.bind(this)}>添加用户</span>

                {
                    !this.state.showAddUser ? '': 
                    <div className="addUser">
                        <div className="page-wrap">
                          <div className="page-content">
                            <div className="content">
                              <div id="sign-up">
                                <div className="user-form">
                                  <form className="sign-in-form user-form-form">
                                    <div className="user-form-fieldset">
                                      <label className="user-form-label" for="userId">用户ID：</label>
                                      <input className="user-form-field" type="text" ref="userid" name="userId" id="userId" placeholder="用户ID" />
                                    </div>
                                    <div className="user-form-fieldset">
                                      <label className="user-form-label" for="userName">用户名：</label>
                                      <input className="user-form-field" type="text" ref="username" name="userName" id="userName" placeholder="用户名" />
                                    </div>
                                    <button type="button" className="sign-up-button user-form-button" onClick={this.addUser.bind(this)}>注册</button>
                                </form> 
                                {addUserStatusHtml}
                                </div>
                              </div> 
                            </div>
                          </div>
                        </div>
                    </div>
                }

                {
                    !this.state.showUpdateUser ? '': 
                    <div className="addUser">
                        <div className="page-wrap">
                          <div className="page-content">
                            <div className="content">
                              <div id="sign-up">
                                <div className="user-form">
                                  <form className="sign-in-form user-form-form">
                                    <div className="user-form-fieldset">
                                      <label className="user-form-label" for="updateUserid">用户ID：</label>
                                      <input className="user-form-field" type="text" ref="updateUserid" name="updateUserid" id="updateUserid" value={this.props.queryUser.id} />
                                    </div>
                                    <div className="user-form-fieldset">
                                      <label className="user-form-label" for="updateUsername">用户名：</label>
                                      <input className="user-form-field" type="text" ref="updateUsername" name="updateUsername" id="updateUsername" placeholder={this.props.queryUser.name} />
                                    </div>
                                    <button type="button" className="sign-up-button user-form-button" onClick={this.upadteUserHandle.bind(this)}>修改</button>
                                </form> 
                                {updateUserStatusHtml}
                                </div>
                              </div> 
                            </div>
                          </div>
                        </div>
                    </div>
                }
                

            </div>
		);
	}
}
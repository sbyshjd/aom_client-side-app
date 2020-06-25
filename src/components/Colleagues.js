import React, { Component } from 'react';
import AuthService from './service/AuthService';
import UserDeleteModal from './UserDeletemodal';

class Colleagues extends Component {
    constructor(props) {
        super(props);
        this.state={
            // colleagues:[],
            showDeleteModal:false,
            deleteUserId:'',
            deleteUserName:''
        }
        this.service = new AuthService();
    }

    // componentDidMount() {
    //     this.service.getAllTheUsers()
    //     .then(response => {
    //         this.setState({colleagues:response})
    //     })
    // }

    setDeleteModalShow=(e,boolean) => {
        this.setState({
            deleteUserName: e.target.id,
            deleteUserId:e.target.value,
            showDeleteModal:boolean
        })
    }

    setDeleteModalClose=(boolean) => {
        this.setState({
            deleteUserName: '',
            deleteUserId:'',
            showDeleteModal:boolean
        })
    }




    render() {
        return (
            <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">City</th>
                    {this.props.user.role==='admin' && (
                        <th scope="col">Action</th>
                    )}
                    {this.props.user.role==='admin' && (
                        <th scope="col">Delete</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                {this.props.users.map((p,i)=> {
                    return (<tr key={p._id}>
                    <th scope="row">{i+1}</th>
                    <td>{p.username}</td>
                    <td>{p.firstname}</td>
                    <td>{p.lastname}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>{p.city}</td>
                    {this.props.user.role==='admin' && (
                    <td><button className='btn btn-outline-warning'>change role</button></td>
                    )}
                    {this.props.user.role==='admin' && (
                    <td><button id={p.username} value={p._id} className='btn btn-outline-danger' onClick={(e)=>this.setDeleteModalShow(e,true)}>delete</button></td>
                    )}
                    </tr>)
                })}
                    
                </tbody>
            </table>
            <UserDeleteModal
                id = {this.state.deleteUserId}
                username = {this.state.deleteUserName}
                reload ={this.props.getAllUsers}
                delete = {this.deleteHandler}
                show={this.state.showDeleteModal}
                onHide={()=>this.setDeleteModalClose(false)}
            />
                
            </div>
        );
    }
}

export default Colleagues;
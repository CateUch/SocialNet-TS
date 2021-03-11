//@ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import Users from './users';
import { setCurrentPage, follow, unfollow, setTotalCount, toggleInProgress, setUsers } from './../../redux/users_reducer';
import axios from 'axios';
import Preloader from '../utils/preloader'


class UserContainer extends React.Component {

	componentDidMount() {
		this.props.toggleInProgress(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
			this.props.toggleInProgress(false);
			this.props.setUsers(response.data.items);
			this.props.setTotalCount(response.data.totalCount)
		}
		)
	}

	onPageChanged = (p) => {
		this.props.setCurrentPage(p);
		this.props.toggleInProgress(true);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
			.then(response => {
				this.props.toggleInProgress(false);
				this.props.setUsers(response.data.items);
			})
	}

	render() {

		return (
			<>
				{this.props.inProgress ? <Preloader />
				: <Users currentPage={this.props.currentPage}
					totalCount={this.props.totalCount}
					users={this.props.users}
					pageSize={this.props.pageSize}
					onPageChanged={this.onPageChanged}
					unfollow={this.props.unfollow}
					follow={this.props.follow} />
				}
			</>
		)
	}

}

let mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalCount: state.usersPage.totalCount,
		currentPage: state.usersPage.currentPage,
		inProgress: state.usersPage.inProgress
	}
};


const UsersContainer = connect(mapStateToProps,
	{setUsers, follow, unfollow, setCurrentPage, setTotalCount, toggleInProgress} )(UserContainer);

export default UsersContainer;
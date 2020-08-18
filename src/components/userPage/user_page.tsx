import React from 'react';
import style from './user_page.module.css';
import MyPosts from './MyPosts/myPosts';
import UserInfo from './UserInfo/user_info';
import { UserPageType, ActionType } from '../../redux/store';

type PropsType = {
    posts: UserPageType
    dispatch: (action: ActionType) => void

}

const Profile = (props: PropsType) => {

    return (
        <div className={style.user_page}>
            <section>
                <img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            </section>
            <UserInfo />
            <MyPosts posts={props.posts} dispatch={props.dispatch} />
        </div>
    )
}
export default Profile;
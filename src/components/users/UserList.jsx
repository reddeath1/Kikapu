/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from '@/components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {setLoading, setRequestStatus} from '@/redux/actions/miscActions';
import {getUsers, getUsersSuccess} from "@/redux/actions/userActions";
import {GET_PRODUCTS_SUCCESS} from "@/constants/constants";
import firebase from "@/services/firebase";

const UserList = (props) => {
  const {
    users, filteredUsers, isLoading, requestStatus, children
  } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const getUsersList = async () => {

    return firebase.getUsers(users.lastRefKey).then((data)=>{
      users.users = data;
      return data;
    })
  }
  const fetchUsers = () => {
    setFetching(true);
    getUsersList();
    dispatch(getUsers(users.lastRefKey));
  };

  useEffect(() => {
    if (typeof users.items != 'undefined' && users.items.length === 0 || !users.lastRefKey) {
      fetchUsers();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [users.lastRefKey]);

  if (filteredUsers.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || 'This feature is still in the making.'} />
    );
  }
  if (filteredUsers.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchUsers}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {/* Show 'Show More' button if products length is less than total products */}
      {users.items.length < users.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchUsers}
            type="button"
          >
            {isFetching ? 'Fetching Users...' : 'Show More Items'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

UserList.defaultProps = {
  requestStatus: null
};

UserList.propTypes = {
  users: PropType.object.isRequired,
  filteredUsers: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default UserList;

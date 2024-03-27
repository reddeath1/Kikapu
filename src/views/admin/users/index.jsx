/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { AppliedFilters, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from '@/selectors/selector';
import UsersTable from './UsersTable';
import UserList from "@/components/users/UserList";

const AdminUsers = () => {
  useDocumentTitle('User List | Kikapu Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredUsers: selectFilter(state.users.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    users: state.users
  }));

  return (
    <Boundary>
      <div className="product-admin-items">
        <UserList {...store}>
          <AppliedFilters filter={store.filter} />
          <UsersTable filteredUsers={store.filteredUsers} />
        </UserList>
      </div>
    </Boundary>
  );
};

export default withRouter(AdminUsers);

import { ImageLoader } from '@/components/common';
import { EDIT_PRODUCT } from '@/constants/routes';
import { displayActionMessage, displayDate, displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React, { useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { removeProduct } from '@/redux/actions/productActions';

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRef = useRef(null);

  // const onClickEdit = () => {
  //   history.push(`${EDIT_PRODUCT}/${user.id}`);
  // };
  //
  // const onDeleteProduct = () => {
  //   userRef.current.classList.toggle('item-active');
  // };
  //
  // const onConfirmDelete = () => {
  //   dispatch(removeProduct(product.id));
  //   displayActionMessage('Item successfully deleted');
  //   userRef.current.classList.remove('item-active');
  // };
  //
  // const onCancelDelete = () => {
  //   userRef.current.classList.remove('item-active');
  // };

  return (
    <SkeletonTheme
      color="#eee"
      highlightColor="#f00"
    >
      <div
        className={`item item-products ${!user.id && 'item-loading'}`}
        ref={userRef}
      >
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {user.avatar ? (
              <ImageLoader
                alt={user.fullname}
                className="item-img"
                src={user.avatar}
              />
            ) : <Skeleton width={50} height={30} />}
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{user.fullname || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{user.email}</span>
          </div>
          <div className="grid-col">
            <span>
              {user.dateJoined ? displayDate(user.dateJoined) : <Skeleton width={30} />}
            </span>
          </div>
          <div className="grid-col">
            <span>{user.role}</span>
          </div>
        </div>
        {/*{user.id && (*/}
        {/*  <div className="item-action">*/}
        {/*    <button*/}
        {/*      className="button button-border button-small"*/}
        {/*      onClick={onClickEdit}*/}
        {/*      type="button"*/}
        {/*    >*/}
        {/*      Edit*/}
        {/*    </button>*/}
        {/*    &nbsp;*/}
        {/*    <button*/}
        {/*      className="button button-border button-small button-danger"*/}
        {/*      onClick={onDeleteProduct}*/}
        {/*      type="button"*/}
        {/*    >*/}
        {/*      Delete*/}
        {/*    </button>*/}
        {/*    <div className="item-action-confirm">*/}
        {/*      <h5>Are you sure you want to delete this?</h5>*/}
        {/*      <button*/}
        {/*        className="button button-small button-border"*/}
        {/*        onClick={onCancelDelete}*/}
        {/*        type="button"*/}
        {/*      >*/}
        {/*        No*/}
        {/*      </button>*/}
        {/*      &nbsp;*/}
        {/*      <button*/}
        {/*        className="button button-small button-danger"*/}
        {/*        onClick={onConfirmDelete}*/}
        {/*        type="button"*/}
        {/*      >*/}
        {/*        Yes*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </SkeletonTheme>
  );
};

UserItem.propTypes = {
  user: PropType.shape({
    id: PropType.string,
    fullname: PropType.string,
    email: PropType.string,
    address: PropType.string,
    avatar: PropType.string,
    dateJoined: PropType.string
  }).isRequired
};

export default UserItem;

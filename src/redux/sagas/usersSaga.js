/* eslint-disable indent */
import { GET_USERS,
} from '@/constants/constants';
import { ADMIN_PRODUCTS } from '@/constants/routes';
import { displayActionMessage } from '@/helpers/utils';
import {
  all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
import { history } from '@/routers/AppRouter';
import firebase from '@/services/firebase';
import {getUsersSuccess} from "@/redux/actions/userActions";

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch users'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* usersSaga({ type, payload }) {

  switch (type) {
    case GET_USERS:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getUsers, payload);

        // console.log(result);
        if (result.users.length === 0) {
          handleError('No user found.');
        } else {
          yield put(getUsersSuccess({
            users: result.users,
            lastKey: state.users.lastRefKey,
            total: state.users.total
          }));
          yield put(setRequestStatus(''));
        }
        // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;

    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default usersSaga;

import { bindActionCreators } from 'redux';
import R from 'ramda';
import { actions } from '../components/Daybook/addEditDaybookEvent';
import { daybookActions } from './../saga/actions.js';


export let daybook_Actions = {
  addEvent(date, subject, room) {
    return { type: daybookActions.ADD_EVENT, date, subject, room };
  },

  editEvent(oldDate, date, subject, room) {
    return { type: daybookActions.EDIT_EVENT, oldDate, date, subject, room };
  },

  deleteEvent(date) {
    return { type: daybookActions.DELETE_EVENT, date };
  },

  updateState(object) {
    return { type: daybookActions.UPDATE_STATE, object };
  },

};

export function bindDaybookActions(dispatch) {
  daybook_Actions = bindActionCreators(daybook_Actions, dispatch);
}

function getTime(str){
  const date = new Date(str);
  return date.getTime();
}

const initState = {
  daybookAction: actions.nope,
  time: '',
  subject: '',
  room: '',

  daybookEvents: [
    {date: getTime('September 3, 2018 08:00:00'), subject: 1, room: '101' },
    {date: getTime('September 3, 2018 08:45:00'), subject: 2, room: '201' },
    {date: getTime('September 4, 2018 08:00:00'), subject: 1, room: '101' },
    {date: getTime('September 4, 2018 08:50:00'), subject: 2, room: '201'},
    {date: getTime('September 4, 2018 09:35:00'), subject: 1, room: '101' },
    {date: getTime('September 5, 2018 08:00:00'), subject: 2, room: '201' },
    {date: getTime('September 5, 2018 08:50:00'), subject: 1, room: '101' },
    {date: getTime('September 5, 2018 09:35:00'), subject: 2, room: '201'},
    {date: getTime('September 6, 2018 08:00:00'), subject: 1, room: '101' },
    {date: getTime('September 6, 2018 08:50:00'), subject: 2, room: '201' },
    {date: getTime('September 7, 2018 08:00:00'), subject: 1, room: '101' },
    {date: getTime('September 7, 2018 08:50:00'), subject: 2, room: '201'},
    {date: getTime('September 7, 2018 09:35:00'), subject: 1, room: '101' },
    {date: getTime('September 10, 2018 08:00:00'), subject: 2, room: '201' },
    {date: getTime('September 10, 2018 08:50:00'), subject: 1, room: '101' },
    {date: getTime('September 10, 2018 09:35:00'), subject: 2, room: '201'},

  ]
};

function passNewItem(array, date, subject, room){
  const objToInsert = { date, subject, room };
  const newDaybook = array.slice();
  const insertBefore = newDaybook.findIndex((el) => el.date > date);
  const placeToInsert = insertBefore !== -1 ? insertBefore : array.length;
  newDaybook.splice(placeToInsert, 0, objToInsert);
  return newDaybook;
}

function editItem(array, oldDate, date, subject, room){
  const newDaybook = array.slice();
  const elToRemove = newDaybook.findIndex((el) => el.date === oldDate);
  newDaybook.splice(elToRemove, 1);
  const objToInsert = { date, subject, room };
  const insertBefore = newDaybook.findIndex((el) => el.date > date);
  const placeToInsert = insertBefore !== -1 ? insertBefore : array.length;
  newDaybook.splice(placeToInsert, 0, objToInsert);
  return newDaybook;
}

export function daybookReducer(state = initState, action) {
  switch (action.type) {
    case daybookActions.ADD_EVENT:
      return {
        ...state,
        daybookEvents: passNewItem(state.daybookEvents, action.date, action.subject, action.room)
      };
    case daybookActions.EDIT_EVENT:

      return {
        ...state,
        daybookEvents: editItem(state.daybookEvents, action.oldDate, action.date, action.subject, action.room)
      };
    case daybookActions.DELETE_EVENT:
      return {
        ...state,
        daybookEvents: R.filter((el) => el.date !== action.date , state.daybookEvents)
      };
    case daybookActions.UPDATE_STATE:
      return { ...state, ...action.object };
    default:
      return state;
  }
}

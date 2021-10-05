import { combineReducers } from 'redux';
import dashboardReducers from '../reducers/dashboard';
import filemanagerReducers from '../reducers/filemanager';

const reducer = combineReducers({
    dashboard: dashboardReducers,
    filemanager: filemanagerReducers
});

export default reducer;
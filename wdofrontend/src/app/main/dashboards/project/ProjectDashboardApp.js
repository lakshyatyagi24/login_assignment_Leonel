import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import HomeTab from './tabs/home/HomeTab';
import TeamTab from './tabs/team/TeamTab';
import BudgetTab from './tabs/budget/BudgetTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

function ProjectDashboardApp(props) {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  if (_.isEmpty(widgets)) {
    return null;
  }

  return (
    <Root
      header={<ProjectDashboardAppHeader />}
    />
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);

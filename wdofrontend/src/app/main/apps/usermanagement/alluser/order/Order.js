import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import { getUser, getOrder, resetOrder, selectOrder } from '../store/orderSlice';
// import InvoiceTab from './tabs/InvoiceTab';
// import OrderDetailsTab from './tabs/OrderDetailsTab';
// import ProductsTab from './tabs/ProductsTab';
// import { ButtonGroup } from '@mui/material';
// import { orderStatuses } from './OrdersStatus';
import Stack from '@mui/material/Stack';
import jwbServiceConfig from "../../../../../../app/auth/services/jwtService/jwtServiceConfig";
import axios from 'axios';
import PersonalDetailsTab from './tabs/PersonalDetailsTab';
import QualificationDetailsTab from './tabs/QualificationDetailsTab';
import AddressDetailsTab from './tabs/AddressDetailsTab';
import IndustryExperienceDetails from './tabs/IndustryExperienceDetails';
import { ButtonGroup } from '@mui/material';

function Order(props) {
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);
  console.log(order);
  const theme = useTheme();
  const isMobile = useThemeMediaQuery((_theme) => _theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const { userId } = routeParams;
  const [tabValue, setTabValue] = useState(0);
  const [noOrder, setNoOrder] = useState(false);


  useDeepCompareEffect(() => {
    dispatch(getUser(userId)).then((action) => {
      if (!action.payload) {
        setNoOrder(true);
      }
    });
  }, [dispatch, routeParams]);

  useEffect(() => {
    return () => {
      dispatch(resetOrder());
      setNoOrder(false);
    };
  }, [dispatch]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  function onChangeStatus(status) {
    axios.post(jwbServiceConfig.changeUserStatus, { id: userId, status: status })
      .then((response) => {
      })
      .catch((error) => {

      })
  }

  // if (noOrder) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-col flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         There is no such order!
  //       </Typography>
  //       <Button
  //         className="mt-24"
  //         component={Link}
  //         variant="outlined"
  //         to="/apps/e-commerce/orders"
  //         color="inherit"
  //       >
  //         Go to Orders Page
  //       </Button>
  //     </motion.div>
  //   );
  // }

  return (
    <FusePageCarded
      header={
        order && (
          <div className="flex flex-1 flex-col items-center sm:items-start py-32 px-24 md:px-32">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography
                className="flex items-center sm:mb-12"
                component={Link}
                role="button"
                // to="/apps/e-commerce/orders"
                to="/apps/user/get-all-users"
                color="inherit"
              >
                <FuseSvgIcon size={20}>
                  {theme.direction === 'ltr'
                    ? 'heroicons-outline:arrow-sm-left'
                    : 'heroicons-outline:arrow-sm-right'}
                </FuseSvgIcon>
                <span className="mx-4 font-medium">All Users</span>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
              className="flex flex-row items-center sm:items-start min-w-0 items-center sm:items-start"
            >
              <motion.div>
                <Typography className="text-20 truncate font-semibold">
                  {`Username: ${order.first_name} ${order.last_name}`}
                </Typography>
                <Typography className="text-20 truncate font-semibold">
                  {`Email: ${order.email}`}
                </Typography>
                {/* <Typography variant="caption" className="font-medium">
                {`Role: ${order.role}`}
              </Typography> */}
              </motion.div>
              <motion.div>
                <div className="flex justify-center w-full sticky bottom-0 p-16 pb-32 z-10">
                  <ButtonGroup variant="contained" direction="row" spacing={3}>
                    <Button className="bg-green text-white text-40"
                      style={{ borderRadius: "5px"}}
                      disabled={order.status.toUpperCase() == "ACTIVE"}
                      onClick={(event) => onChangeStatus("active")}>
                      ACTIVE
                    </Button>
                    <Button className="bg-blue-700 text-white text-40"
                      style={{ borderRadius: "5px"}}
                      disabled={order.status.toUpperCase() == "PENDING"}
                      onClick={(event) => onChangeStatus("pending")}>

                      PENDING
                    </Button>
                    <Button className="bg-red-700 text-white text-40"
                      style={{ borderRadius: "5px"}}
                      disabled={order.status.toUpperCase() == "REJECT"}
                      onClick={(event) => onChangeStatus("reject")}>
                      REJECT
                    </Button>
                    <Button className="bg-orange text-white text-40"
                      style={{ borderRadius: "5px"}}
                      disabled={order.status.toUpperCase() == "DEFECT"}
                      onClick={(event) => onChangeStatus("defect")}>
                      DEFECT
                    </Button>
                    <Button className="bg-purple-700 text-white text-40"
                      style={{ borderRadius: "5px"}}
                      disabled={order.status.toUpperCase() == "INACTIVE"}
                      onClick={(event) => onChangeStatus("inactive")}>
                      INACTIVE</Button>
                  </ButtonGroup>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )
      }
      content={ order &&
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64 border-b-1' }}
          >
            <Tab className="h-64" label="PersonalDetails" />
            <Tab className="h-64" label="Qualification Details" />
            <Tab className="h-64" label="Address Details" />
            <Tab className="h-64" label="Industry Experience Details" />
          </Tabs>
          {Object.assign(order)["personal_details"] && (
            <div className="w-full">
              {tabValue === 0 && <PersonalDetailsTab personal_details={order.personal_details}/>}
              {tabValue === 1 && <QualificationDetailsTab qualification_details={order.qualification_details}/>}
              {tabValue === 2 && <AddressDetailsTab  address_details={order.address}/>}
              {tabValue === 3 && <IndustryExperienceDetails/>}
            </div>
          )}
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Order);

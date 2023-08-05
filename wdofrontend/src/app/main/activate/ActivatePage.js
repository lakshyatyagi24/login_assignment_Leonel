import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtService from '../../auth/services/jwtService';

import { showMessage } from 'app/store/fuse/messageSlice';
import history from '@history';

const ActivateAccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();

  console.log(token)

  const [verified, setVerified] = useState(false);

  const handleVerifyAccount = () => {
    jwtService
      .verify(token)
      .then((res) => {
        console.log('--------');
        dispatch(
          showMessage({
            message: `Successed\n${res.msg}`,//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
              vertical: 'top',//top bottom
              horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
          }))
        // history.push('/');
      })
      .catch((error) => {
        console.log('sssssssssssss');
        dispatch(
          showMessage({
            message: `Failed\n${error.msg}`,//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
              vertical: 'top',//top bottom
              horizontal: 'right'//left center right
            },
            variant: 'error'//success error info warning null
          }));
        // history.push('/');
      });
  };

  useEffect(() => {
    verified && navigate("/");
  }, [verified, navigate]);

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Activate your account</h1>
        <button
          onClick={handleVerifyAccount}
          style={{ marginTop: "50px" }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default ActivateAccountPage;

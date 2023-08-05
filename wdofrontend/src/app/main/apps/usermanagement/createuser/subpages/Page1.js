import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { authRoles } from 'src/app/auth';

const schema = yup.object().shape({
  name: yup.string().required('You must enter name'),
  fatherName: yup.string().required('You must enter Father name'),
  motherName: yup.string().required('You must enter Mother name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  birthday: yup.date().required('You must enter birthday'),
  phone: yup.number().required('You must phone number'),
  alterPhone: yup.number().required('You must enter althernative phone number'),
  userRole: yup.string().required('You must enter your role'),
});


const defaultValues = {
  name: '',
  fatherName: '',
  motherName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birthday: '',
  phone: '',
  alterPhone: '',
  userRole: 'others',
};

const Page1 = React.forwardRef((props, ref) => {
  const user = useSelector(selectUser);

  const { control, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const childFunction = () => {
    var validater = 0;
    Object.values(control._formValues).forEach(value => {
      if (value == '' || value == null) {
        validater = 1;
      }
    })
    if (Object.keys(errors).length || validater) { return 0; }
    return control._formValues
  }

  React.useImperativeHandle(ref, () => ({
    childFunction
  }));

  return (
    <form>
      <Box sx={{ flexGrow: 1 }} className="p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Name"
                  autoFocus
                  type="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="fatherName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Father name"
                  autoFocus
                  type="fatherName"
                  error={!!errors.fatherName}
                  helperText={errors?.fatherName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="motherName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Mother name"
                  autoFocus
                  type="name"
                  error={!!errors.motherName}
                  helperText={errors?.motherName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label=""
                  autoFocus
                  type="date"
                  error={!!errors.birthday}
                  helperText={errors?.birthday?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone Number"
                  autoFocus
                  type="phone number"
                  error={!!errors.phone}
                  helperText={errors?.phone?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="alterPhone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Alternative Phone Number"
                  autoFocus
                  type="phone number"
                  error={!!errors.alterPhone}
                  helperText={errors?.alterPhone?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Controller
              name="userRole"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={defaultValues.userRole}
                    {...field}
                    error={!!errors.userRole}
                    helperText={errors?.userRole?.message}
                    fullWidth
                  >
                    {
                      authRoles.roles[user.role].map((role, index) => (
                        <MenuItem value={role} key={index}>{role}</MenuItem>
                      ))
                    }
                  </Select>
                </div>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
})

export default Page1;

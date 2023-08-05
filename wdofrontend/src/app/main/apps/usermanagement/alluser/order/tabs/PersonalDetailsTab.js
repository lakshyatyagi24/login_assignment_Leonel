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
  father_name: yup.string().required('You must enter Father name'),
  mother_name: yup.string().required('You must enter Mother name'),
  email_address: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  birthday: yup.date().required('You must enter birthday'),
  phonenumber: yup.number().required('You must phone number'),
  alter_phone: yup.number().required('You must enter althernative phone number'),
  userRole: yup.string().required('You must enter your role'),
});


// const defaultValues = {
//   name: '',
//   father_name: '',
//   mother_name: '',
//   email_address: '',
//   password: '',
//   passwordConfirm: '',
//   birthday: '',
//   phonenumber: '',
//   alter_phone: '',
//   role: 'others',
// };

const PersonalDetailsTab = React.forwardRef((props, ref) => {
  const user = useSelector(selectUser);

  const defaultValues = {
    name: props.personal_details.name,
    father_name: props.personal_details.father_name,
    mother_name: props.personal_details.mother_name,
    email_address: props.personal_details.email,
    password: props.personal_details.password,
    passwordConfirm: props.personal_details.password,
    birthday: props.personal_details.role.birthday,
    phonenumber: props.personal_details.phonenumber,
    alter_phone: props.personal_details.alter_phone,
    role: props.personal_details.role
  };

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
              name="father_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Father name"
                  autoFocus
                  type="father_name"
                  error={!!errors.father_name}
                  helperText={errors?.father_name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="mother_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Mother name"
                  autoFocus
                  type="name"
                  error={!!errors.mother_name}
                  helperText={errors?.mother_name?.message}
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
              name="email_address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email_address}
                  helperText={errors?.email_address?.message}
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
              name="phonenumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone Number"
                  autoFocus
                  type="phone number"
                  error={!!errors.phonenumber}
                  helperText={errors?.phonenumber?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="alter_phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Alternative Phone Number"
                  autoFocus
                  type="phone number"
                  error={!!errors.alter_phone}
                  helperText={errors?.alter_phone?.message}
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
              name="role"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    {...field}
                    error={!!errors.role}
                    helperText={errors?.role?.message}
                    fullWidth
                  >
                    {
                      authRoles.roles[user.role].map((r, index) => (
                        <MenuItem value={r} key={index}>{r}</MenuItem>
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

export default PersonalDetailsTab;

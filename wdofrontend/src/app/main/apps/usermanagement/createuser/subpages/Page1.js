import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
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
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

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


const defaultValues = {
  name: '',
  father_name: '',
  mother_name: '',
  email_address: '',
  password: '',
  passwordConfirm: '',
  birthday: '',
  phonenumber: '',
  alter_phone: '',
  avartar: null,
  role: 'others',
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
        <Grid container spacing={0} className='mb-40'>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} className="relative flex items-center justify-center">
            <Controller
              control={control}
              name="avartar"
              className="relative flex items-center justify-center"
              render={({ field: { onChange, value } }) => (
                <Box
                  sx={{
                    borderWidth: 4,
                    borderStyle: 'solid',
                    borderColor: 'background.paper',
                  }}
                  className="relative flex items-center justify-center w-256 h-256 rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div>
                      <label htmlFor="button-avatar" className="flex p-8 cursor-pointer">
                        <input
                          accept="image/*"
                          className="hidden"
                          id="button-avatar"
                          type="file"
                          onChange={async (e) => {
                            function readFileAsync() {
                              return new Promise((resolve, reject) => {
                                const file = e.target.files[0];
                                if (!file) {
                                  return;
                                }
                                const reader = new FileReader();

                                reader.onload = () => {
                                  resolve(`data:${file.type};base64,${btoa(reader.result)}`);
                                };

                                reader.onerror = reject;

                                reader.readAsBinaryString(file);
                              });
                            }

                            const newImage = await readFileAsync();

                            onChange(newImage);
                          }}
                        />
                        <FuseSvgIcon className="text-white">heroicons-outline:camera</FuseSvgIcon>
                      </label>
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          onChange('');
                        }}
                      >
                        <FuseSvgIcon className="text-white">heroicons-solid:trash</FuseSvgIcon>
                      </IconButton>
                    </div>
                  </div>
                  <Avatar
                    sx={{
                      backgroundColor: 'background.default',
                      color: 'text.secondary',
                    }}
                    className="object-cover w-full h-full text-64 font-bold"
                    src={value}
                    alt={user.name}
                  >
                    {/* {user.name.charAt(0)} */}
                  </Avatar>
                </Box>
              )}
            />
          </Grid>
        </Grid>
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
                    value={defaultValues.role}
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
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
})

export default Page1;

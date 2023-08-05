import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  street1: yup.string().required('You must enter street'),
  landmark1: yup.string().required('You must enter landmark'),
  city1: yup.string().required('You must enter city'),
  state1: yup.string().required('You must enter state'),
  zip_code1: yup.string().required('You must enter zipconde'),
  street2: yup.string().required('You must enter street'),
  landmark2: yup.string().required('You must enter landmark'),
  city2: yup.string().required('You must enter city'),
  state2: yup.string().required('You must enter state'),
  zip_code2: yup.string().required('You must enter zipconde'),

});


const defaultValues = {
  street1: "",
  landmark1: "",
  city1: "",
  state1: "",
  zip_code1: "",
  street2: "",
  landmark2: "",
  city2: "",
  state2: "",
  zip_code2: "",
}

const Page3 = React.forwardRef((props, ref) => {
  const { control, formState, handleSubmit, reset } = useForm({
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

    const data = {
      permanent_address: {
        street: control._formValues.street1,
        landmark: control._formValues.landmark1,
        city: control._formValues.city1,
        state: control._formValues.state1,
        zip_code: control._formValues.zip_code1,
      },
      current_address: {
        street: control._formValues.street2,
        landmark: control._formValues.landmark2,
        city: control._formValues.city2,
        state: control._formValues.state2,
        zip_code: control._formValues.zip_code2,
      },
      same_address: true,
    }

    return data;
  }

  React.useImperativeHandle(ref, () => ({
    childFunction
  }));

  return (
    <Box sx={{ flexGrow: 1 }} className="p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16">
      <form>
        <h2>Permanent Address</h2>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Controller
              name="street1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Streets"
                  autoFocus
                  type="name"
                  error={!!errors.street1}
                  helperText={errors?.street1?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="landmark1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Landmark"
                  autoFocus
                  type="name"
                  error={!!errors.landmark1}
                  helperText={errors?.landmark1?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="city1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="City/Village"
                  autoFocus
                  type="name"
                  error={!!errors.city1}
                  helperText={errors?.city1?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="state1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="State"
                  autoFocus
                  type="name"
                  error={!!errors.state1}
                  helperText={errors?.state1?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="zip_code1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Zipcode"
                  autoFocus
                  type="name"
                  error={!!errors.zip_code1}
                  helperText={errors?.zip_code1?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <h2>Current Address</h2>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Controller
              name="street2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Streets"
                  autoFocus
                  type="name"
                  error={!!errors.street2}
                  helperText={errors?.street2?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="landmark2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Landmark"
                  autoFocus
                  type="name"
                  error={!!errors.landmark2}
                  helperText={errors?.landmark2?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="city2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="City/Village"
                  autoFocus
                  type="name"
                  error={!!errors.city2}
                  helperText={errors?.city2?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="state2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="State"
                  autoFocus
                  type="name"
                  error={!!errors.state2}
                  helperText={errors?.state2?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="zip_code2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Zipcode"
                  autoFocus
                  type="name"
                  error={!!errors.zip_code2}
                  helperText={errors?.zip_code2?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
})

export default Page3;

import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  board_name1: yup.string().required('You must enter board_name'),
  year1: yup.string().required('You must enter year'),
  percentage1: yup.string().required('You must enter percentage'),
  roll_no1: yup.string().required('You must enter roll number'),
  board_name2: yup.string().required('You must enter board_name'),
  year2: yup.string().required('You must enter year'),
  percentage2: yup.string().required('You must enter percentage'),
  roll_no2: yup.string().required('You must enter roll number'),
  board_name3: yup.string().required('You must enter board_name'),
  year3: yup.string().required('You must enter year'),
  percentage3: yup.string().required('You must enter percentage'),
  roll_no3: yup.string().required('You must enter roll number'),
  board_name4: yup.string().required('You must enter board_name'),
  year4: yup.string().required('You must enter year'),
  percentage4: yup.string().required('You must enter percentage'),
  roll_no4: yup.string().required('You must enter roll number'),
});


const defaultValues = {
  board_name1: '',
  year1: '',
  percentage1: '',
  roll_no1: '',
  board_name2: '',
  year2: '',
  percentage2: '',
  roll_no2: '',
  board_name3: '',
  year3: '',
  percentage3: '',
  roll_no3: '',
  board_name4: '',
  year4: '',
  percentage4: '',
  roll_no4: '',
};

const Page2 = React.forwardRef((props, ref) => {
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
    const data = {
      tenth: {
          board_name: control._formValues.board_name1,
          year: control._formValues.year1,
          percentage: control._formValues.percentage1,
          roll_no: control._formValues.roll_no1
      },
      twelfth: {
        board_name: control._formValues.board_name2,
        year: control._formValues.year2,
        percentage: control._formValues.percentage2,
        roll_no: control._formValues.roll_no2
    },
      university: {
        board_name: control._formValues.board_name3,
        year: control._formValues.year3,
        percentage: control._formValues.percentage3,
        roll_no: control._formValues.roll_no3
    },
      other: {
        board_name: control._formValues.board_name4,
        year: control._formValues.year4,
        percentage: control._formValues.percentage4,
        roll_no: control._formValues.roll_no4
    },
    }
    return data;
  }

  React.useImperativeHandle(ref, () => ({
    childFunction
  }));

  return (
  <Box sx={{ flexGrow: 1 }} className="p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16">
      <form>
        <Box sx={{ flexGrow: 0 }}>
          <h2>10th</h2>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Controller
                name="board_name1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Board Name"
                    autoFocus
                    type="string"
                    error={!!errors.board_name1}
                    helperText={errors?.board_name1?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="year1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Qualification Name"
                    autoFocus
                    type="string"
                    error={!!errors.year1}
                    helperText={errors?.year1?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="percentage1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Percentage"
                    autoFocus
                    type="name"
                    error={!!errors.percentage1}
                    helperText={errors?.percentage1?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="roll_no1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Total Year of Experience"
                    autoFocus
                    type="Roll Number"
                    error={!!errors.roll_no1}
                    helperText={errors?.roll_no1?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <h2>12th</h2>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Controller
                name="board_name2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Board Name"
                    autoFocus
                    type="string"
                    error={!!errors.board_name2}
                    helperText={errors?.board_name2?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="year2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Qualification Name"
                    autoFocus
                    type="string"
                    error={!!errors.year2}
                    helperText={errors?.year2?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="percentage2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Percentage"
                    autoFocus
                    type="name"
                    error={!!errors.percentage2}
                    helperText={errors?.percentage2?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="roll_no2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Total Year of Experience"
                    autoFocus
                    type="Roll Number"
                    error={!!errors.roll_no2}
                    helperText={errors?.roll_no2?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <h2>University Qualification</h2>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Controller
                name="board_name3"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Board Name"
                    autoFocus
                    type="string"
                    error={!!errors.board_name3}
                    helperText={errors?.board_name3?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="year3"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Qualification Name"
                    autoFocus
                    type="string"
                    error={!!errors.year3}
                    helperText={errors?.year3?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="percentage3"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Percentage"
                    autoFocus
                    type="name"
                    error={!!errors.percentage3}
                    helperText={errors?.percentage3?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="roll_no3"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Total Year of Experience"
                    autoFocus
                    type="Roll Number"
                    error={!!errors.roll_no3}
                    helperText={errors?.roll_no3?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <h2>Other Qualification (Optional)</h2>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Controller
                name="board_name4"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Board Name"
                    autoFocus
                    type="string"
                    error={!!errors.board_name4}
                    helperText={errors?.board_name4?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="year4"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Qualification Name"
                    autoFocus
                    type="string"
                    error={!!errors.year4}
                    helperText={errors?.year4?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="percentage4"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Percentage"
                    autoFocus
                    type="name"
                    error={!!errors.percentage4}
                    helperText={errors?.percentage4?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="roll_no4"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Total Year of Experience"
                    autoFocus
                    type="Roll Number"
                    error={!!errors.roll_no4}
                    helperText={errors?.roll_no4?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
})

export default Page2;

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import _ from '@lodash';

const schema = yup.object().shape({
    industry_name: yup.string().required('You must enter industry_name'),
    designation: yup.string().required('You must enter designation'),
    salary: yup.string().required('You must enter salary'),
    user_experiences: yup.string().required('You must enter experience'),
});

const defaultValues = {

}

const SubPage4 = React.forwardRef((props, ref) => {
    const { control, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors, setError } = formState;

    const childFunction = () => {
        var validater = 0;
        Object.values(control._formValues).forEach(value => {
            if (value == '' || value == null) {
                validater = 1;
            }
        })
        if (Object.keys(errors).length || validater) { return 0; }
        return control._formValues;
    }

    React.useImperativeHandle(ref, () => ({
        childFunction
    }));

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Controller
                    name="industry_name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Industry Name"
                            autoFocus
                            type="name"
                            error={!!errors.industry_name}
                            helperText={errors?.industry_name?.message}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />
            </Grid>
            <Grid item xs={3}>
                <Controller
                    name="designation"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Designation"
                            autoFocus
                            type="name"
                            error={!!errors.designation}
                            helperText={errors?.designation?.message}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />
            </Grid>
            <Grid item xs={3}>
                <Controller
                    name="salary"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Salary"
                            autoFocus
                            type="number"
                            error={!!errors.salary}
                            helperText={errors?.salary?.message}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />
            </Grid>
            <Grid item xs={3}>
                <Controller
                    name="user_experiences"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Total Year of Experience"
                            autoFocus
                            type="number"
                            error={!!errors.user_experiences}
                            helperText={errors?.user_experiences?.message}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
})

export default SubPage4;

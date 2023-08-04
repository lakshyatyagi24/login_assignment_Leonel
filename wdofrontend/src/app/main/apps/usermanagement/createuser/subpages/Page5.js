import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';

import Cookies from 'js-cookie';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    firstName: yup.string().required('You must enter First name'),
    lastName: yup.string().required('You must enter Last name'),
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
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
    role: '10',
    image: null,
    acceptTermsConditions: false,
};

function Page4() {
    const { control, formState, handleSubmit, reset } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors, setError } = formState;

    function onSubmit({ firstName, lastName, password, email }) {
        const csrfToken = Cookies.get('csrftoken');

        console.log(firstName, lastName, password, email);

        let formData = {
            first_name: firstName,
            last_name: lastName,
            password: password,
            re_password: password,
            email: email
        };
    }

    const names = ["10th", "12th", "University Qualification", "Other Qualification (Optional)"]

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Controller
                        name="images"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Box
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                component="label"
                                htmlFor="button-file"
                                className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
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
                                                    resolve({
                                                        id: FuseUtils.generateGUID(),
                                                        url: `data:${file.type};base64,${btoa(reader.result)}`,
                                                        type: 'image',
                                                    });
                                                };

                                                reader.onerror = reject;

                                                reader.readAsBinaryString(file);
                                            });
                                        }

                                        const newImage = await readFileAsync();

                                        onChange([newImage, ...value]);
                                    }}
                                />
                                <FuseSvgIcon size={32} color="action">
                                    heroicons-outline:upload
                                </FuseSvgIcon>
                                <h3>10th Marksheet</h3>
                            </Box>
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="images"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Box
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                component="label"
                                htmlFor="button-file"
                                className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
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
                                                    resolve({
                                                        id: FuseUtils.generateGUID(),
                                                        url: `data:${file.type};base64,${btoa(reader.result)}`,
                                                        type: 'image',
                                                    });
                                                };

                                                reader.onerror = reject;

                                                reader.readAsBinaryString(file);
                                            });
                                        }

                                        const newImage = await readFileAsync();

                                        onChange([newImage, ...value]);
                                    }}
                                />
                                <FuseSvgIcon size={32} color="action">
                                    heroicons-outline:upload
                                </FuseSvgIcon>
                                <h3>12th Marksheet</h3>
                            </Box>
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="images"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Box
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                component="label"
                                htmlFor="button-file"
                                className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
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
                                                    resolve({
                                                        id: FuseUtils.generateGUID(),
                                                        url: `data:${file.type};base64,${btoa(reader.result)}`,
                                                        type: 'image',
                                                    });
                                                };

                                                reader.onerror = reject;

                                                reader.readAsBinaryString(file);
                                            });
                                        }

                                        const newImage = await readFileAsync();

                                        onChange([newImage, ...value]);
                                    }}
                                />
                                <FuseSvgIcon size={32} color="action">
                                    heroicons-outline:upload
                                </FuseSvgIcon>
                                <h3>Aadhar Card</h3>
                            </Box>
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Controller
                        name="images"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Box
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                component="label"
                                htmlFor="button-file"
                                className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
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
                                                    resolve({
                                                        id: FuseUtils.generateGUID(),
                                                        url: `data:${file.type};base64,${btoa(reader.result)}`,
                                                        type: 'image',
                                                    });
                                                };

                                                reader.onerror = reject;

                                                reader.readAsBinaryString(file);
                                            });
                                        }

                                        const newImage = await readFileAsync();

                                        onChange([newImage, ...value]);
                                    }}
                                />
                                <FuseSvgIcon size={32} color="action">
                                    heroicons-outline:upload
                                </FuseSvgIcon>
                                <h3>Bank Passbook</h3>
                            </Box>
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Page4;

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Box from '@mui/material/Box';

const category = [
  "10th Marksheet",
  "12th Marksheet",
  "Aadhar Card",
  "Alternative Govt. ID Card",
  "Bank Passbook",
  "Graduation/ Diploma (Optional)",
  "Post Graduation (Optional)",
  "Experience Certificate (Optional)",
  "Salary Slip (Optional)"
]

const Page5 = React.forwardRef((props, ref) => {

  const [state, setState] = useState({
    fileName: new Array(9).fill(""),
    files: new Array(9).fill("")
  })

  const childFunction = () => {
    for (let i = 0; i < 5; i++) {
      if (state.fileName[i] == "") {
        return 0;
      }
    }
    const data = {
      tenth_marksheet: state.files[0],
      "twelfth_marksheet": state.files[1],
      "aadhar_card": state.files[2],
      "alternative_card": state.files[3],
      "bank_passbook": state.files[4],
      "graduation": state.files[5],
      "post_graduation": state.files[6],
      "experience_certificate": state.files[7],
      "salary_slip": state.files[7]
    };

    return data;
  }

  React.useImperativeHandle(ref, () => ({
    childFunction
  }));

  return (
    <Box sx={{ flexGrow: 1 }} className="p-16 pb-64 sm:p-16 sm:pb-16 md:p-48 md:pb-16">
      <Grid container spacing={1}>
        {category.map((val, index) => {
          return (<Grid item xs={4} key={index}>
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              component="label"
              htmlFor={"button-file" + index}
              className="productImageUpload flex flex-wrap items-center justify-center h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept=".pdf,.doc,.docx"
                className="hidden"
                id={"button-file" + index}
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
                          type: 'document',
                          name: file.name
                        });
                      };

                      reader.onerror = reject;

                      reader.readAsBinaryString(file);
                    });
                  }
                  const newfile = await readFileAsync();
                  const newFileName = state.fileName;
                  newFileName[index] = newfile.name;
                  const newFiles = state.files;
                  newFiles[index] = newfile.url;
                  setState((prevState) => ({
                    ...prevState,
                    fileName: newFileName,
                    files: newFiles
                  }));
                }}
              />
              <Grid item xs={12}>
                <Box className='flex flex-wrap items-center justify-center'>
                  <h2>{val}</h2>
                </Box>
              </Grid>
              <Grid item xs={12} className='flex flex-wrap items-center justify-center'>
                <Box>
                  <FuseSvgIcon size={36} color={state.fileName[index] ? "success" : "error"}>
                    heroicons-outline:upload
                  </FuseSvgIcon>
                </Box>
              </Grid>
              <Grid item xs={12} className='flex flex-wrap items-center justify-center'>
                <Box>
                  <h3>{state.fileName[index]}</h3>
                </Box>
              </Grid>
            </Box>
          </Grid>)
        })}
      </Grid>
    </Box>
  );
})

export default Page5;

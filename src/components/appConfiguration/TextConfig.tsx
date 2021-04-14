import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IConfiguration } from './interfaces';

interface IProps {
  textValue: string | null;
  updateConfigData: (config: IConfiguration) => void;
  //onChange: any;
}

export const PanDrugsConfig = (props: IProps) => {
  const { t } = useTranslation();

  const modules = {
    toolbar: [['bold', 'italic'], ['link']]
  };
  return (
    <React.Fragment>
      <Typography color="primary" variant="subtitle2" style={{ marginBottom: 10, marginTop: 30, fontWeight: 'bold' }}>
        {t('launch.administrationInfoTitle')}
      </Typography>
      <Grid container>
        <Grid item xs={11}>
          <div style={{ height: 200, marginBottom: 25 }}>
            <ReactQuill
              theme="snow"
              value={props.textValue ?? ''}
              onChange={(textValue: string, delta: any, source: string, editor: any) => {
                props.updateConfigData({ setupInformation: textValue });
              }}
              //onChange={props.onChange}
              modules={modules}
              style={{ height: 150 }}
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default PanDrugsConfig;

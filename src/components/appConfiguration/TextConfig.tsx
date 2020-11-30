import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IProps {
    textValue: string,
    onChange: any
}

export const PanDrugsConfig = (props: IProps) => {
    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            ['bold', 'italic'],
            ['link']
        ]
    }
    return (
        <React.Fragment>
            <Typography variant="subtitle2" style={{marginBottom: 10, marginTop: 30}}>
                {t('launch.installationInfoTitle')}
            </Typography>
            <div style={{ height: 200, marginBottom: 25 }}>
                <ReactQuill theme="snow" value={props.textValue} onChange={props.onChange} modules={modules} style={{ height: 150 }} />
            </div>
        </React.Fragment>
    );
};
export default PanDrugsConfig;

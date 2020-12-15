import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';


const DEFAULT_DELAY_MS = 250;


interface IProps {
    delay?: number;
    value: string;
    onChange: (newText: string) => void;
    [prop: string]: any;
}

function DelayedTextField(props: IProps) {
    const { delay, value, onChange, ...rest } = props;
    const [text, setText] = useState(props.value || "");

    useEffect(() => {
        if (text != value) {
            const timerId = setTimeout(() => { onChange(text); }, delay || DEFAULT_DELAY_MS);
            return () => { clearTimeout(timerId); };
        }
    }, [text, value]);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value as string;
        setText(newValue);
    }

    return (
        <TextField {...props} value={text} onChange={handleTextChange} />
    );
}


export default DelayedTextField;
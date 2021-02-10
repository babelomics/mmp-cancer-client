import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

interface IProps {
  value: number;
  children: React.ReactElement<ITabProps>[] | React.ReactElement<ITabProps>;
  onChange?: (index: number) => void;
}

interface ITabProps {
  title: string;
  component: any;
  hidden?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export const GaiaTab = (props: ITabProps) => {
  return (
    <Button onClick={props.onClick} color={props.active ? 'primary' : 'default'}>
      {props.title}
    </Button>
  );
};

const GaiaTabsPanel = ({ value = 0, children, onChange }: IProps) => {
  const [valueState, setValue] = useState<number>(value);
  const [childs, setChilds] = useState<any[]>([]);

  useEffect(() => {
    const newChilds = [] as (ITabProps | null)[];

    React.Children.map(children, (child: React.ReactElement<ITabProps>) => {
      if (!child.props.hidden) {
        newChilds.push(child.props.component);
      } else {
        newChilds.push(null);
      }

      setChilds(newChilds);
    });
  }, [children]);

  useEffect(() => {
    if (value !== valueState) {
      setValue(value);
    }
  }, [value]);

  return (
    <React.Fragment>
      <Grid container direction="row" justify="space-around">
        {React.Children.map(children, (child: any, index: number) => {
          if (child?.type != GaiaTab) return;
          if (child.props.hidden) return;

          return (
            <Grid item>
              {React.cloneElement(
                child,
                {
                  ...child.props,
                  active: valueState === index,
                  onClick: () => {
                    if (onChange) {
                      onChange(index);
                    } else {
                      setValue(index);
                    }
                  }
                },
                null
              )}
            </Grid>
          );
        })}
      </Grid>
      <Box p={5}>{childs[valueState] && childs[valueState]}</Box>
    </React.Fragment>
  );
};

export default GaiaTabsPanel;

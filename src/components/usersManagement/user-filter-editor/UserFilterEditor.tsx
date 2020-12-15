import React from 'react';
import { Box, Collapse, Grid, IconButton, Paper, TextField } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DelayedTextField from '../../../cbra/components/DelayedTextField';
import PeriodField from '../../../cbra/components/PeriodField';
import UserFilter from '../../../cbra/models/UserFilter';


interface IProps {
    filter: UserFilter;
    setFilter: (newUserFilter: UserFilter) => void;
}


interface IState {
    expanded: boolean;
}


class UserFilterEditor extends React.PureComponent<IProps, IState> {

    state = {
        expanded: false,
    };

    render() {
        const { filter } = this.props;
        const searchText = filter.searchText || "";

        const { expanded } = this.state;

        return (
            <Box margin={2}>
                <Paper elevation={1}>
                    <Box padding={2}>
                        <Grid container>
                            <Grid item xs={11}>
                                <DelayedTextField variant="outlined" margin="dense" fullWidth value={searchText} onChange={this.handleSearchTextChange} />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={this.handleExpandClick}>
                                    {!!expanded && <ExpandLessIcon />}
                                    {!expanded && <ExpandMoreIcon />}
                                </IconButton>
                            </Grid>
                            <Collapse in={!!expanded}>
                                <Grid item xs={12}>
                                    <PeriodField variant="outlined" margin="dense" before={filter.createdBefore} after={filter.createdAfter} onBeforeChange={this.handleCreatedBeforeChange} onAfterChange={this.handleCreatedAfterChange} afterLabel="Created after" beforeLabel="Created before" />
                                </Grid>
                                <Grid item xs={12}>
                                    The rest of the filter...
                            |{filter.searchText}|
                        </Grid>
                            </Collapse>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        );
    }

    private readonly handleSearchTextChange = (newValue: string) => {
        this.props.setFilter({ ...(this.props.filter), searchText: newValue });
    }

    private readonly handleExpandClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newExpanded = !this.state.expanded;
        this.setState({ expanded: newExpanded });
    }

    private readonly handleCreatedAfterChange = (newValue?: Date) => {
        const { filter, setFilter } = this.props;
        const newFilter = { ...filter, createdAfter: newValue };
        setFilter(newFilter);
    }

    private readonly handleCreatedBeforeChange = (newValue?: Date) => {
        const { filter, setFilter } = this.props;
        const newFilter = { ...filter, createdBefore: newValue };
        setFilter(newFilter);
    }
}


export default UserFilterEditor;
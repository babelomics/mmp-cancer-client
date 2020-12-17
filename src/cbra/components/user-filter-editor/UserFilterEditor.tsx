import React from 'react';
import { Box, Collapse, Grid, IconButton, Paper, TextField, Tooltip } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import UserFilter from '../../../cbra/models/UserFilter';
import Searchbar from '../Searchbar';
import UserTypeSelector from './UserTypeSelector';
import DateField from '../DateField';


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
        const { filter, setFilter } = this.props;
        const searchText = filter.searchText || "";

        const complexFilter = undefined !== filter.createdAfter
            || undefined !== filter.createdBefore
            || undefined !== filter.lastAccessAfter
            || undefined !== filter.lastAccessBefore
            || undefined !== filter.userType;
        const expanded = !!this.state.expanded || complexFilter;

        return (
            <Box margin={2}>
                <Paper elevation={1}>
                    <Box display="flex" flexDirection="column" padding={2}>
                        <Box display="flex" flexDirection="row" padding={2}>
                            <Box flexGrow={1}>
                                <Searchbar variant="outlined" margin="dense" fullWidth value={searchText} onChange={this.handleSearchTextChange} />
                            </Box>
                            <Tooltip title={expanded ? "Show advanced filter" : "Hide advanced filter"}>
                                <IconButton onClick={this.handleExpandClick} disabled={complexFilter}>
                                    {!!expanded && <ExpandLessIcon />}
                                    {!expanded && <ExpandMoreIcon />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Collapse in={!!expanded}>
                            <Box padding={2}>
                                <Grid container justify="space-between" alignItems="center" spacing={1}>
                                    <Grid item xs={12} sm={4}>
                                        <UserTypeSelector filter={filter} setFilter={setFilter} />
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <DateField variant="outlined" margin="dense" value={filter.createdAfter} onChange={this.handleCreatedAfterChange} label="Created after" />
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <DateField variant="outlined" margin="dense" value={filter.createdBefore} onChange={this.handleCreatedBeforeChange} label="Created before" />
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <DateField variant="outlined" margin="dense" value={filter.lastAccessAfter} onChange={this.handleLastAccessAfterChange} label="Last access after" />
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <DateField variant="outlined" margin="dense" value={filter.lastAccessBefore} onChange={this.handleLastAccessBeforeChange} label="Last access before" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Collapse>
                    </Box>
                </Paper >
            </Box >
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

    private readonly handleLastAccessAfterChange = (newValue?: Date) => {
        const { filter, setFilter } = this.props;
        const newFilter = { ...filter, lastAccessAfter: newValue };
        setFilter(newFilter);
    }

    private readonly handleLastAccessBeforeChange = (newValue?: Date) => {
        const { filter, setFilter } = this.props;
        const newFilter = { ...filter, lastAccessBefore: newValue };
        setFilter(newFilter);
    }
}


export default UserFilterEditor;
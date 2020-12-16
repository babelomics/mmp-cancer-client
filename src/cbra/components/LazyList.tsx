import React from 'react';
import { Button, LinearProgress, TableRow } from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import ReplayIcon from '@material-ui/icons/Replay';


// TODO: make this configurable
const MAX_PAGES = 25;
const PAGE_SIZE = 25;


const defaultGetElemId = (elem: any) => elem.id as string;


interface LLPVIProps<T> {
    elems: T[];
    getElemId: (elem: T) => string;
    ChildElem: React.ElementType;
}


class LazyListPageView<T> extends React.PureComponent<LLPVIProps<T>> {
    render() {
        const { elems, ChildElem } = this.props;
        const getId = this.props.getElemId || defaultGetElemId;
        return (
            elems.map(elem => <ChildElem key={getId(elem)} item={elem} />)
        );
    }
}


enum Status {
    NORMAL,
    FETCHING_BEGIN,
    FETCHING_END,
    ERROR
}


interface IProps<T> {
    token: any;
    fetchPage: (pageSize: number, page: number, abortSignal: AbortSignal) => Promise<T[]>;
    ChildElem: React.ElementType;
    ChildWrapper: React.ElementType;
    getElemId?: (elem: T) => string;
}


interface IState<T> {
    status: Status;
    pages: T[][];
    firstPage: number;
}


class LazyList<T> extends React.PureComponent<IProps<T>, IState<T>> {

    private abortController = new AbortController();

    state = {
        status: Status.NORMAL,
        pages: [] as T[][],
        firstPage: 0
    };

    componentDidUpdate(prevProps: IProps<T>) {
        const { token } = this.props;
        const { token: prevToken } = prevProps;
        if (token !== prevToken) {
            this.reset();
        }
    }

    render() {
        const { status } = this.state;
        if (Status.ERROR === status) {
            return this.renderError();
        } else {
            return this.renderTable();
        }
    }

    private readonly renderTable = () => {
        const { status, pages, firstPage } = this.state;
        const { ChildElem, ChildWrapper } = this.props;
        const getElemId = this.props.getElemId || defaultGetElemId;
        const lastPage = firstPage + pages.length;
        const isStartProbeVisible = 0 < firstPage && 0 < pages.length;
        const isEndProbeVisible = 0 === pages.length || PAGE_SIZE === pages[pages.length - 1].length;
        return (
            <>
                { isStartProbeVisible && <ChildWrapper><LinearProgress /></ChildWrapper>}
                { Status.NORMAL === status && isStartProbeVisible && <Waypoint key={firstPage} onEnter={this.handleStartProbeEnter}><TableRow /></Waypoint>}
                {
                    pages.map((page, idx) => <LazyListPageView<T> key={idx + firstPage} elems={page} ChildElem={ChildElem} getElemId={getElemId} />)
                }
                { Status.NORMAL === status && isEndProbeVisible && <Waypoint key={lastPage} onEnter={this.handleEndProbeEnter}><TableRow /></Waypoint>}
                { isEndProbeVisible && <ChildWrapper><LinearProgress /></ChildWrapper>}
            </>
        );
    };

    private readonly renderError = () => {
        const { ChildWrapper } = this.props;
        return (
            <ChildWrapper>
                Cannot communicate with server...
                <Button variant="contained" onClick={this.handleRetryClick}>
                    <ReplayIcon />
                    Retry
                </Button>
            </ChildWrapper>
        );
    }

    private readonly handleStartProbeEnter = async () => {
        const { pages, firstPage } = this.state;
        if (0 === firstPage) {
            return;
        }
        const newFirstPage = firstPage - 1;
        this.setState({ status: Status.FETCHING_BEGIN });
        try {
            const newPage = await this.readPage(newFirstPage);
            const newPages = [newPage, ...pages];
            if (MAX_PAGES < newPages.length) {
                newPages.splice(newPages.length - 1, 1);
            }
            this.setState({ status: Status.NORMAL, pages: newPages, firstPage: newFirstPage });
        } catch (error) {
            if ("AbortError" !== error.name) {
                this.setState({ status: Status.ERROR, pages: [], firstPage: 0 })
            }
        }
    }

    private readonly handleEndProbeEnter = async () => {
        const { pages, firstPage } = this.state;
        if (0 < pages.length && PAGE_SIZE > pages[pages.length - 1].length) {
            return;
        }
        const pageToFetch = firstPage + pages.length;
        this.setState({ status: Status.FETCHING_END });
        try {
            const newPage = await this.readPage(pageToFetch);
            const newPages = [...pages, newPage];
            const newFirstPage = MAX_PAGES === pages.length ? firstPage + 1 : firstPage;
            if (MAX_PAGES === pages.length) {
                newPages.splice(0, 1);
            }
            this.setState({ status: Status.NORMAL, pages: newPages, firstPage: newFirstPage });
        } catch (error) {
            if ("AbortError" !== error.name) {
                this.setState({ status: Status.ERROR, pages: [], firstPage: 0 })
            }
        }

    }

    private readonly readPage = async (pageId: number) => {
        const { fetchPage } = this.props;
        this.abortController.abort();
        this.abortController = new AbortController();
        const page = await fetchPage(PAGE_SIZE, pageId, this.abortController.signal);
        return page;
    }

    private readonly handleRetryClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.reset();
    }

    private readonly reset = () => {
        this.setState({ status: Status.NORMAL, pages: [], firstPage: 0 });
    }
}


export default LazyList;
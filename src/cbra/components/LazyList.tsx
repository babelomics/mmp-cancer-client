import { TableRow } from '@material-ui/core';
import React from 'react';
import { Waypoint } from 'react-waypoint';


const PAGE_SIZE = 25;


interface LLElemType {
    // id: any;
    identifier: any;
}


interface LLPage<T> {
    id: number;
    elems: T[];
}


interface LLPVIProps<T> {
    page: LLPage<T>;
    ChildElem: React.ElementType;
}


class LazyListPageView<T extends LLElemType> extends React.PureComponent<LLPVIProps<T>> {

    render() {
        const { page, ChildElem } = this.props;
        const elems = page.elems || [] as T[];
        return (
            elems.map(elem => <ChildElem key={elem.identifier} item={elem} />)
        );
    }
}


enum Status {
    NORMAL,
    FETCHING_BEGIN,
    FETCHING_END,
    DONE
}


interface IProps<T> {
    token: any;
    fetchPage: (pageSize: number, page: number, abortSignal: AbortSignal) => Promise<T[]>;
    ChildElem: React.ElementType;
    // children: React.ReactNode;
}


interface IState<T> {
    status: Status;
    pages: LLPage<T>[];
}


class LazyList<T extends LLElemType> extends React.PureComponent<IProps<T>, IState<T>> {

    private abortController = new AbortController();

    state = {
        status: Status.NORMAL,
        pages: [] as LLPage<T>[],
    };

    componentDidUpdate(prevProps: IProps<T>) {
        const { token } = this.props;
        const { token: prevToken } = prevProps;
        if (token !== prevToken) {
            this.setState({ status: Status.NORMAL, pages: [] });
        }
    }

    render() {
        const { status, pages } = this.state;
        const { ChildElem } = this.props;

        const isStartProbeVisible = Status.NORMAL === status && 0 < pages.length && 0 !== pages[0].id;
        const isEndProbeVisible = Status.NORMAL === status && (0 === pages.length || PAGE_SIZE === pages[pages.length - 1].elems.length);

        return (
            <>
                { <TableRow>Yahooooo!</TableRow>}
                { isStartProbeVisible && <Waypoint onEnter={this.handleStartVisible}><TableRow /></Waypoint>}
                {
                    pages.map(page => <LazyListPageView<T> page={page} ChildElem={ChildElem} />)
                }
                { isEndProbeVisible && <Waypoint onEnter={this.handleEndVisible}><TableRow /></Waypoint>}
                { <TableRow>Yahooooo!</TableRow>}
            </>
        );
    }

    private readonly handleStartVisible = async () => {
        const { pages } = this.state;
        const { fetchPage } = this.props;
        if (0 === pages.length || 0 === pages[0].id) {
            return;
        }
        const pageToFetch = pages[0].id - 1;
        this.setState({ status: Status.FETCHING_BEGIN });
        try {
            this.abortController.abort();
            this.abortController = new AbortController();
            const newElems = await fetchPage(PAGE_SIZE, pageToFetch, this.abortController.signal);
            const newPage = { id: pageToFetch, elems: newElems } as LLPage<T>;
            const newPages = [newPage, ...pages];
            this.setState({ status: Status.NORMAL, pages: newPages });
        } catch (error) {
            if ("AbortError" !== error.name) {
                alert("Failure!");
            }
        }
    }


    private readonly handleEndVisible = async () => {
        const { pages } = this.state;
        const { fetchPage } = this.props;
        if (0 < pages.length && PAGE_SIZE === pages[pages.length - 1].elems.length) {
            return;
        }
        const pageToFetch = 0 === pages.length ? 0 : pages[pages.length - 1].id + 1;
        this.setState({ status: Status.FETCHING_END });
        try {
            this.abortController.abort();
            this.abortController = new AbortController();
            const newElems = await fetchPage(PAGE_SIZE, pageToFetch, this.abortController.signal);
            const newPage = { id: pageToFetch, elems: newElems } as LLPage<T>;
            const newPages = [...pages, newPage];
            this.setState({ status: Status.NORMAL, pages: newPages });
        } catch (error) {
            if ("AbortError" !== error.name) {
                // TODO: error state
                alert("Failure!");
            }
        }

    }
}


export default LazyList;
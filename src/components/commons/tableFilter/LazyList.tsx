import React from 'react';
import { Button, LinearProgress, TableRow } from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import ReplayIcon from '@material-ui/icons/Replay';
import _ from 'lodash';

// TODO: make this configurable
const MAX_PAGES = 25;
const PAGE_SIZE = 25;

const defaultGetElemId = (elem: any) => elem.id as string;

interface LLPVIProps<T> {
  elems: T[];
  getElemId: (elem: T) => string;
  ChildElem: React.ElementType;
  rowClick?: (data: T) => void;
  exclude?: any;
  selectedRows?: any[];
  setSelectedRows?: (selected: any[]) => void;
  selectAll?: boolean;
  onDelete?: (data: T) => void;
  setFilter?: (newToken: any) => void;
}

class LazyListPageView<T> extends React.PureComponent<LLPVIProps<T>> {
  render() {
    const { elems, ChildElem, rowClick, exclude, setSelectedRows, selectedRows, selectAll, onDelete, setFilter } = this.props;
    const getId = this.props.getElemId || defaultGetElemId;
    return elems.map((elem: any) => (
      <>
        {(!exclude || !exclude.exclude.includes(elem[exclude.field])) && (
          <ChildElem
            key={getId(elem)}
            item={elem}
            rowClick={rowClick}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            selectAll={selectAll}
            onDelete={() => (onDelete ? onDelete(elem) : undefined)}
            setFilter={setFilter}
          />
        )}
      </>
    ));
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
  fetchPage: (pageSize: number, page: number) => Promise<T[]>;
  ChildElem: React.ElementType;
  ChildWrapper: React.ElementType;
  getElemId?: (elem: T) => string;
  rowClick?: (data: T) => void;
  exclude?: any;
  selectedRows?: any[];
  setSelectedRows?: (selected: any[]) => void;
  selectAll?: boolean;
  onDelete?: (data: T) => void;
  isReduxOnly?: boolean;
  setFilter?: (newToken: any) => void;
  scrollModal?: string;
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

  async componentDidUpdate(prevProps: IProps<T>, prevState: IState<T>) {
    const { token } = this.props;
    const { token: prevToken } = prevProps;
    if (token !== prevToken) {
      this.reset();
    }

    if (this.props.isReduxOnly) {
      const currentData = await this.props.fetchPage(PAGE_SIZE, this.state.firstPage + this.state.pages.length);
      const prevData = await prevProps.fetchPage(PAGE_SIZE, this.state.firstPage + this.state.pages.length);

      if (!_.isEqual(currentData, prevData)) {
        this.setState({ pages: [currentData] });
      }
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
    const { ChildElem, ChildWrapper, rowClick, exclude, selectedRows, setSelectedRows, selectAll, onDelete, setFilter, scrollModal } = this.props;
    const getElemId = this.props.getElemId || defaultGetElemId;
    const lastPage = firstPage + pages.length;
    const isStartProbeVisible = 0 < firstPage && 0 < pages.length;
    const isEndProbeVisible = 0 === pages.length || PAGE_SIZE === pages[pages.length - 1].length;
    return (
      <>
        {isStartProbeVisible && (
          <ChildWrapper>
            <LinearProgress />
          </ChildWrapper>
        )}
        {Status.NORMAL === status && isStartProbeVisible && (
          <Waypoint key={firstPage} onEnter={this.handleStartProbeEnter} scrollableAncestor={scrollModal ? document.getElementById(scrollModal) : window}>
            <TableRow />
          </Waypoint>
        )}
        {pages.map((page, idx) => (
          <LazyListPageView<T>
            key={idx + firstPage}
            elems={page}
            ChildElem={ChildElem}
            getElemId={getElemId}
            rowClick={rowClick}
            exclude={exclude}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            selectAll={selectAll}
            onDelete={onDelete}
            setFilter={setFilter}
          />
        ))}
        {Status.NORMAL === status && isEndProbeVisible && (
          <Waypoint key={lastPage} onEnter={this.handleEndProbeEnter} scrollableAncestor={scrollModal ? document.getElementById(scrollModal) : window}>
            <TableRow />
          </Waypoint>
        )}
        {isEndProbeVisible && (
          <ChildWrapper>
            <LinearProgress />
          </ChildWrapper>
        )}
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
  };

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
      if ('AbortError' !== error.name) {
        this.setState({ status: Status.ERROR, pages: [], firstPage: 0 });
      }
    }
  };

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
      if ('AbortError' !== error.name) {
        this.setState({ status: Status.ERROR, pages: [], firstPage: 0 });
      }
    }
  };

  private readonly readPage = async (pageId: number) => {
    const { fetchPage } = this.props;
    this.abortController.abort();
    this.abortController = new AbortController();
    const page = await fetchPage(PAGE_SIZE, pageId);
    return page;
  };

  private readonly handleRetryClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.reset();
  };

  private readonly reset = () => {
    this.setState({ status: Status.NORMAL, pages: [], firstPage: 0 });
  };
}

export default LazyList;


import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADReportFilters as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADReportFilters
  extends React.Component<Props, State['Source']['FACAD-ReportFilters']>
{
  public readonly state: State['Source']['FACAD-ReportFilters'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-ReportFilters"]);
    });

    props.socket.Select('FACAD-ReportFilters');
    props.socket.GetInfo('FACAD-ReportFilters');
    props.socket.Subscribe('FACAD-ReportFilters');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-ReportFilters', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-ReportFilters', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-ReportFilters', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      ReportID: '',
      Comparator: '',
      ValueType: '',
      Field: '',
      Value: '',
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}


import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADReportFilters as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADReportFilters
  extends React.Component<Props, State['Source']['FACAD-Report-Filters']>
{
  public readonly state: State['Source']['FACAD-Report-Filters'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-Report-Filters"]);
    });

    props.socket.Select('FACAD-Report-Filters');
    props.socket.GetInfo('FACAD-Report-Filters');
    props.socket.Subscribe('FACAD-Report-Filters');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-Report-Filters', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-Report-Filters', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-Report-Filters', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      ReportID: 0,
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
      Title={"FACAD-Report-Filters"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}


import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADReports as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADReports
  extends React.Component<Props, State['Source']['FACAD-Reports']>
{
  public readonly state: State['Source']['FACAD-Reports'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-Reports"]);
    });

    props.socket.Select('FACAD-Reports');
    props.socket.GetInfo('FACAD-Reports');
    props.socket.Subscribe('FACAD-Reports');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-Reports', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-Reports', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-Reports', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      BuiltInCategory: 'INVALID',
      ReportType: 'Schedule',
      Name: '',
      PathName: '',
      Field1: 'Keynote',
      Field2: 'Level',
      Field3: 'Count'
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


import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADSchedules as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADSchedules
  extends React.Component<Props, State['Source']['FACAD-Schedules']>
{
  public readonly state: State['Source']['FACAD-Schedules'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-Schedules"]);
    });

    props.socket.Select('FACAD-Schedules');
    props.socket.GetInfo('FACAD-Schedules');
    props.socket.Subscribe('FACAD-Schedules');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-Schedules', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-Schedules', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-Schedules', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      BuiltInCategory: 'INVALID',
      Name: '',
      PathName: '',
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

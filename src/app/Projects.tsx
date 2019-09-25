
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, Projects as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class Projects
  extends React.Component<Props, State['Source']['Projects']>
{
  public readonly state: State['Source']['Projects'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['Projects']);
    });

    props.socket.Select('Projects');
    props.socket.GetInfo('Projects');
    props.socket.Subscribe('Projects');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('Projects', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('Projects', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('Projects', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Name: '',
      Description: '',
      Start: null,
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

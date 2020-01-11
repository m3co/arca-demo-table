
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUTasks as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUTasks
  extends React.Component<Props, State['Source']['APU-Tasks']>
{
  public readonly state: State['Source']['APU-Tasks'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-Tasks']);
    });

    props.socket.Select('APU-Tasks');
    props.socket.GetInfo('APU-Tasks');
    props.socket.Subscribe('APU-Tasks');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('APU-Tasks', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('APU-Tasks', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-Tasks', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Q: 0,
      Start: null,
      End: null,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-Tasks"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

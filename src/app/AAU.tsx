
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, AAU as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class AAU
  extends React.Component<Props, State['Source']['AAU']>
{
  public readonly state: State['Source']['AAU'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['AAU']);
    });

    props.socket.Select('AAU');
    props.socket.GetInfo('AAU');
    props.socket.Subscribe('AAU');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('AAU', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('AAU', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('AAU', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      Key: null,
      Parent: null,
      Expand: false,
      Description: '',
      Unit: '',
      P: null,
      Estimated: 0,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"AAU"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

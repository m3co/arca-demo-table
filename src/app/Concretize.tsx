
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, Concretize as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class Concretize
  extends React.Component<Props, State['Source']['Concretize']>
{
  public readonly state: State['Source']['Concretize'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['Concretize']);
    });

    props.socket.Select('Concretize');
    props.socket.GetInfo('Concretize');
    props.socket.Subscribe('Concretize');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('Concretize', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('Concretize', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('Concretize', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      Project: null,
      Concreted: false,
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
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

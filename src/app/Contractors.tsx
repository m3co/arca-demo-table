
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, Contractors as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class Contractors
  extends React.Component<Props, State['Source']['Contractors']>
{
  public readonly state: State['Source']['Contractors'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['Contractors']);
    });

    props.socket.Select('Contractors');
    props.socket.GetInfo('Contractors');
    props.socket.Subscribe('Contractors');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('Contractors', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('Contractors', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('Contractors', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Name: '',
      Information: '',
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"Contractors"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

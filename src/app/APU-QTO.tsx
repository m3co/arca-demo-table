
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUQTO as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUQTO
  extends React.Component<Props, State['Source']['APU-QTO']>
{
  public readonly state: State['Source']['APU-QTO'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-QTO']);
    });

    props.socket.Select('APU-QTO');
    props.socket.GetInfo('APU-QTO');
    props.socket.Subscribe('APU-QTO');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('APU-QTO', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('APU-QTO', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-QTO', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Withdrawn: false,
      Q: 0,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-QTO"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

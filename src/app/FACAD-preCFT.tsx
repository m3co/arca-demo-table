
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADpreCFT as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADpreCFT
  extends React.Component<Props, State['Source']['FACAD-preCFT']>
{
  public readonly state: State['Source']['FACAD-preCFT'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-preCFT"]);
    });

    props.socket.Select('FACAD-preCFT');
    props.socket.GetInfo('FACAD-preCFT');
    props.socket.Subscribe('FACAD-preCFT');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-preCFT', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-preCFT', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-preCFT', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Family: '',
      Type: '',
      PathName: '',
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"FACAD-preCFT"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

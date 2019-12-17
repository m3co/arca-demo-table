
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADpreCFTAAU as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADpreCFTAAU
  extends React.Component<Props, State['Source']['FACAD-preCFT-AAU']>
{
  public readonly state: State['Source']['FACAD-preCFT-AAU'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-preCFT-AAU"]);
    });

    props.socket.Select('FACAD-preCFT-AAU');
    props.socket.GetInfo('FACAD-preCFT-AAU');
    props.socket.Subscribe('FACAD-preCFT-AAU');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-preCFT-AAU', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-preCFT-AAU', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-preCFT-AAU', row);
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
      Title={"FACAD-preCFT-AAU"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

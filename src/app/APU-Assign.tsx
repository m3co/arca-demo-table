
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUAssign as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUAssign
  extends React.Component<Props, State['Source']['APU-Assign']>
{
  public readonly state: State['Source']['APU-Assign'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-Assign']);
    });

    props.socket.Select('APU-Assign');
    props.socket.GetInfo('APU-Assign');
    props.socket.Subscribe('APU-Assign');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('APU-Assign', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('APU-Assign', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-Assign', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      Project: null,
      Key: '',
      Constraint: '',
      Description: '',
      Unit: null,
      Status: null,
      Frozen: false,
      Estimated: null,
      P: 0,
      Q: 0,
      ID: null,
      ContractorID: null,
      Qres: 0,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-Assign"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

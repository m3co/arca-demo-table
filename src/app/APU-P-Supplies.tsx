
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUPSupplies as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUPSupplies
  extends React.Component<Props, State['Source']['APU-P-Supplies']>
{
  public readonly state: State['Source']['APU-P-Supplies'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-P-Supplies']);
    });

    props.socket.Select('APU-P-Supplies');
    props.socket.GetInfo('APU-P-Supplies');
    props.socket.Subscribe('APU-P-Supplies');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('APU-P-Supplies', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('APU-P-Supplies', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-P-Supplies', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      APUID: 0,
      SupplyID: 0,
      P: 0,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-P-Supplies"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}


import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUImportSupplies as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUImportSupplies
  extends React.Component<Props, State['Source']['APU-Import-Supplies']>
{
  public readonly state: State['Source']['APU-Import-Supplies'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-Import-Supplies']);
    });

    props.socket.Select('APU-Import-Supplies');
    props.socket.GetInfo('APU-Import-Supplies');
    props.socket.Subscribe('APU-Import-Supplies');
  }

  private onUpdate = (Row: Row): void => {
    const row = {...Row} as Model["Row"];
    if (row.APUID && row.P) {
      if (row.SupplyID) {
        row.Description = null;
        row.Unit = null;
        row.Type = null;
        row.Estimated = null;
      } else {
        row.SupplyID = null;
      }
      this.props.socket.Update('APU-Import-Supplies', row);
    }
  }

  private onInsert = (row: Row): string => {
    //return this.props.socket.Insert('APU-Import-Supplies', row);
    return '';
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-Import-Supplies', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      APUID: 0,
      SupplyID: 0,
      P: 0,
      Description: '',
      Unit: '',
      Type: '',
      Estimated: 0,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-Import-Supplies"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

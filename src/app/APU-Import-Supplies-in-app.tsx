
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUImportSuppliesInApp as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUImportSuppliesInApp
  extends React.Component<Props, State['Source']['APU-Import-Supplies-in-App']>
{
  public readonly state: State['Source']['APU-Import-Supplies-in-App'] = {
    Rows: [],
    Aggs: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-Import-Supplies-in-App']);
    });

    props.socket.Select('APU-Import-Supplies-in-App');
    props.socket.GetInfo('APU-Import-Supplies-in-App');
    props.socket.Subscribe('APU-Import-Supplies-in-App');
  }

  private onUpdate = (Row: Row): void => {
    const row = {...Row} as Model["Row"];
    if (row.APUID && row.P) {
      if (row.SupplyID) {
        row["MetaSupply-Description"] = null;
        row["MetaSupply-Unit"] = null;
        row.Type = null;
        row["MetaSupply-Estimated"] = null;
      }
      this.props.socket.Update('APU-Import-Supplies-in-App', row);
    }
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('APU-Import-Supplies-in-App', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-Import-Supplies-in-App', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      APUID: 0,
      "APU-ContractorID": 0,
      Key: '',
      Constraint: '',
      "APU-Description": '',
      "APU-Unit": '',
      "APU-P": 0,
      "APU-Estimated": 0,
      "APU-Price": null,
      SupplyID: null,
      OwnerID: null,
      P: null,
      "MetaSupply-Description": null,
      "MetaSupply-Unit": null,
      Type: null,
      "MetaSupply-Estimated": null,
      "MetaSupply-ContractorID": null,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-Import-Supplies-in-App"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

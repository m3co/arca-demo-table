
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUMetaSupplies as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUMetaSupplies
  extends React.Component<Props, State['Source']['APU-MetaSupplies']>
{
  public readonly state: State['Source']['APU-MetaSupplies'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-MetaSupplies']);
    });

    props.socket.Select('APU-MetaSupplies');
    props.socket.GetInfo('APU-MetaSupplies');
    props.socket.Subscribe('APU-MetaSupplies');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('APU-MetaSupplies', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('APU-MetaSupplies', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-MetaSupplies', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      ContractorID: 0,
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
      Title={"APU-MetaSupplies"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

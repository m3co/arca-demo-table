
import * as React from 'react';

import { Table } from 'arca-table/build/Table';

import { ARCASocket, State, Row, FACADCFT as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADCFT
  extends React.Component<Props, State['Source']['FACAD-CFT']>
{
  public readonly state: State['Source']['FACAD-CFT'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['FACAD-CFT']);
    });

    props.socket.Select('FACAD-CFT');
    props.socket.GetInfo('FACAD-CFT');
    props.socket.Subscribe('FACAD-CFT');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-CFT', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-CFT', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-CFT', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Project: 0,
      Category: '',
      FamilyType: '',
      Key: '',
      BuiltInCategory: 'INVALID',
      ReportType: '',
      KeynoteField: '',
      ConstraintField: '',
      QuantityField: '',
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

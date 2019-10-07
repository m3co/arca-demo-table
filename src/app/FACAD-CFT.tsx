
import * as React from 'react';

import { Table } from 'arca-table';

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

  private onUpdate = (Row: Row): void => {
    const row = {...Row} as Model["Row"];
    if (row.Family && row.Type && row.Key) {
      if (!row.Project) row.Project = null;
      if (row.KeynoteField === '') row.KeynoteField = null;
      if (row.ConstraintField === '') row.ConstraintField = null;
      if (row.QuantityField === '') row.QuantityField = null;
      this.props.socket.Update('FACAD-CFT', row);
    }
  }

  private onInsert = (Row: Row): string => {
    const row = {...Row} as Model["Row"];
    if (row.Family && row.Type && row.Key) {
      if (!row.Project) row.Project = null;
      if (row.KeynoteField === '') row.KeynoteField = null;
      if (row.ConstraintField === '') row.ConstraintField = null;
      if (row.QuantityField === '') row.QuantityField = null;

      return this.props.socket.Insert('FACAD-CFT', row);
    }
    return '';
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-CFT', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Project: null,
      Family: '',
      Type: '',
      Key: '',
      BuiltInCategory: 'INVALID',
      ReportType: 'Schedule',
      KeynoteField: 'Keynote',
      ConstraintField: null,
      QuantityField: null,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"FACAD-CFT"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

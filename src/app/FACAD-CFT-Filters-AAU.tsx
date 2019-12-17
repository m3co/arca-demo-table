
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADCFTFiltersAAU as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADCFTFiltersAAU
  extends React.Component<Props, State['Source']['FACAD-CFT-Filters-AAU']>
{
  public readonly state: State['Source']['FACAD-CFT-Filters-AAU'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-CFT-Filters-AAU"]);
    });

    props.socket.Select('FACAD-CFT-Filters-AAU');
    props.socket.GetInfo('FACAD-CFT-Filters-AAU');
    props.socket.Subscribe('FACAD-CFT-Filters-AAU');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-CFT-Filters-AAU', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-CFT-Filters-AAU', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-CFT-Filters-AAU', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      CFTID: 0,
      Comparator: '',
      ValueType: '',
      Field: '',
      Value: '',
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"FACAD-CFT-Filters-AAU"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}

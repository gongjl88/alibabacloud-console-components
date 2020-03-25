import React, { useRef, useEffect } from 'react'
import { Button, Badge, Icon, Tab } from '@alicloud/console-components'
import { TableProps } from '@alicloud/console-components/types/table'
import styled from 'styled-components'
import Table, { ITableProps } from '@alicloud/console-components-table'

const TabItem = Tab.Item

const dataSource = (() =>
  new Array(30).fill(null).map((item, i) => ({
    id: i + 1,
    name: `Wind Table Item - ${i}`,
    repo: `https://www.aliyun.com/repo?id=${i}`,
  })))()

const columns = [
  {
    dataIndex: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    dataIndex: 'repo',
    title: 'Repository',
  },
]

const rowSelection: TableProps['rowSelection'] & {
  UNSTABLE_defaultSelectedRowKeys?: any[]
} = {
  getProps: (item: any, i: number) => ({ disabled: i % 2 === 0 }),
  UNSTABLE_defaultSelectedRowKeys: [1, 2],
}

const primaryOperation = (ownerProps: { creatable?: boolean }) => (
  tableProps: ITableProps
) => {
  return (
    <>
      <Button type="primary" disabled={!ownerProps.creatable}>
        Create
      </Button>
      <Button>Refresh</Button>
    </>
  )
}

const secondaryOperation = () => () => (
  <>
    <Button>
      <Icon type="cog" />
    </Button>
  </>
)

const App: React.FC<{
  creatable?: boolean
}> = props => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <SContainer ref={containerRef}>
      <SWrapper ref={targetRef}>
        <Table
          exact
          affixActionBar
          fixedBarZIndex={1000}
          affixBarOverlayProps={{
            target: () => targetRef.current,
            container: () => containerRef.current,
          }}
          afterFixedBarIntersectChanged={(
            alignType: 'top' | 'bottom',
            isIntersecting: boolean
          ) => {
            console.log(
              'alignType:',
              alignType,
              'isIntersecting:',
              isIntersecting
            )
          }}
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
          primaryKey="id"
          operation={{
            primary: primaryOperation(props),
            secondary: secondaryOperation(),
          }}
          search={{
            filter: [
              {
                value: 'InstanceName',
                label: 'By Instance Name',
              },
            ],
          }}
          pagination={{
            current: 1,
            total: 40,
            pageSize: 10,
          }}
          selection={({ selectedRowKeys }: { selectedRowKeys: any[] }) => {
            return (
              <>
                <Badge count={selectedRowKeys.length}>
                  <Button disabled={selectedRowKeys.length === 0}>
                    Delete
                  </Button>
                </Badge>
              </>
            )
          }}
        />
      </SWrapper>
    </SContainer>
  )
}

const SContainer = styled.div`
  position: relative;
  width: 100%;
`

const SWrapper = styled.div`
  height: calc(100vh);
  padding: 0 30px;
  position: relative;
  overflow-y: auto;
  width: 100%;
`

export default App
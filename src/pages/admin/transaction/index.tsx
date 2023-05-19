import Layout from '@/components/Admin/Layout/Layout'
import Button from '@/components/Button/Button'
import ViewAllTransaction from '@/components/Tables/ViewAllTransaction/ViewAllTransaction'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <div>
      <Layout>
        <>
        <div>
            <Link href="/admin/transaction"><Button btype="transactionPageButton" disable={false} type='' onClick={()=> {}} >View all Transaction</Button></Link>
            <Link href="/admin/transaction/transactionanalysis"><Button btype="transactionPageButton" type='' disable={false} onClick={()=>{}} >Transaction Analysis</Button></Link>
            <Link href="/admin/transaction/failedtransaction"><Button btype="transactionPageButton" type='' disable={false} onClick={()=>{}} >Failed Transaction</Button></Link>
        </div>
            <ViewAllTransaction/>
        </>
      </Layout>
    </div>
  )
}

export default index

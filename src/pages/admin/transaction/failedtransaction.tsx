import FailedTransaction from '@/components/Tables/FailedTransaction/FailedTransaction'
import React from 'react'
import Layout from '@/components/Admin/Layout/Layout'
import Button from '@/components/Button/Button'
import Link from 'next/link'
const failedtransaction = () => {
  return (
    <div>
      <Layout>
        <>
        <div>
            <Link href="/admin/transaction"><Button btype="transactionPageButton" type='' disable={false} onClick={()=> {}} >View all Transaction</Button></Link>
            <Link href="/admin/transaction/transactionanalysis"><Button btype="transactionPageButton" type='' disable={false} onClick={()=> {}} >Transaction Analysis</Button></Link>
            <Link href="/admin/transaction/failedtransaction"><Button btype="transactionPageButton"  type='' disable={false} onClick={()=> {}} >Failed Transaction</Button></Link>
        
        </div>
            <FailedTransaction/>
        </>
      </Layout>
    </div>
  )
}

export default failedtransaction

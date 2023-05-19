import React from 'react'
import Layout from '@/components/Admin/Layout/Layout'
import AdminRollAssigner from '@/components/Cards/AdminRollAssigner/AdminRollAssigner'
const transactions = () => {
  return (
    <div>
      <Layout><>
                    <div style={{display:"grid",gridTemplateColumns:"auto auto auto",marginTop:"20px",margin:"30px"}}>
        <AdminRollAssigner img='/admin/ARA.png' name='Gustavo Vaccaro1' description='Lorenddd Ipsum Loren Ipsum Loren Ipsum Loren Ipsum' />
        <AdminRollAssigner img='/maleChar.svg' name='Gustavo Vaccaro2' description='Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum' />
        <AdminRollAssigner img='/anya.svg' name='Gustavo Vaccaro3' description='Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum' />
        <AdminRollAssigner img='/maleChar.svg' name='Gustavo Vaccaro2' description='Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum' />
        <AdminRollAssigner img='/anya.svg' name='Gustavo Vaccaro3' description='Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum' />
        <AdminRollAssigner img='/admin/ARA.png' name='Gustavo Vaccaro1' description='Lorenddd Ipsum Loren Ipsum Loren Ipsum Loren Ipsum' />
      
                    </div>
                    </></Layout>
    </div>
  )
}

export default transactions

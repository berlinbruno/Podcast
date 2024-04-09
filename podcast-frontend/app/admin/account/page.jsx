import ChangePasswordForm from '@/components/form/ChangePasswordForm'
import DeleteAccountForm from '@/components/form/DeleteAccountForm'
import React from 'react'

export default async function page() {
  return (
    <section className=' container mx-auto'>
        <ChangePasswordForm/>
        <DeleteAccountForm/>
    </section>
  )
}

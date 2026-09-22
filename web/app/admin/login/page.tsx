import { LoginForm } from '@/components/admin/LoginForm'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>
}) {
  const { e } = await searchParams
  return (
    <main className="adm-login">
      <h1>KEV · Panel</h1>
      {e === 'forbidden' && (
        <p className="adm-error" role="alert">
          Esta cuenta no tiene acceso al panel de KEV.
        </p>
      )}
      <LoginForm />
    </main>
  )
}

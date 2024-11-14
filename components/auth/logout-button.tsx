"use client"

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = () => {
    // todo: call backend for logout
  }

  return (
    <span
      onClick={onClick}
    >
      {children}
    </span>
  )
}

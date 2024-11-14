export const Section = ({
  isWhiteBackground,
  children
}: {
  isWhiteBackground: boolean,
  children: React.ReactNode
}) => {
  return (
    <div className={`w-full p-4 md:pr-8 md:pl-8 pt-20 pb-20 ${isWhiteBackground ? 'bg-slate-100' : 'bg-indigo-500 text-white'}`}>
      {children}
    </div>
  )
}
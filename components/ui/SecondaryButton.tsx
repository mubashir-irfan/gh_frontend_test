type Props = {
  label: string;
  onClick: () => void
  Icon?: React.ReactNode;
}

const SecondaryButton = ({ label, Icon, onClick }: Props) => {
  return (
    <button type="button" onClick={onClick} className="flex gap-2 items-center text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:ring-red-400 font-medium rounded-lg text-sm px-4 py-1.5">
      {Icon}
      {label}
    </button>)
}

export default SecondaryButton
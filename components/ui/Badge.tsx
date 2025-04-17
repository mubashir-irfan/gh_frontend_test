type Props = {
  label: string;
  classNames: string;
}
const Badge = ({ label, classNames }: Props) => {
  return <p className={`p-1 text-xs rounded-lg text-center font-medium ${classNames}`}>{label}</p>
}

export default Badge;
interface OptionSelectProps {
  v: number;
}
export const OptionSelect = ({ v, ...rest }: OptionSelectProps) => (
  <option style={{ background: '#2D3748' }} value={v}>{String(v)}</option>
);
import { Lower, Plus, Minus } from '../assets/SharedStyles/LowerButtonStyle';

export default function LowerButton({ iconType, buttonText }) {
  return (
    <Lower type="button">
      {iconType === 'plus' ? <Plus /> : <Minus />}
      <p>{buttonText}</p>
    </Lower>
  );
}

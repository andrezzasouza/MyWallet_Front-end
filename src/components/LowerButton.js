import { Lower, Plus, Minus } from '../assets/SharedStyles/LowerButtonStyle';

export default function LowerButton({ iconType, buttonText }) {
  return (
    <Lower>
      {iconType === 'plus' ? <Plus /> : <Minus />}
      <p>{buttonText}</p>
    </Lower>
  );
}

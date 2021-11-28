import Loader from 'react-loader-spinner';
import { LongButton } from '../assets/SharedStyles/LongButton';

export default function LongerButton({ type, margin, enabled, text }) {
  return (
    <LongButton type={type} margin={margin} clickable={enabled}>
      {enabled ? (
        text
      ) : (
        <Loader
          type="ThreeDots"
          color="white"
          height={50}
          width={100}
          timeout={3000}
        />
      )}
    </LongButton>
  );
}

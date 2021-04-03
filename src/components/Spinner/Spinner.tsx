import './Spinner.scss';

interface ISpinnerProps {
  size?: string;
}

export const Spinner = ({ size = '30px' }: ISpinnerProps) => (
  <div
    className='spinner'
    style={{
      width: size,
      height: size,
    }}
  ></div>
);

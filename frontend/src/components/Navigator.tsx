import {useLocation, useNavigate} from 'react-router-dom'
import {featherChevronLeft} from "../utils/svgs";


type NavigatorProps = {
  text: string;
}

const Navigator = (props: NavigatorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { text } = props;

  const onBack = () => {
    navigate('/');
  }

  return (
    <div className="border py-2 flex items-center mb-4 rounded-lg">
      {location.pathname !== '/' && (
        <button className="absolute bg-transparent hover:border-0 border-0 p-2" onClick={onBack}>
          <span
            className="hover:text-gray-400 text-gray-900"
            dangerouslySetInnerHTML={{ __html: featherChevronLeft }}
          />
        </button>
      )}

      <div className="font-bold text-lg text-center w-full">{text}</div>
    </div>
  )
}


export default Navigator;
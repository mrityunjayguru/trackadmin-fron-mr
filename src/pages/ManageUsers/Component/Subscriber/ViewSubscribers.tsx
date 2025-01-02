import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ViewUser from './ViewUser';
// import Edituser from './Edituser';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// interface Subscriber {
//   Name: string;
//   subscribeType: string;
// }

function ViewSubscribers() {
  const navigate = useNavigate();
  // const [subscriber, setSubscriber] = useState<Subscriber[]>([]);

  const data = useSelector((state: any) => state.subscriber.singleSubscriber);
  const { userId } = useParams<{ userId: string }>();
  useEffect(() => {
    // console.log(subscriber)
    // if (data) {
    //   setSubscriber(data);
    // }
    if (data?._id !== userId) {
      navigate(`/`);
    }
  }, [data, navigate, userId]);
  return (
    <>
      <div>
       
        <ViewUser />
        {/* <Edituser/> */}
      </div>
    </>
  );
}

export default ViewSubscribers;

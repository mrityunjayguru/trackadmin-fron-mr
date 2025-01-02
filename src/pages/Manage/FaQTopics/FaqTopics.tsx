import ManageFaq from './Component/ManageFaqTopics'
import FaQHeaders from './Component/FaQHeaders'
import { useSelector } from 'react-redux';
function FaqTopics() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  return (
    <div>
      <FaQHeaders/>
      {/* {loginUser.permissions.  FAQTopics?.View==true?( */}
         <ManageFaq/>

        {/* //  ):(null)} */}
  
    </div>
  )
}

export default FaqTopics

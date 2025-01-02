import ManageAbout from './component/ManageAbout'
import Breadcrumb from '../../../common/Breadcrumb'
function About() {
  return (
    <div >
        <div className=''><Breadcrumb/></div>
      <div className="flex justify-between gap-1 w-full my-4 text-normal font-semibold text-white">
      <div className=" rounded-2xl flex justify-between gap-1 mt-5 w-full p-4 text-xl font-semibold text-white bg-[#000]">
          <h1 className="text-[#D9E821]">About Us Content Management</h1>
        </div>
      </div>
      <div className='bg-[#fff]'>
      <ManageAbout/>
      </div>
     
    </div>
  )
}

export default About

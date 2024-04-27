import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';


export default function Certificate(){

    const[formData,setFormData]= useState({
        certificateName:"",
        certificateSelected:"",
        certificateDuration:"",
        certificateAdd:""
    })
    const [AllData,SetAllData]=useState([])
    const [isAddUserPopupOpen, setAddUserPopupOpen] = useState(false);
    const [viewCertificate, setViewCertificate] = useState(null);
    const [isviewCertificateModelOpen, setViewCertificateModelOpen] = useState(false);
    const [isUpdateCertificatePopupOpen, setUpdateCertificaterPopupOpen] = useState(false);
    // const[UpdateSaveCertificate,setUpdateSaveCertificate]=useState([]);
    const [selectedCertificate, setSelectedCertificate] = useState(null);


    useEffect(()=>{
        fetchAllData();
    },[])

    const fetchAllData = async () => {
        try {
          const response = await fetch("http://localhost:8000/certificate");
          if (response.ok) {
            const data = await response.json();
            SetAllData(data);
          } else {
            console.error("Error fetching products:", response.status);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };


    const PostMethod=async ()=>{
        

        try {
            const response=await fetch("http://localhost:8000/certificate",{
                method:"POST",
                headers:{"Content-Type":"Application/Json"},
                body:JSON.stringify(formData),

            });

            if (response.ok){
                const responseData=await response.json();
                setAddUserPopupOpen(false);
                fetchAllData();

                console.log(responseData)
                Swal.fire({
                    icon: 'success',
                    title: 'User Added Successfully!',
                    showConfirmButton: false,
                    timer: 500,
                  });
            }else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                });
              }
        } catch (error) {
            console.error("Error in postMethod:", error);
        }
    } 
    
    const openViewPopup = (user) => {
        setViewCertificate(user);
        setViewCertificateModelOpen(true);
      };

      const openUpdatePopup =(user)=>{
        setUpdateCertificaterPopupOpen(true);
        setSelectedCertificate(user);
        setFormData({
            certificateName:user.certificateName,
            certificateSelected:user.certificateSelected,
            certificateDuration:user.certificateDuration,
            certificateAdd:user.certificateAdd,
        })
      };

    const UpdateMethod=async ()=>{

        try {
            // const updateData={
            //     certificateName:formData.certificateName,
            //     certificateSelected:formData.certificateSelected,
            //     certificateDuration:formData.certificateDuration,
            //     certificateAdd:formData.certificateAdd,
            // };

            // const updateCertificate=UpdateSaveCertificate.map(user =>
            //     user._id ===userId ? {...user, ...updateData}:user);

            //     setUpdateSaveCertificate(updateCertificate);

                const response=await fetch(`http://localhost:8000/certificate/${selectedCertificate._id}`,{
                    method:"PUT",
                    headers:{"Content-Type":"Application/json"},
                    body:JSON.stringify(formData),


                });
                if (response.ok){
                        console.log(formData)
                        setUpdateCertificaterPopupOpen(false);
                        fetchAllData();
                        Swal.fire({
                            icon: 'success',
                            title: 'User Updated Successfully!',
                            showConfirmButton: false,
                            timer: 500,
                          });
                }
                else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                    });
                  }
        } catch (error) {
            console.error("Error updating file:", error);
        }

      }

      const DeleteMethod=async(userId)=>{
             try {
                const response = await fetch(`http://localhost:8000/certificate/${userId}`, {
          method: "DELETE",
        });
        if (response.ok){
            const DeleteCertificate=AllData.filter(user =>user._id !==userId);
            SetAllData(DeleteCertificate)

            Swal.fire({
                icon: 'success',
                title: 'User Deleted Successfully!',
                showConfirmButton: false,
                timer: 500,
              });
              fetchAllData();
            
        } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
             } catch (error) {
                console.error("Error deleting user:", error);
             }
      }
  



    return(<>
     {isAddUserPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Add Certificate</h2>

        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600" >Certificate Name:</label>
          <input
           className="w-full px-3 py-2 border rounded"
            type="text"
            // value={formData.certificateName}
            onChange={(e) => setFormData({...formData, certificateName: e.target.value})}
          />

        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Certificate Type:</label>
          <label>
            <input
              type="radio"
            //   value="Online"
              checked={formData.certificateSelected === 'Online'}
              onChange={() => setFormData({ ...formData, certificateSelected: 'Online' })}
            />
            Online
          </label>
          <label>
            <input
              type="radio"
            //   value="Offline"
              checked={formData.certificateSelected === 'Offline'}
              onChange={() => setFormData({ ...formData, certificateSelected: 'Offline' })}
            />
            Offline
          </label>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Certificate Duration:</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            // value={formData.certificateDuration}
            onChange={(e) => setFormData({...formData,certificateDuration:e.target.value})}
          />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Certificate Address:</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            // value={formData.certificateAdd}
            onChange={(e) => setFormData({...formData,certificateAdd:e.target.value})}
          />
        </div>
        <div className="flex justify-between">
        <button  className="bg-violet-500 hover:bg-violet-500 text-white py-2 px-4 rounded mr-2" onClick={PostMethod}>Add</button>
        <button  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"  onClick={() => setAddUserPopupOpen(false)}>Cancle</button>
        </div>
            </div>
            </div>
       )} 

       {isviewCertificateModelOpen && viewCertificate && (
                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                         <div className="w-2/4 bg-white p-6 rounded shadow-md relative">
                           <h2 className="text-2xl font-semibold mb-4">Sector Details</h2>
                           <div className="mb-4">
                             <p className="text-sm font-semibold mb-2">Sector : {viewCertificate.certificateName}</p>
                           </div>
                           <div className="mb-4">
                             <p className="text-sm font-semibold mb-2"> Profession Title: {viewCertificate.certificateSelected}</p>
                           </div>
                           <div className="mb-4">
                             <p className="text-sm font-semibold mb-2">Profession Description: {viewCertificate.certificateDuration}</p>
                           </div>
                          
                           <div className="mb-4">
                             <p className="text-sm font-semibold mb-2">Profession Eligibilitycriteria: {viewCertificate.certificateAdd}</p>
                           </div>
                           <div className="flex justify-end">
                             <button
                               className="bg-red-500 text-white py-2 px-4 rounded"
                               onClick={() => setViewCertificateModelOpen(false)}
                             >
                               Close
                             </button>
                           </div>
                         </div>
                       </div>
       )}

       {isUpdateCertificatePopupOpen &&(
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-8 rounded shadow-lg">
         <h2 className="text-2xl mb-4">Update Certificate</h2>
 
         <div className="mb-4">
         <label className="block text-sm font-medium text-gray-600" >Certificate Name:</label>
           <input
            className="w-full px-3 py-2 border rounded"
             type="text"
             value={formData.certificateName}
             onChange={(e) => setFormData({...formData, certificateName: e.target.value})}
           />
 
         </div>
         <div className="mb-4">
         <label className="block text-sm font-medium text-gray-600">Certificate Type:</label>
           <label>
             <input
               type="radio"
               value="Online"
               checked={formData.certificateSelected === 'Online'}
               onChange={() => setFormData({ ...formData, certificateSelected: 'Online' })}
             />
             Online
           </label>
           <label>
             <input
               type="radio"
               value="Offline"
               checked={formData.certificateSelected === 'Offline'}
               onChange={() => setFormData({ ...formData, certificateSelected: 'Offline' })}
             />
             Offline
           </label>
         </div>
         <div className="mb-4">
         <label className="block text-sm font-medium text-gray-600">Certificate Duration:</label>
           <input
             className="w-full px-3 py-2 border rounded"
             type="text"
             value={formData.certificateDuration}
             onChange={(e) => setFormData({...formData,certificateDuration:e.target.value})}
           />
         </div>
         <div className="mb-4">
         <label className="block text-sm font-medium text-gray-600">Certificate Address:</label>
           <input
             className="w-full px-3 py-2 border rounded"
             type="text"
             value={formData.certificateAdd}
             onChange={(e) => setFormData({...formData,certificateAdd:e.target.value})}
           />
         </div>
         <div className="flex justify-between">
         <button  className="bg-violet-500 hover:bg-violet-500 text-white py-2 px-4 rounded mr-2" onClick={()=> UpdateMethod(selectedCertificate._id)}>Save</button>
         <button  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"  onClick={() => setAddUserPopupOpen(false)}>Cancle</button>
         </div>
             </div>
             </div>
       )}


     <div className="flex justify-between mb-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-black">Certificate Datas</h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" 
          onClick={() => setAddUserPopupOpen(true)}
          >
            +ADD USER
          </button>
        </div>
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-xs text-left font-medium text-gray-500 uppercase tracking-wider">
            <th className="p-4">S.No</th>
              <th > Certificate Name </th>
              <th >Certificate Type</th>
              <th >Certificate Duration</th>
             <th> Certificate Address</th>
              <th > Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {AllData.map((user, index) => (
              <tr key={index}>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.certificateName}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.certificateSelected}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.certificateDuration}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.certificateAdd}
                </td>
                
                <td className=" px-4 py-2">
                  <button
                    className="text-blue-500 ml-2"
                    onClick={() => openUpdatePopup(user)}
                  >
                    Update
                  </button>
                  <button  className="text-red-500 ml-2"
                    onClick={() => DeleteMethod(user._id)}
                    >
                    Delete
                  </button>
                  <button className="text-lime-600 ml-2"
                    onClick={() => openViewPopup(user)}
                    >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      
   
   
    </>)
}
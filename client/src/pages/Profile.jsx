import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';


import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure 
} from "../redux/user/userSlice.js";


import { app } from '../firebase';
import { signOut } from "../redux/user/userSlice";


const Profile = () => {
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [formData, setFormData] = useState({});
  
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  
  const fileRef = useRef(null);
  
  const { currentUser, loading, error } = useSelector((state) => state.user);


  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  console.log(`>>>image selected<<<<`);
  console.log(image);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("handleSubmit");
    try {
      dispatch( updateUserStart() );

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if( data.success === false ) {
        dispatch(updateUserFailure( data ));
        return;
      }

      dispatch(updateUserSuccess( data ));

    } catch ( error ) {
      console.log("---error on handleSubmit function---");
      dispatch(updateUserFailure( error ));
    }
  };

  const handleDeleteAccount = async () => {
    console.log("handleSubmit");
    try {
      dispatch( deleteUserStart() );

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
        });

      const data = await res.json();
      if( data.success === false ) {
        dispatch(updateUserFailure( data ));
        return;
      }

      dispatch( deleteUserSuccess( data ) );

    } catch ( error ) {
      console.log("---error on handleSubmit function---");
      dispatch(deleteUserFailure( error ));
    }
  }

  const handleSignOut = async () => {
    console.log("handleSignOut");
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto text-zinc-700'>
      <h1 className='text-3xl font-semibold text-center my-7 text-stone-200'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/*      rules_version = '2';

              // Craft rules based on data in your Firestore database
              // allow write: if firestore.get(
              //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
              service firebase.storage {
                match /b/{bucket}/o {
                  match /{allPaths=**} {
                    allow read;
                    allow write: if 
                    request.resource.size < 2 * 1024 * 1024 && 
                    request.resource.contentType.matches('image/.*')
                  }
                }
              }
              */}
        <img src={formData.profilePicture || currentUser.profilePicture}
              alt="Profile Picture" 
              className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"  
              onClick={() => fileRef.current.click()} 
          />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-zinc-200 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
            onClick={handleDeleteAccount}
            className='text-red-700 cursor-pointer'
          >
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Error: Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {false && 'User is updated successfully!'}
        
      </p>
    </div>
  );
};

export default Profile;

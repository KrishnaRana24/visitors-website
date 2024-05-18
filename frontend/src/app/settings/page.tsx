"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

interface AdminData {
  name: string;
  email: string;
  phone: number;
  photo: string; // URL of the photo
}

const Settings = () => {
  const [adminData, setAdminData] = useState<AdminData[]>([]);
  const [lastAdminData, setLastAdminData] = useState<AdminData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store the selected file

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/adminRouter/getdata"
        );
        console.log("responeimage==", response.data.data);

        if (Array.isArray(response.data.data)) {
          setAdminData(response.data.data);

          // Get the most recent admin data (assuming the data is sorted by signup date)
          if (response.data.data.length > 0) {
            setLastAdminData(response.data.data[response.data.data.length - 1]);
          }
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    // console.log({ lastAdminData });

    fetchAdminData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSaveChanges = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      try {
        await axios.post(
          "http://localhost:8000/adminRouter/uploadPhoto",
          formData
        );
        console.log("Photo uploaded successfully");
        // You may want to refresh the admin data here to reflect the updated photo
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        {lastAdminData ? (
          <div className="grid grid-cols-5 gap-8 col-span-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Personal Information
                  </h3>
                </div>
                <div className="p-7">
                  <form>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            value={lastAdminData.name}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Phone Number
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          value={lastAdminData.phone}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.61929 1.95229 2.5 3.33301 2.5H16.6663C18.047 2.5 19.1663 3.61929 19.1663 5V15C19.1663 16.3807 18.047 17.5 16.6663 17.5H3.33301C1.95229 17.5 0.833008 16.3807 0.833008 15V5Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.991703 4.41269C1.27179 3.9803 1.84155 3.8522 2.27393 4.13229L9.99934 9.21871L17.7248 4.13229C18.1572 3.8522 18.7269 3.9803 19.007 4.41269C19.2871 4.84507 19.159 5.41483 18.7266 5.69492L10.5006 10.8616C10.1912 11.0643 9.80747 11.0643 9.49804 10.8616L1.27255 5.69492C0.840164 5.41483 0.712054 4.84507 0.991703 4.41269Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="email"
                          value={lastAdminData.email}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Your Photo
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-full">
                          {lastAdminData.photo ? (
                            <img
                              src={`/images/1715920124894-user.jpg`}
                              alt="User"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span>No photo uploaded</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Settings;

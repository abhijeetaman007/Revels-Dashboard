import React, { useEffect, useState } from "react";
import logoWhite from "./.././../assets/logos/logo_white.png";
import "./Profile.scss";
import aagaz from "./.././../assets/aagaz.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader/Loader";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [aadhar, setaadhar] = useState(null);
  const [collegeId, setcollegeid] = useState(null);
  const [vaccination, setvaccination] = useState(null);
  const [undertaking, setundertaking] = useState(null);

  const [arrivalDateTime, setarrivalDateTime] = useState();
  const [accomodation, setaccomodation] = useState();
  const [open, setOpen] = useState(false);
  const [modalImage, setmodalImage] = useState("");

  const toggleModal = () => {
    setOpen(!open);
  };

  const checkFileType = (type) => {
    if (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "application/pdf"
    )
      return true;
    return false;
  };
  const setDocument = (e, type) => {
    if(!checkFileType(e.target.files[0].type)){
      toast.error("Only image/pdf allowed", {
        position: "bottom-center",
      });
      return;
    }
    if (type === "aadhar") setaadhar(e.target.files[0]);
    if (type === "collegeId") setcollegeid(e.target.files[0]);
    if (type === "vaccination") setvaccination(e.target.files[0]);
    if (type === "undertaking") setundertaking(e.target.files[0]);
  };
  useEffect(() => {
    if (!auth.loading) {
      if (!auth.user) {
        console.log(auth.user)
        navigate("/");
      }
    }
  }, []);

  const uploadSelectiveDocs = async (e) => {
    let len=0;
    if(aadhar)len++;
    if(collegeId)len++;
    if(vaccination)len++;
    if(undertaking)len++;
    if (len===0) {
      toast.error("No document selected", {
        position: "bottom-center",
        id: toastId,
      });
      return;
    }
    const docs = new FormData();
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    
    if (aadhar) {
      docs.append("aadhar", aadhar);
    }
    if (collegeId) {
      docs.append("collegeId", collegeId);
    }
    if (vaccination) {
      docs.append("vaccination", vaccination);
    }
    if (undertaking) {
      docs.append("undertaking", undertaking);
    }
    
    
    try {
      const res = await axios.post("/api/user/update", docs, {
        headers: {
          authorization: localStorage.getItem("tokenid="),
        },
      });
      if (res.data.success) {
        toast.success("Successfully Updated!", {
          position: "bottom-center",
          id: toastId,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      console.log(res.data.success);
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-center",
        id: toastId,
      });
      //console.log(error.response.data);
    }
  };

  const uploadDocs = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");

    if (!aadhar) {
      toast.error("Aadhar Required", {
        position: "bottom-center",
        id: toastId,
      });
      return;
    }
    if (!collegeId) {
      toast.error("CollegeID Required", {
        position: "bottom-center",
        id: toastId,
      });
      return;
    }
    if (!vaccination) {
      toast.error("Vaccination Certificate Required", {
        position: "bottom-center",
        id: toastId,
      });
      return;
    }
    if (!accomodation) {
      toast.error("Choose Accomodation", {
        position: "bottom-center",
        id: toastId,
      });
      return;
    }

    if (accomodation === "1" && arrivalDateTime === undefined) {
      toast.error("Select Arrival Date", {
        position: "bottom-center",
        id: toastId,
      });
      return;
    }
    await updateAccommodation();

    try {
      const docs = new FormData();
      docs.append("aadhar", aadhar);
      docs.append("collegeId", collegeId);
      docs.append("vaccination", vaccination);
      docs.append("undertaking", undertaking);
      const res = await axios.post("/api/user/update", docs, {
        headers: {
          authorization: localStorage.getItem("tokenid="),
        },
      });
      if (res.data.success) {
        toast.success("Documents Uploaded!", {
          position: "bottom-center",
          id: toastId,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      console.log(res.data.success);
    } catch (error) {
      console.log(error.response);
      toast.error("Documents not uploaded", {
        position: "bottom-center",
        id: toastId,
      });
      console.log(error.response.data);
    }
  };

  const updateAccommodation = async () => {
    // if (!accomodation) {
    //   toast.error("Choose Accomodation", {
    //     position: "bottom-center",
    //     id: toastId,
    //   });
    //   return;
    // }

    // if (!arrivalDateTime) {
    //   toast.error("Select Arrival Date", {
    //     position: "bottom-center",
    //     id: toastId,
    //   });
    //   return;
    // }

    try {
      let dateOb = new Date(arrivalDateTime);
      const res = await axios.post(
        "/api/user/update/accommodation",
        { required: Boolean(accomodation), arrivalDateTime: dateOb },
        {
          headers: {
            authorization: localStorage.getItem("tokenid="),
          },
        }
      );
      if (res.data.success) {
        toast.success("Accomodation Updated!", {
          position: "bottom-center",
        });
      }
      //console.log(res.data.success);
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
      //console.log(error.respsonse.data);
    }
  };

  return auth.loading ? (
    <Loader />
  ) : (
    <div className="layout-wrapper">
      <nav className="profile-nav">
        <div className="brand">
          <img alt="Revels Logo" src={logoWhite}></img>
          <div>
            <h4 className="font-medium">REVELS '22</h4>
            <p className="font-light">Welcome back {auth.user.name}</p>
          </div>
        </div>
        <i className="fa fa-bell "></i>
      </nav>
      <div className="dash-wrapper">
        <div className="profile-sidebar p-3"></div>

        <div
          className={
            auth.user.isMahe === 0 && auth.user.documents === undefined
              ? "profile-content-area extended-two"
              : auth.user.isMahe === 0 &&
                auth.user.documents !== undefined &&
                (auth.user.status === "REJECTED" ||
                  auth.user.status === "UNVERIFIED")
              ? "profile-content-area extended"
              : "profile-content-area "
          }
        >
          <div className="back-btn w-100">
            <i className="fa fa-angle-left fa-2x"></i>
            <p className="" onClick={() => navigate("/dashboard/events")}>
              Dashboard
            </p>
          </div>
          <div className="text">
            <div className="name font-medium">
              <h1>{auth.user.name}</h1>
              <p>{auth.user.email}</p>
              <span className="border-box">
                Delegate ID: {auth.user.userID}
              </span>
            </div>
            <div className="grid font-medium">
              <div className="">
                <h1>College ID</h1>
                <p>{auth.user.registrationNumber}</p>
              </div>
              <div>
                <h1>Phone</h1>
                <p>{auth.user.mobileNumber}</p>
              </div>
              <div>
                <h1>College</h1>
                <p>{auth.user.college}</p>
              </div>
            </div>
            {auth.user.isMahe === 0 &&
              (auth.user.documents === undefined ||
                auth.user.status === "REJECTED") && (
                <>
                  <div className="font-medium">
                    <p>
                      Documents{" "}
                      <span className="border-box">TO BE UPLOADED</span>
                    </p>
                    <div className="drivelink">
                      <div className="upload">
                        <label>Aadhar Card</label>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => {
                            setaadhar(e.target.files[0]);
                            if (!checkFileType(e.target.files[0].type)) {
                              toast.error("Only image/pdf allowed", {
                                position: "bottom-center",
                              });
                              setaadhar(null);
                            }
                          }}
                        />
                      </div>
                      <div className="upload">
                        <label>College ID</label>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => {
                            setcollegeid(e.target.files[0]);
                            if (!checkFileType(e.target.files[0].type)) {
                              toast.error("Only image/pdf allowed", {
                                position: "bottom-center",
                              });
                              setcollegeid(null);
                            }
                          }}
                        />
                      </div>
                      <div className="upload">
                        <label>Vaccination Certificate</label>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => {
                            setvaccination(e.target.files[0]);
                            if (!checkFileType(e.target.files[0].type)) {
                              toast.error("Only image/pdf allowed", {
                                position: "bottom-center",
                              });
                              setvaccination(null);
                            }
                          }}
                        />
                      </div>
                      <div className="upload">
                        <label>Undertaking</label>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => {
                            setundertaking(e.target.files[0]);
                            if (!checkFileType(e.target.files[0].type)) {
                              toast.error("Only image/pdf allowed", {
                                position: "bottom-center",
                              });
                              setundertaking(null);
                            }
                          }}
                        />
                      </div>
                      <div className="radio-btn">
                        <p>Do you require accommodation?</p>
                        <div onChange={(e) => setaccomodation(e.target.value)}>
                          <div>
                            <input
                              type="radio"
                              id="yes"
                              name="accommodation"
                              value="1"
                            />
                            <label htmlFor="yes">Yes</label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="no"
                              name="accommodation"
                              value="0"
                            />
                            <label htmlFor="no">No</label>
                          </div>
                        </div>
                        {accomodation === "1" && (
                          <div className="w-100 mt-2">
                            <p>Date of Arrival</p>
                            <input
                              type="date"
                              id="arrivalDate"
                              name="arrivalDate"
                              onChange={(e) =>
                                setarrivalDateTime(e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>
                      <button onClick={uploadDocs}>Submit</button>
                    </div>
                  </div>
                </>
              )}
            {auth.user.isMahe === 0 &&
              auth.user.documents !== undefined &&
              auth.user.status !== "REJECTED" && (
                <>
                  <p>
                    Documents{" "}
                    <span className="border-box">{auth.user.status}</span>
                  </p>
                  <div className="drivelink">
                    {Object.keys(auth.user.documents).map((doc, ind) => {
                      return (
                        <>
                          {auth.user.documents[doc].status === 0 && (
                            <div
                              className="upload"
                              onClick={() => {
                                toggleModal();
                                setmodalImage(auth.user.documents[doc].url);
                              }}
                            >
                              <Modal
                                open={open}
                                onClose={() => toggleModal()}
                                center
                              >
                                <img
                                  src={modalImage}
                                  style={{ pointerEvents: "none" }}
                                />
                              </Modal>
                              <label>{doc.toUpperCase()}</label>
                              <span className="border-box">Unreviewed</span>
                            </div>
                          )}

                          {auth.user.documents[doc].status === 1 && (
                            <>
                              <div
                                className="upload"
                                onClick={() => {
                                  toggleModal();
                                  setmodalImage(auth.user.documents[doc].url);
                                }}
                              >
                                <Modal
                                  open={open}
                                  onClose={() => toggleModal()}
                                  center
                                >
                                  <img
                                    src={modalImage}
                                    style={{ pointerEvents: "none" }}
                                  />
                                </Modal>
                                <label>{doc.toUpperCase()}</label>
                                <i className="fa fa-check "></i>
                              </div>
                            </>
                          )}

                          {auth.user.documents[doc].status === 2 && (
                            <>
                              <div className="upload">
                                <Modal
                                  open={open}
                                  onClose={() => toggleModal()}
                                  center
                                >
                                  <img
                                    src={modalImage}
                                    style={{
                                      pointerEvents: "none",
                                      height: "50%",
                                    }}
                                  />
                                </Modal>
                                <label
                                  onClick={() => {
                                    toggleModal();
                                    setmodalImage(auth.user.documents[doc].url);
                                  }}
                                >
                                  {doc.toUpperCase()}
                                </label>
                                <input
                                  type="file"
                                  
                                  onChange={(e) => setDocument(e, `${doc}`)}
                                />
                                <button onClick={uploadSelectiveDocs}>
                                  Upload
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      );
                    })}
                  </div>
                </>
              )}

            <div className="delegate-card">
              <p className="font-heavy">
                Delegate ID <br />
                <span className="font-medium">{auth.user.userID}</span>
              </p>
              <div className="qr">
                <QRCode value={auth.user.token} size={155} />
              </div>
              {/* <img src="https://media.geeksforgeeks.org/wp-content/uploads/20200716125639/gfg422.jpg" /> */}
            </div>
          </div>
          <div className="aagaz">
            <img src={aagaz} alt="Aagaz | Revels 22" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useRef, useState } from "react";
import FaceLandmarkManager from "@/class/FaceLandmarkManager";

const FaceLandmarkCanvas = ({stream}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef<number>(0);
  const [videoSize, setVideoSize] = useState<{
    width: number;
    height: number;
  }>();
  const [categories, setCategories] = useState<any[]>([]);
  const [EAR, setEAR] = useState<number>(0);
  const [gaze, setGaze] = useState<number>(0);
  const [isDistracted, setIsDistracted] = useState(false);

  const animate = () => {
    if (
      videoRef.current &&
      videoRef.current.currentTime !== lastVideoTimeRef.current
    ) {
      lastVideoTimeRef.current = videoRef.current.currentTime;
      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        const landmarks = faceLandmarkManager.detectLandmarks(
          videoRef.current,
          Date.now()
        );
        if (
          landmarks &&
          landmarks.faceBlendshapes &&
          landmarks.faceBlendshapes.length > 0
        ) {
          const eyeLookUpLeft =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookUpLeft"
            )?.score ?? 0;
          const eyeLookUpRight =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookUpRight"
            )?.score ?? 0;
          const eyeLookDownLeft =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookDownLeft"
            )?.score ?? 0;
          const eyeLookDownRight =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookDownRight"
            )?.score ?? 0;
          const eyeLookInLeft =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookInLeft"
            )?.score ?? 0;
          const eyeLookInRight =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookInRight"
            )?.score ?? 0;
          const eyeLookOutLeft =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookOutLeft"
            )?.score ?? 0;
          const eyeLookOutRight =
            landmarks.faceBlendshapes[0].categories.find(
              (shape) => shape.categoryName === "eyeLookOutRight"
            )?.score ?? 0;
          const weights = {
            upLeft: 1,
            upRight: 1,
            downLeft: 1,
            downRight: 1,
            inLeft: 0.5,
            inRight: 0.5,
            outLeft: 0.5,
            outRight: 0.5,
          };
          const gazeScore =
            weights.upLeft * eyeLookUpLeft +
            weights.upRight * eyeLookUpRight +
            weights.downLeft * eyeLookDownLeft +
            weights.downRight * eyeLookDownRight +
            weights.inLeft * eyeLookInLeft +
            weights.inRight * eyeLookInRight +
            weights.outLeft * eyeLookOutLeft +
            weights.outRight * eyeLookOutRight;
          const EAR =
            (eyeLookUpLeft +
              eyeLookUpRight +
              eyeLookDownLeft +
              eyeLookDownRight) /
            (2 * (eyeLookInLeft + eyeLookInRight + eyeLookOutLeft + eyeLookOutRight));

          const gazeThreshold = 1.4; 
          const EARThreshold = 0.4; 

          if (EAR < EARThreshold || gaze > gazeThreshold) {
            setIsDistracted(true);
          } else {
            setIsDistracted(false);
          }

          setCategories(landmarks.faceBlendshapes[0].categories);
          setGaze(gazeScore);
          setEAR(EAR);
        } else {
          setCategories([]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const getUserCamera = async () => {
      try {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setVideoSize({
              width: videoRef.current!.offsetWidth,
              height: videoRef.current!.offsetHeight,
            });
            videoRef.current!.play();
            requestRef.current = requestAnimationFrame(animate);
          };
        }
      } catch (e) {
        console.log(e);
        alert("Failed to load webcam!");
      }
    };
    if(stream)
    getUserCamera();

    return () => cancelAnimationFrame(requestRef.current);
  }, [stream]);

  const midpoint = Math.ceil(categories.length / 2);
  const firstColumnCategories = categories.slice(0, midpoint);
  const secondColumnCategories = categories.slice(midpoint);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center">
        <table>
          <tbody>
            <tr>
              <td>
                <video
                  ref={videoRef}
                  loop={true}
                  muted={true}
                  autoPlay={true}
                  playsInline={true}
                ></video>
              </td>
              <td>
                <div>
                  <h3>Distracted : {isDistracted ? "True" : "False"}</h3> 
                  <ul>
                    {firstColumnCategories.map((category, index) => (
                      <li key={index}>
                        {category.categoryName} : {category.score}
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
              <td>
                <div>
                  <h3>EAR : {EAR}</h3>
                  <h3>Gaze : {gaze}</h3>
                  <ul>
                    {secondColumnCategories.map((category, index) => (
                      <li key={index}>
                        {category.categoryName} : {category.score}
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaceLandmarkCanvas;

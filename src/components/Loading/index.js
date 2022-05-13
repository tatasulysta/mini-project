import loader from "../../lotties/loader.json";
import Lottie from "react-lottie";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <Lottie
        options={defaultOptions}
        height={"200px"}
        width={"200px"}
        style={{ marginTop: "30vh" }}
      />
      ;
    </div>
  );
}

export default Loading;

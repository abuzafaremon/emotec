import { Tween } from "react-gsap";

const Loading = () => {
  return (
    // <div className="flex justify-center items-center h-40">
    //   <div className="w-10 h-10 border-2 border-dashed rounded-full animate-spin border-slate-700"></div>
    // </div>
    <div className="w-12 h-12 m-5 flex flex-wrap mx-auto">
      <Tween
        to={{ scale: 0.1 }}
        repeat={Infinity}
        stagger={{ from: "center", amount: 1 }}
        duration={1}
      >
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
        <div className="w-1/3 h-1/3 bg-slate-500" />
      </Tween>
    </div>
  );
};

export default Loading;

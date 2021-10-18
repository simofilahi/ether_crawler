const Header = () => {
  return (
    <div class=" bg-white w-full h-24 flex items-center justify-center">
      <div className="max-w-1024-px w-1024-px h-full  flex font-bold text-2xl text-indigo-600">
        <div className="flex flex-col w-1/3 justify-center ">
          <div className=" w-full flex">Eth</div>
          <div className="">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-black">C</span>rawler
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

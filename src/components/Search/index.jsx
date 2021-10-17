const Search = () => {
  return (
    <div className="flex py-10 items-center justify-center max-w-1024-px px-5  bg-blue-400">
      <div class="flex">
        <div class="flex border-2 rounded">
          <div class="flex items-center justify-center px-4 border-r">
            Address
          </div>
          <input type="text" class="px-4 py-2 w-80" placeholder="" />
        </div>
      </div>
      <div className="flex justify-center items-center px-5">From</div>
      <div class="">
        <div class="flex border-2 rounded">
          <div class="flex items-center justify-center px-4 border-r">
            Block
          </div>
          <input type="text" class="px-4 py-2 w-80" placeholder="Default 0" />
        </div>
      </div>
      <div class="flex justify-center items-center px-5 ">
        <a
          href="#"
          class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 h-10 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Search
        </a>
      </div>
    </div>
  );
};

export default Search;

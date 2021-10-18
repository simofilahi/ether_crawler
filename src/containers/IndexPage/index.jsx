import Header from "../../components/Header";
import Search from "../../components/Search";
import TxCard from "../../components/TxCard";

const IndexPage = () => {
  return (
    <div className="h-screen bg-gray-100 flex items-center flex-col">
      <Header />
      <div className=" max-w-1024-px">
        <Search />
        <TxCard />
      </div>
    </div>
  );
};

export default IndexPage;

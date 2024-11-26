import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import arrow from "../../assets/svg/meme-arrow.svg";
import memeA from "../../assets/svg/meme1.svg";
import memeB from "../../assets/images/mob-meme.png";
import makeMeme from "../../assets/svg/make-meme.svg";
import mapMeme from "../../assets/svg/map.svg";
import memeFooter from "../../assets/svg/meme-footer.svg";

const MemeBankPage = () => {
  return (
    <DashboardLayout current={1}>
      <div className="bg-[#1D2211] w-full clip-top-left-bottom-right">
        <div className="w-full flex flex-col mt-10 text-white py-4 lg:p-8">
          <div className="flex justify-center items-center relative">
            <img
              src={mapMeme}
              alt="map"
              className="absolute top-[-100px] w-[60%]"
            />
            <img src={arrow} alt="arrow" className="mx-auto z-10" />
          </div>
          <div className="w-full mx-auto flex justify-center items-center z-10">
            <img src={memeA} alt="meme" className="mx-auto lg:flex hidden" />
            <img
              src={memeB}
              alt="meme"
              className="mx-auto lg:hidden flex mt-12 w-full h-auto  "
            />
          </div>
          <div className="flex justify-center items-center mt-6 ">
            <Link
              to={
                "https://reminiscent-roof-194.notion.site/ARMY-MEME-BANK-568069abdc2846a98b55424a913ed7b3"
              }
              target="_blank"
              className="text-white font-soli bg-red-600 text-2xl lg:text-[24px] py-6 px-8 sign-in-button "
            >
              MEME BANK
            </Link>
          </div>
          <div className="w-full flex-col mt-20 lg:mt-24">
            <h1 className="text-white text-lg lg:text-5xl font-semibold font-soli text-center mx-auto ">
              HOW TO MAKE YOUR SOLDIER
            </h1>
            <img src={makeMeme} alt="make" className="w-full h-auto mt-12 " />
            <div className="flex justify-center mt-6 px-4">
              <Link
                to={"https://x.com/i/lists/1825556187498119480"}
                target="_blank"
                className="mx-auto text-white font-soli text-xl  lg:text-3xl  text-center"
              >
                Switch your PFP, Tweet it, and we'll add you to the{" "}
                <span className="text-red-600">ARMY Twitter list</span>
              </Link>
            </div>
          </div>
          <div className="w-full relative flex justify-center items-center">
            <img src={mapMeme} alt="map" />
            <div className="absolute top-[20%] z-10">
              <img
                src={memeFooter}
                alt="memefooter"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MemeBankPage;

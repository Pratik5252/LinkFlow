import subtract from '../../assets/Subtract1.svg';
import LeftArrow from '../../assets/left-arrow.svg';
import ellipse1 from '../../assets/Ellipse1.svg';
import blob1 from '../../assets/BlobColor.svg';
import blob2 from '../../assets/BlobNeutral.png';
import dashboard from '../../assets/dashboardss.png';
import { Button } from '../ui/button';
import { Link } from 'lucide-react';

import ContentImages1 from '../../assets/IconContainer1.png';
import ContentImages2 from '../../assets/IconContainer2.png';
import ContentImages3 from '../../assets/IconContainer3.png';

export default function LandingPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-fit px-4 py-4 bg-lp overflow-x-hidden">
            {/* Hero Section */}
            <div className="w-full h-full flex flex-col relative justify-between items-center gap-8 md:gap-12 lg:gap-16">
                <img
                    className="absolute top-10 blur-[140px] z-0"
                    alt="Ellipse"
                    src={ellipse1}
                />
                <img
                    className="absolute w-max h-[100] rounded sm:rounded-md md:rounded-lg lg:rounded-2xl"
                    alt="Subtract"
                    src={subtract}
                />
                <img
                    className="absolute w-[25rem] md:w-[45rem] lg:w-[55rem] h-fit z-30 top-[6%]"
                    alt="Bolb1"
                    src={blob1}
                />
                <img
                    className="absolute w-[25rem] md:w-[45rem] lg:w-[55rem] h-fit z-30 top-[6%]"
                    alt="Bolb2"
                    src={blob2}
                />
                <h1 className="absolute text-section-foreground-primary font-cabinet font-medium lg:text-xl md:text-lg sm:text-sm text-xs left-3 top-3 md:left-4 md:top-4 lg:left-6 lg:top-6 z-40">
                    LinkFlow
                </h1>
                <Button
                    variant="cta"
                    className="absolute right-3 top-3 sm:right-4 sm:top-4 md:right-4 md:top-4 lg:right-6 lg:top-6 font-light"
                >
                    SignIn/SignUp
                </Button>

                <div className="w-fit h-full lg:w-3xl z-40 flex flex-col justify-center items-center gap-4 md:gap-6 lg:gap-8 mt-[16%]">
                    <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
                        <h1 className="w-[60%] lg:w-[80%] font-cabinet font-medium text-section-foreground-primary text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-wrap">
                            Shorten links using your own domain
                        </h1>
                        <p className="w-[80%] lg:w-[70%] font-satoshi font-light text-section-foreground-secondary text-wrap text-center text-[8px] sm:text-xs md:text-sm lg:text-lg">
                            Create branded links that boost engagement and
                            provide analytics.
                            <br />
                            Scale your brand with a reliable link management
                            platform.
                        </p>
                    </div>

                    {/* Innput Box */}
                    <div className="bg-[#121212] w-fit border border-border-1 flex justify-between items-center px-3 py-1 md:px-5 md:py-2 lg:px-6 lg:py-2 gap-2 rounded lg:rounded-md shadow-input">
                        <input
                            id="url-input"
                            className="w-[30vw] h-fit text-section-foreground-secondary placeholder:text-section-foreground-primary px-2 py-1 lg:px-5 lg:py-2 border-none text-xs md:text-sm lg:text-base !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !bg-transparent !outline-none"
                            placeholder="Paste Url ..."
                        />
                        <Button
                            variant="cta"
                            className="w-fit h-fit bg-lp text-[10px] !px-2 !py-1 md:!px-3 md:!py-2 lg:!px-5 lg:!py-2 md:text-sm lg:text-base font-satoshi rounded-xs hover:bg-section-foreground-primary"
                        >
                            Short Url <Link className="size-3 " />
                        </Button>
                    </div>
                </div>

                <div className="z-40 relative h-full">
                    <img
                        className="w-[70vw] h-[100] border-2 border-border-1 rounded-lg"
                        src={dashboard}
                        alt="Dashboard"
                    />

                    <div className="absolute z-50 w-[70vw] h-full bg-modal-linear top-0 rounded"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center items-center py-6 sm:py-10 md:py-13 lg:py-16 gap-6 sm:gap-10 md:gap-13 lg:gap-16">
                <h1 className="w-[50%] sm:w-[50%] lg:w-[45%] font-cabinet font-medium text-foreground-primary text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-wrap">
                    Turn every click into actionable intelligence
                </h1>

                {/* Content Cards */}
                <Container>
                    <ContentImage>
                        <img
                            src={ContentImages1}
                            alt="ContentImages"
                            className="w-full h-fit z-10"
                        />
                    </ContentImage>
                    <Content
                        title="Monitor every click as it happens"
                        content="Gain immediate insights into your audience's clicking habits, including peak activity times and device usage. Our intuitive dashboard converts raw click data into valuable insights, featuring interactive charts and geographic analysis."
                        btnText="Discover More"
                    />
                </Container>
                <Container>
                    <Content
                        title="Understand your global audience"
                        content="Uncover the origins of your traffic with in-depth geographic insights. Monitor visitors by country, city, and region to grasp your international presence and tailor your content strategy for diverse markets."
                        btnText="Find Out More"
                    />
                    <ContentImage>
                        <img
                            src={ContentImages2}
                            alt="ContentImages"
                            className="w-full h-fit z-10"
                        />
                    </ContentImage>
                </Container>
                <Container>
                    <ContentImage>
                        <img
                            src={ContentImages3}
                            alt="ContentImages"
                            className="w-full h-fit z-10"
                        />
                    </ContentImage>
                    <Content
                        title="Optimize for every devices"
                        content="Gain insights into how your audience engages with your content on desktops, mobiles, and tablets. Monitor browser preferences, operating systems, and interaction trends to provide an exceptional user experience on every platform"
                        btnText="Discover More"
                    />
                </Container>
            </div>
        </div>
    );
}

function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen flex justify-center border-t border-b border-border-3 gap-2 sm:gap-4 md:gap-8 lg:gap-16 px-4">
            {children}
        </div>
    );
}

function ContentImage({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative w-[296px] sm:w-[320px] md:w-[400px] lg:w-[480px] flex justify-center items-center border-x border-border-3">
            <div className="absolute bg-cta w-[55%] h-[55%]  rounded-full blur-radial z-0"></div>
            {children}
        </div>
    );
}

function Content({
    title,
    content,
    btnText,
}: {
    title: string;
    content: string;
    btnText: string;
}) {
    return (
        <div className="w-[100%] sm:w-[60%] md:w-[60%] lg:w-[40%] flex flex-col justify-start items-start gap-3 sm:gap-2 md:gap-4 lg:gap-6 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-2 ">
            <h1 className="w-fit font-cabinet text-foreground-primary font-medium text-base sm:text-lg md:text-2xl lg:text-4xl">
                {title}
            </h1>
            <p className="w-[90%] text-wrap font-satoshi font-light text-foreground-secondary tracking-tight text-xs sm:text-sm md:text-lg lg:text-2xl">
                {content}
            </p>
            <Button
                variant="pill"
                className="w-fit h-fit font-satoshi font-medium text-foreground-secondary text-[8px]"
            >
                {btnText}{' '}
                <img src={LeftArrow} alt="Left Arrow" className="w-4 h-4" />
            </Button>
        </div>
    );
}

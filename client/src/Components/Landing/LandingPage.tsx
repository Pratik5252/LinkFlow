import ellipse1 from '../../assets/Ellipse1.svg';
import dashboard from '../../assets/dashboardss.png';
import { Button } from '../ui/button';
import { Link } from 'lucide-react';

import ContentImages1 from '../../assets/IconContainer1.png';
import ContentImages2 from '../../assets/IconContainer2.png';
import ContentImages3 from '../../assets/IconContainer3.png';

import { Container, Content, ContentImage } from './Container';
import { Card1, Card2, Card3, Card4 } from './Card';
import { BorderBeam } from '../ui/border-beam';
import FooterText from '../../assets/FooterText.svg';
import { TextAnimate } from '../ui/text-animate';
import { motion } from 'motion/react';

export default function LandingPage() {
    const WIDTH = window.innerWidth;
    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-fit px-4 py-4 bg-lp overflow-x-hidden">
            {/* Hero Section */}
            <img
                className="absolute top-10 blur-[140px] z-0"
                alt="Ellipse"
                src={ellipse1}
            />
            <div className="relative bg-[#121212] w-full h-full flex flex-col justify-between items-center gap-8 md:gap-12 lg:gap-16 z-10 rounded-md lg:rounded-lg overflow-hidden">
                {Array.from({ length: 50 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-0 h-full border-l-[0.5px] border-[#1b1b1b] z-0 "
                        style={{ left: `${(i + 1) * 2}%` }}
                    >
                        <BorderBeam
                            size={90}
                            borderWidth={0.1}
                            colorFrom="#1b1b1b"
                            colorTo="#121212"
                            duration={Math.random() * 10 + 5}
                            delay={Math.random() * 5}
                        />
                    </div>
                ))}
                {Array.from({ length: 50 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-0 border-t-[0.5px] border-[#1b1b1b] z-0 "
                        style={{ top: `${(i + 1) * 4}%` }}
                    >
                        <BorderBeam
                            size={90}
                            borderWidth={0.1}
                            colorFrom="#1b1b1b"
                            colorTo="#121212"
                            duration={Math.random() * 10 + 5}
                            delay={Math.random() * 5}
                        />
                    </div>
                ))}
                <h1
                    className="absolute text-section-foreground-primary font-cabinet font-medium lg:text-xl md:text-lg sm:text-sm text-xs left-3 top-3 md:left-4 md:top-4 lg:left-6 lg:top-6 z-40"
                    onClick={() => (window.location.href = '/')}
                >
                    LinkFlow
                </h1>
                <Button
                    variant="cta"
                    className="absolute right-3 top-3 sm:right-4 sm:top-4 md:right-4 md:top-4 lg:right-6 lg:top-6 font-light text-foreground-primary"
                    onClick={() => (window.location.href = '/auth')}
                >
                    SignIn/SignUp
                </Button>

                <div className="w-fit h-full lg:w-3xl z-40 flex flex-col justify-center items-center gap-4 md:gap-6 lg:gap-8 my-[16%]">
                    <div className="w-full flex flex-col justify-center items-center gap-2 text-center">
                        <TextAnimate
                            animation="blurIn"
                            as={'h1'}
                            duration={1}
                            once={true}
                            className="w-[60%] lg:w-[80%] font-cabinet font-medium text-section-foreground-primary text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-wrap"
                        >
                            Shorten links using your own domain
                        </TextAnimate>
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
                            className="w-[30vw] h-fit text-section-foreground-secondary placeholder:text-section-foreground-primary py-1 lg:py-2 border-none text-xs md:text-sm lg:text-base !focus:ring-0 !focus:ring-offset-0 !focus:outline-none !bg-transparent !outline-none"
                            placeholder="Enter Url ..."
                        />
                        <Button
                            variant="cta"
                            className="w-fit h-fit bg-lp text-[10px] !px-2 !py-1 md:!px-3 md:!py-2 lg:!px-5 lg:!py-2 md:text-sm lg:text-base font-satoshi rounded-xs hover:bg-section-foreground-primary text-foreground-primary"
                            onClick={() => (window.location.href = '/auth')}
                        >
                            Short Url <Link className="size-3 " />
                        </Button>
                    </div>
                </div>
            </div>
            <motion.div
                className="z-40 relative h-full -top-16 md:-top-20 lg:-top-28"
                initial={{
                    scale: WIDTH < 640 ? 1 : WIDTH < 1024 ? 1 : 0.9,
                    y: 0,
                    opacity: 1,
                }}
                whileInView={{
                    scale: WIDTH < 640 ? 1.05 : WIDTH < 1024 ? 1 : 1.2,
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: WIDTH < 640 ? 80 : WIDTH < 1024 ? 100 : 120,
                    damping: 20,
                    duration: 0.8,
                }}
                viewport={{ amount: WIDTH < 1024 ? 0.8 : 0.6 }}
            >
                <img
                    className="w-[70vw] h-full border-2 border-border-1 rounded-lg"
                    src={dashboard}
                    alt="Dashboard"
                />
                <div className="absolute z-50 w-[70vw] h-full bg-modal-linear top-0 rounded"></div>
            </motion.div>

            {/* Content Section */}
            <div className="flex flex-col justify-center items-center gap-6 sm:gap-10 md:gap-13 lg:gap-16 mb-10 md:mb-12 lg:mb-16">
                <h2 className="w-[50%] sm:w-[50%] lg:w-[40%] font-cabinet font-medium text-foreground-primary text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-wrap tracking-tight">
                    Turn every click into actionable intelligence
                </h2>

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

            <div className="w-full flex flex-col justify-center items-center gap-6">
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="w-[50%] sm:w-[50%] lg:w-[45%] font-cabinet font-medium text-foreground-primary text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-wrap tracking-tight">
                        See it in action
                    </h2>
                    <p className="w-[80%] lg:w-[70%] font-satoshi font-normal text-foreground-secondary text-wrap text-center text-[8px] sm:text-xs md:text-sm lg:text-lg">
                        From QR codes to analytics, explore the features that
                        make link tracking effortless
                    </p>
                </div>
                <div className="w-full h-fit flex flex-col md:flex-row justify-center items-center md:hidden gap-4 py-16 px-0 bg-section-secondary rounded-md">
                    <Card1 />
                    <Card2 />

                    <Card3 />
                    <Card4 />
                    <div className="absolute w-1 h-full rounded-md z-0 overflow-hidden">
                        <BorderBeam
                            size={1200}
                            borderWidth={2}
                            colorFrom="#db895d"
                            colorTo="#FFFFFF"
                        />
                    </div>
                </div>
                <div className="w-full h-fit hidden md:flex flex-col md:flex-row justify-center items-start md:items-start gap-4 py-10 px-4 bg-section-secondary rounded-md">
                    <div className="relative w-fit h-full flex justify-center items-center gap-4">
                        <div className="w-fit h-full flex flex-col justify-between items-center gap-9 z-10">
                            <Card1 />
                            <Card3 />
                        </div>
                        <div className="w-fit h-full flex flex-col justify-between items-center gap-4 z-10">
                            <Card2 />
                            <Card4 />
                        </div>
                        <div className="absolute w-[50%] h-[50%] rounded-md z-0 overflow-hidden">
                            <BorderBeam
                                size={800}
                                borderWidth={3}
                                colorFrom="#db895d"
                                colorTo="#FFFFFF"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-full bg-section-primary flex flex-col justify-center items-center rounded-md py-18 md:py-24 lg:py-32">
                <div className="justify-center items-center flex flex-col gap-2 z-30">
                    <div className="text-section-foreground-secondary text-[8px] sm:text-xs md:text-sm lg:text-base border border-border-1 rounded-full px-2 hover:text-section-foreground-primary transition-all duration-300 ease-in-out">
                        Get Started
                    </div>
                    <div className="w-full h-fit flex flex-col justify-center items-center">
                        <p className="font-cabinet font-medium text-section-foreground-primary text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-wrap tracking-tight">
                            Start creating links with LinkFlow
                        </p>
                        <p className="w-[100%] mx-auto font-satoshi font-light text-section-foreground-secondary text-wrap text-center text-[8px] sm:text-xs md:text-sm lg:text-lg">
                            Begin your journey with LinkFlow and transform your
                            URLs into powerful tools.
                        </p>
                    </div>
                    <Button
                        variant="cta"
                        className="w-fit h-fit bg-lp text-[8px] !px-2 !py-1 md:!px-3 md:!py-2 lg:!px-5 lg:!py-2 md:text-sm lg:text-base font-satoshi rounded hover:bg-section-foreground-primary text-foreground-primary mt-2 md:mt-4 lg:mt-6 z-30"
                        onClick={() => (window.location.href = '/auth')}
                    >
                        Get Started
                    </Button>
                </div>
                <div className="absolute w-full h-full rounded-md z-20 overflow-hidden bg-radial-gradient top-0"></div>
            </div>

            <div className="w-full bg-section-primary flex flex-col justify-center items-center py-1 md:py-2 rounded-md">
                <div className="w-full flex justify-between items-center px-3">
                    <div className="flex justify-center items-center gap-1 text-[8px] sm:text-[10px] md:text-sm lg:text-base text-section-foreground-secondary font-satoshi font-normal">
                        <Link className="w-2 " /> LinkFlow
                    </div>
                    <p className="text-[6px] sm:text-[8px] md:text-[10px] font-extralight text-section-foreground-secondary font-satoshi">
                        © {new Date().getFullYear()} Company Name. All rights
                        reserved
                    </p>
                </div>
                <img
                    src={FooterText}
                    alt="FooterText"
                    className="w-auto py-2 md:py-4 lg:py-6 px-4 md:px-6 lg:px-8"
                />
            </div>
        </div>
    );
}

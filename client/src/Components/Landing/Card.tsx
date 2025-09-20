import React from 'react';
import { Check, Copy, Download, Link, Share2 } from 'lucide-react';
import { BorderBeam } from '@/Components/ui/border-beam';
import QR from '../../assets/QR.png';
import Insight1 from '../../assets/Insight1.png';
import Insight2 from '../../assets/Insight2.png';
import Insight3 from '../../assets/Insight3.png';
import Insight4 from '../../assets/Insight4.png';
import Metrics1 from '../../assets/Metrics1.png';
import Metrics2 from '../../assets/Metrics2.png';
import Metrics3 from '../../assets/Metrics3.png';
import Metrics4 from '../../assets/Metrics4.png';
import { motion, stagger } from 'motion/react';

type CardContainerProps = {
    cardTitle?: string;
    description?: string;
    children: React.ReactNode;
};
export const CardContainer = ({
    cardTitle,
    description,
    children,
}: CardContainerProps) => {
    return (
        <div className="w-fit md:w-full h-full card-container p-2 md:p-3 lg:p-6 border border-border-1 shadow-small rounded-lg flex flex-col justify-center items-center z-10">
            {children}
            <div className="w-full px-3">
                {cardTitle && (
                    <h2
                        className="text-card-2-foreground
                     font-cabinet font-medium text-sm"
                    >
                        {cardTitle}
                    </h2>
                )}
                {description && (
                    <p className="text-card-2-foreground font-satoshi font-light text-xs">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export const Card1 = () => {
    return (
        <CardContainer>
            <div className="relative flex justify-center items-center gap-1 text-section-foreground-primary p-3 md:p-2 rounded overflow-hidden border border-border-1">
                <p className="text-xs truncate">
                    https://www.example.com/articles/202...
                </p>
                <div className="w-fit h-fit bg-primary text-foreground-primary text-[10px] px-2 py-1 md:px-1 md:py-2 lg:px-5 lg:py-2 md:text-xs font-satoshi flex justify-center items-center gap-1 rounded-xs">
                    Short Url <Link className="size-3 " />
                </div>
            </div>
            <div className="relative h-5 border-r border-border-1">
                <BorderBeam
                    size={80}
                    borderWidth={0.5}
                    colorFrom="#454545"
                    colorTo="#DDDDDD"
                />
            </div>
            <div className="relative w-fit h-fit flex justify-between items-center text-section-foreground-secondary px-3 py-3 rounded text-xs gap-2 overflow-hidden">
                <p>https://lnkf.ly/UrcT63</p>
                <Check size={16} />
                <BorderBeam
                    size={1000}
                    borderWidth={3}
                    colorFrom="#4ade80"
                    colorTo="#454545"
                />
            </div>
        </CardContainer>
    );
};

export const Card2 = () => {
    return (
        <CardContainer cardTitle="Share" description="Quick link exchange">
            <div className="flex gap-4 p-2">
                <div className="w-full flex flex-col gap-2 text-section-foreground-secondary font-satoshi text-[10px]">
                    <div className="w-full flex justify-between items-center gap-2 p-3  border border-border-1 rounded">
                        <p className="">https://lnkf.ly/UrcT63</p>
                        <Copy size={12} />
                    </div>
                    <div className="w-full flex justify-between items-center gap-2 p-3  border border-border-1 rounded">
                        <p className="">Download</p>
                        <Download size={12} />
                    </div>
                    <div className="w-full flex justify-between items-center gap-2 p-3  border border-border-1 rounded">
                        <p className="">Share</p>
                        <Share2 size={12} />
                    </div>
                </div>
                <img src={QR} alt="QR Code" className="w-36" />
            </div>
        </CardContainer>
    );
};

export const Card3 = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: stagger(0.5, { startDelay: 0.2 }),
                repeat: Infinity,
                duration: 2,
            },
            spring: { type: 'spring', stiffness: 100, damping: 20 },
        },
    };

    const imgVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <CardContainer
            cardTitle="Insights"
            description="Get quick insights for sites"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="flex flex-col gap-2 p-2"
            >
                <motion.img
                    variants={imgVariants}
                    src={Insight1}
                    alt="Insight 1"
                    className="border-[0.5px] border-border-1 rounded w-72"
                />
                <motion.img
                    variants={imgVariants}
                    src={Insight2}
                    alt="Insight 2"
                    className="border-[0.5px] border-border-1 rounded w-72"
                />
                <motion.img
                    variants={imgVariants}
                    src={Insight3}
                    alt="Insight 3"
                    className="border-[0.5px] border-border-1 rounded w-72"
                />
                <motion.img
                    variants={imgVariants}
                    src={Insight4}
                    alt="Insight 4"
                    className="border-[0.5px] border-border-1 rounded w-72"
                />
            </motion.div>
        </CardContainer>
    );
};

export const Card4 = () => {
    return (
        <CardContainer
            cardTitle="Metrics"
            description="Facilitate a rapid link exchange"
        >
            <div className="flex flex-col gap-2 p-2">
                <div className="flex gap-2">
                    <img
                        src={Metrics1}
                        alt="Insight 1"
                        className="border-[0.5px] border-border-1 rounded w-36"
                    />
                    <img
                        src={Metrics2}
                        alt="Insight 2"
                        className="border-[0.5px] border-border-1 rounded w-36"
                    />
                </div>
                <div className="flex gap-2">
                    <img
                        src={Metrics3}
                        alt="Insight 3"
                        className="border-[0.5px] border-border-1 rounded w-36"
                    />
                    <img
                        src={Metrics4}
                        alt="Insight 4"
                        className="border-[0.5px] border-border-1 rounded w-36"
                    />
                </div>
            </div>
        </CardContainer>
    );
};

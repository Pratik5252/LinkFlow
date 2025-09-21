import { Button } from '../ui/button';
import LeftArrow from '../../assets/left-arrow.svg';

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className=" w-screen flex justify-center border-t border-b border-border-3 gap-2 sm:gap-4 md:gap-8 lg:gap-16 px-4">
            {children}
        </div>
    );
}

export function ContentImage({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative w-[296px] sm:w-[320px] md:w-[400px] lg:w-[480px] flex justify-center items-center border-x border-border-3">
            <div className="absolute -top-2 -left-2  w-1 h-1 bg-white p-2"></div>
            <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-white p-2"></div>
            <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-white p-2"></div>
            <div className="absolute -top-2 -right-2 w-1 h-1 bg-white p-2"></div>
            <div className="absolute bg-cta w-[55%] h-[55%]  rounded-full blur-radial z-0"></div>
            {children}
        </div>
    );
}

export function Content({
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
                className="w-fit h-fit font-satoshi font-medium text-foreground-secondary text-[8px] group "
            >
                {btnText}{' '}
                <img
                    src={LeftArrow}
                    alt="Left Arrow"
                    className="w-4 h-4 -translate-x-0.5 group-hover:translate-x-0.5 transtion-all duration-300 ease-in-out"
                />
            </Button>
        </div>
    );
}

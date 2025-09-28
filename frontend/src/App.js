import React from 'react';

// ========== Global Styles Component ==========
// Injects the custom button styles and font imports into the app.
const GlobalStyles = () => (
    <style>{`
        body {
            font-family: 'Nunito', sans-serif;
        }
        .btn {
            border-radius: 1rem;
            text-transform: uppercase;
            font-weight: 800;
            padding: 0.75rem 2.5rem;
            border-bottom-width: 4px;
            transition: all 0.1s ease-in-out;
        }
        .btn:active {
            transform: translateY(2px);
            border-bottom-width: 2px;
        }
        .btn-green {
            background-color: #58cc02;
            border-color: #58a700;
            color: white;
        }
        .btn-green:hover {
            background-color: #61e002;
        }
        .btn-white {
            background-color: white;
            border-color: #e5e5e5;
            color: #4c4c4c;
        }
        .btn-white:hover {
            background-color: #f7f7f7;
        }
        .btn-blue {
            background-color: #1cb0f6;
            border-color: #1899d6;
            color: white;
        }
         .btn-blue:hover {
            background-color: #2fb9f8;
        }
    `}</style>
);

// ========== Reusable Button Component ==========
const Button = ({ children, variant, className = '' }) => {
    const baseClasses = 'btn';
    const variantClasses = {
        green: 'btn-green',
        white: 'btn-white',
        blue: 'btn-blue',
    };
    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </button>
    );
};

// ========== Header Component ==========
const Header = () => (
    <header className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="container mx-auto flex justify-between items-center max-w-7xl">
            <a href="#">
                <h1 className="text-2xl font-extrabold text-lime-500 tracking-tight text-center drop-shadow-md">
                    ArgueAI
                </h1>
            </a>
            <div className="relative">
                <button className="flex items-center text-gray-500 hover:text-gray-700 font-bold">
                    Site language: English
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>
        </div>
    </header>
);

// ========== Hero Section Component ==========
const HeroSection = () => (
    <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#4c4c4c] mb-6 leading-tight">
                    The free, fun, and effective way to learn debating!
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button variant="green" className="w-full sm:w-auto">Get Started</Button>
                </div>
            </div>
            <div className="md:w-1/2">
                {/* Placeholder for the animated graphic if needed */}
            </div>
        </div>
    </section>
);

// ========== Language Flags Component ==========
const LanguageFlags = () => {
    const languages = [
        { name: 'Spanish', imgSrc: 'https://d35aaqx5ub95lt.cloudfront.net/images/flags/es.svg' },
        { name: 'French', imgSrc: 'https://d35aaqx5ub95lt.cloudfront.net/images/flags/fr.svg' },
        { name: 'German', imgSrc: 'https://d35aaqx5ub95lt.cloudfront.net/images/flags/de.svg' },
        { name: 'Italian', imgSrc: 'https://d35aaqx5ub95lt.cloudfront.net/images/flags/it.svg' },
        { name: 'Japanese', imgSrc: 'https://d35aaqx5ub95lt.cloudfront.net/images/flags/ja.svg' },
        { name: 'Chinese', imgSrc: 'https://d35aaqx5ub95lt.cloudfront.net/images/flags/zh.svg' },
        { name: 'Russian', imgSrc: 'https://d35aaqx5ub95lt.cloudfront.net/images/flags/ru.svg' },
    ];
    return (
        <section className="py-8 border-y border-gray-200">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-around flex-wrap gap-4">
                    {languages.map(lang => (
                        <a href="#" key={lang.name} className="flex items-center flex-col gap-2 text-[#777777] hover:text-[#58cc02] font-bold transition">
                            <img src={lang.imgSrc} alt={`${lang.name} flag`} className="h-16 w-20 object-cover" />
                            <span>{lang.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ========== Feature Section Component ==========
const FeatureSection = ({ title, text, linkText, linkHref, imgSrc, imgAlt, reverse = false }) => (
    <section className={`py-12 md:py-20 ${!reverse ? 'bg-[#f7f7f7]' : 'bg-white'}`}>
        <div className={`container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/2">
                <img src={imgSrc} alt={imgAlt} className="max-w-xs md:max-w-sm mx-auto" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3c3c3c] mb-4">{title}</h2>
                <p className="text-lg text-[#777777] mb-6">{text} <a href={linkHref} className="text-[#1cb0f6] font-bold">{linkText}</a></p>
            </div>
        </div>
    </section>
);


// ========== Main App Component ==========
export default function App() {
    const features = [
        {
            title: "Fun, effective, and free.",
            text: "Learning with ArgueAI is fun, and",
            linkText: "research shows that it works!",
            linkHref: "#",
            imgSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/23ab11cb1e1a9aff54facdf57833373d.svg",
            imgAlt: "Gamified learning experience",
            reverse: false
        },
        {
            title: "Backed by science.",
            text: "We blend effective teaching methods with enjoyable topics to strengthen your debating skills step by step!",
            imgSrc: "https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/08ec8d0260c55c054e1b97bcbc96ea0f.svg",
            imgAlt: "Science-backed learning methods",
            reverse: true
        }
    ];

    return (
        <div className="bg-white text-[#4c4c4c]">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&display=swap" rel="stylesheet" />
            </head>
            <GlobalStyles />
            <Header />
            <main>
                <HeroSection />
                {features.map((feature, index) => (
                    <FeatureSection key={index} {...feature} />
                ))}
            </main>
        </div>
    );
}


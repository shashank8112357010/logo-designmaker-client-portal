import React from 'react'

const FirstDesign = () => {
    return (
        <div>
            <footer className="mt-8">
                <h2 className="text-white text-4xl text-center">Let's Make Your First Design</h2>
                <div className="flex justify-center mt-4 space-x-4">
                    <button className="bg-primaryGreen text-primaryBlack font-bold px-4 py-2 rounded-lg">
                        Schedule Meet
                    </button>
                    <button className="border border-primaryGreen text-white px-4 py-2 rounded-lg">
                        Explore
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default FirstDesign
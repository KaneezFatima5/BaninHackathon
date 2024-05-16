import Logo from "./assets/Logo.svg"
import HeroImage from "./assets/HeroImage.png"
import { Toaster, toast } from "sonner"
import { useState } from "react"
import axios from "axios"
import FormData from "form-data"
import { Buffer } from "buffer"

export default function App() {
    const [inputPrompt, setInputPrompt] = useState("")
    const [generating, setGenerating] = useState(false)
    const [image, setImage] = useState(null)

    const generateImage = async () => {
        if(inputPrompt.length === 0) {
            toast.error("Please enter a prompt to generate an image")
            return
        }

        const loadingToast = toast.loading("Generating image...")

        try {
            /*
                NOTE: Credit usage for SD3 and SD3 Turbo is as follows:
                    1. SD3: Flat rate of 6.5 credits per successful generation
                    of a 1MP image. You will not be charged for failed generations.
                    
                    2. SD3-Turbo: Flat rate of 4 credits per successful generation
                    of a 1MP image. You will not be charged for failed generations.

                To use SD3-Turbo model just add "model": "sd3-turbo"
                in the data object.
            */
            const data = {
                "prompt": inputPrompt,
                "output_format": "jpeg",
            }

            setGenerating(true)

            const response = await axios.postForm(
                "https://api.stability.ai/v2beta/stable-image/generate/sd3",
                axios.toFormData(data, new FormData()),
                {
                    validateStatus: undefined,
                    responseType: "arraybuffer",
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_STABILITY_API_TOKEN}`,
                        Accept: "image/*"
                    }
                }
            )

            if(response.status === 200) {
                const imageBase64 = Buffer
                    .from(response.data, "binary")
                    .toString("base64")
                const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`

                setImage(imageDataUrl)
            }

            toast.dismiss(loadingToast)
            setGenerating(false)
        }
        catch(err) {
            console.log(err)
            toast.dismiss(loadingToast)
            setGenerating(false)
            toast.error("Error occurred while generating image, please try again")
        }
    }

    return (
        <div className="min-w-screen min-h-screen flex flex-col">
            <Toaster
                position="bottom-left"
                richColors
            />
            <div className="flex items-center justify-between py-5 px-10 shadow-md">
                <div className="flex items-center space-x-2">
                    <img src={Logo} alt="Logo" />
                    <p className="font-bold text-lg">HackAttack</p>
                </div>
                <div className="flex space-x-20 font-semibold">
                    <p className="hover:text-[#6675F7] hover:cursor-pointer">Home</p>
                    <p className="hover:text-[#6675F7] hover:cursor-pointer">Functionalities</p>
                    <p className="hover:text-[#6675F7] hover:cursor-pointer">About us</p>
                </div>
                <button className="bg-gradient-to-r from-[#6675F7] to-[#57007B] text-white px-5 py-2 rounded-md">
                    Contact us
                </button>
            </div>
            <div className="mt-12 flex flex-col lg:flex-row lg:space-x-10 items-center mx-auto px-24">
                <div className="flex flex-col">
                    <p className="font-bold text-2xl text-center">Generate your ideas into reality with your local language</p>
                    <p className="mx-auto mt-5">Generate images from text in an instant with your local Fon, Dendi & Youroba language.</p>
                </div>
                <img src={HeroImage} alt="Hero Image" className="w-96" />
            </div>
            <span className="border-b-[1px] mx-10 mt-7 border-gray-300"></span>
            <p className="mx-auto mt-5 text-3xl font-semibold">Generate Your Image</p>
            <div className="flex flex-col space-y-5 mx-auto my-7">
                <div className="flex space-x-5">
                    <input
                        type="text"
                        name="prompt"
                        id="prompt"
                        placeholder="Enter your prompt"
                        className="border-[1px] p-2 rounded-md shadow-sm w-96"
                        onChange={(e) => setInputPrompt(e.target.value)}
                    />
                    <button
                        className="bg-gradient-to-r from-[#6675F7] to-[#57007B] text-white px-5 py-2 rounded-md"
                        onClick={() => generateImage()}
                        disabled={generating}
                    >
                        Generate
                    </button>
                </div>
                {
                    image ? (
                        <img src={image} alt="Generated Image" className="w-full h-96 object-cover rounded-md shadow-md border-[1px] border-gray-300" />
                    ) : (
                        <div className="w-full h-96 rounded-lg border-2 border-gray-300 border-dashed flex items-center justify-center">
                            <p className="text-sm text-gray-500">Image will be displayed here</p>
                        </div>
                    )
                }
            </div>
        </div>  
    )
}
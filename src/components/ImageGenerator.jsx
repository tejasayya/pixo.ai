import { useState } from "react"
import axios from "axios"


const ImageGenerator = () => {

    const [payload, setPayload] = useState({
        prompt: "",
        aspect_ratio: "1:1",
        seed: "5",
        style_preset: "anime",
        output_format: "png"
    });
    const [imageSrc, setImageSrc] = useState(null);

    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload((prevPayload) => ({
            ...prevPayload,
            [name]: value,
        }));
    };

    //form submit handler
    const formSubmitHandler = async (e) =>{
        e.preventDefault();
        console.log("Request Sent", payload);

        // api key and url
        const apiURL = import.meta.env.VITE_PIXO_API_URL;
        const apiKey = import.meta.env.VITE_PIXO_API_KEY;

        try{
            console.log("try block")
            console.log("API URL:", apiURL);
            console.log("API Key:", apiKey);
            console.log("Payload:", payload);
            
            const response = await axios.post(apiURL, payload, {
                responseType: "arraybuffer",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    Accept: "Image/*",
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("try block2")
            console.log(response.data);
            if(response.status === 200){
                console.log("success");
                const blob = new Blob([response.data], { type: "image/webp"});
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch(error) {
            console.error("Error Generating Image", error);
        }
    }

  return (
    <div className="max-w-screen-xl px-5 mx-auto mt-12">
        <div className="grid items-center gap-8 p-10 border-2 border-purple-900 rounded-lg bg-gray-600/30 lg:grid-cols-2">
            {/* options */}
            <form action="" onSubmit={formSubmitHandler}>
                {/* Prompt */}
                <div className="mb-7">

                    <label htmlFor="prompt" className="form-label">Prompt</label>

                    <textarea 
                    id="prompt" 
                    name="prompt" 
                    value={payload.prompt} 
                    onChange={handleChange} 
                    placeholder="A car on sea" 
                    rows="4" required className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500" ></textarea>
            
                </div>

                {/* Image style */}
                <div className="mb-7">
                    <label htmlFor="style" className="form-label">
                        Image Style
                    </label>

                    <select name="style_preset" value={payload.style_preset} onChange={handleChange} id="style" className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500">
                        <option value="anime">Anime</option>
                        <option value="cinematic">Cinematic</option>
                        <option value="photographic">Photographic</option>
                        <option value="neon-punk">Neon Punk</option>
                        <option value="3d-model">3D Model</option>

                    </select>

                </div>

                {/* Image format */}
                <div className="mb-7">
                    <label htmlFor="format" className="form-label">
                        Image Format
                    </label>

                    <select name="output_format" onChange={handleChange} value={payload.output_format} id="format" className="block w-full p-3 bg-transparent border-2 rounded-lg border-gray-500/60 focus-within:outline-0 focus:border-purple-500">
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                        <option value="webp">WEBP</option>
                                                
                    </select>
                </div>

                {/* button */}
                <button type="submit" className="block w-full p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600">
                    <span>⭐ Generate Image ✨</span>

                </button>


            </form>




            {/* Generated Image TODO */}
            <div className="grid content-center border-2 border-purple-900 rounded-md mx-auto lg:ms-auto overflow-clip w-[500px] h-[500px]">
                {imageSrc ? ( <img className="mx-auto" src={imageSrc} /> ) : ( <p className="text-center">Something Went Wrong, Try Again</p> )}
            </div>

        </div>
    </div>
  )
}

export default ImageGenerator